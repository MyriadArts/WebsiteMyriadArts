# Myriad Arts — Production Deployment & Operations Guide

This guide provides step-by-step instructions for deploying and running the **Myriad Arts** Next.js web application and its automated YouTube media synchronization pipeline on a **Linux VPS** (Ubuntu 22.04 / 24.04 LTS).

---

## 1. System Architecture Overview

```
                          [ Internet / Visitors ]
                                    │
                                    ▼  (Port 80 / 443 HTTPS)
                             [ Nginx Proxy ]
                       (SSL, Static Cache, Gzip)
                                    │
                                    ▼  (Reverse Proxy http://127.0.0.1:3000)
                        [ Next.js Application ]
                          (Managed by PM2)
                                    │
               ┌────────────────────┴────────────────────┐
               │                                         │
        Dynamic Reads                             Atomic Writes
               │                                         │
               ▼                                         ▼
      [ lib/media.js ]                           [ scripts/youtube-sync.js ]
               │                                         ▲
               └─────────► [ data/media.json ] ◄─────────┘
                                                         │
                                                  Cron Job (Every 30m)
                                                         │
                                                         ▼
                                            [ YouTube Data API v3 ]
```

### Key Architectural Characteristics:
1. **Dynamic File-Backed Data Layer:** `lib/media.js` reads `data/media.json` from the filesystem dynamically per request, enabling live updates when new videos are synced without rebuilding or restarting Next.js.
2. **Atomic Synchronization Pipeline:** `scripts/youtube-sync.js` queries YouTube Data API v3, skips Shorts, enriches metadata, and atomically replaces `data/media.json` using process locks and temporary file swaps.
3. **High-Performance Production Stack:** Next.js served via PM2 cluster behind Nginx with Let's Encrypt SSL.

---

## 2. Server Prerequisites & Initial Setup

### 2.1 Server Requirements
- **OS:** Ubuntu 22.04 LTS or 24.04 LTS (64-bit)
- **CPU / RAM:** Minimum 1 vCPU, 1 GB RAM (2 GB recommended)
- **Disk:** 15 GB+ SSD
- **Network:** Ports 22 (SSH), 80 (HTTP), 443 (HTTPS) open in firewall

### 2.2 Initial Server Hardening & Packages
Connect to your VPS via SSH and update the system:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git ufw build-essential nginx certbot python3-certbot-nginx
```

Configure the UFW firewall:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### 2.3 Install Node.js (Node.js 20 LTS)
Install Node.js via NodeSource:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Verify installations:

```bash
node -v   # Should be v20.x.x
npm -v    # Should be v10.x.x
```

### 2.4 Install PM2 Globally
```bash
sudo npm install -g pm2
```

---

## 3. Application Deployment & Environment Setup

### 3.1 Clone the Repository
Create a directory for the application (e.g., `/var/www/myriad-arts`):

```bash
sudo mkdir -p /var/www/myriad-arts
sudo chown -R $USER:$USER /var/www/myriad-arts
cd /var/www/myriad-arts

git clone <YOUR_GIT_REPOSITORY_URL> .
```

### 3.2 Install Dependencies
Install production dependencies:

```bash
npm ci
```

### 3.3 Configure Environment Variables
Create the production environment file `.env.production` (or `.env`):

```bash
nano .env.production
```

Add your production environment variables:

```env
# Node Environment
NODE_ENV=production
PORT=3000

# YouTube Data API Configuration
YOUTUBE_API_KEY=AIzaSy...your-actual-api-key...
YOUTUBE_CHANNEL_ID=UCwII4Rd9vrweS6o6tfpkXKA
YOUTUBE_UPLOADS_PLAYLIST_ID=UUwII4Rd9vrweS6o6tfpkXKA
```

Secure the file permissions:

```bash
chmod 600 .env.production
```

---

## 4. Media Synchronization Pipeline Verification

Before launching the web app, test the YouTube sync process on the VPS:

### 4.1 Test Run with Dry-Run
```bash
npm run media:sync -- --dry-run
```
*Verify that 50 uploads are inspected, 25 Shorts skipped, and no file errors occur.*

### 4.2 Initial Production Data Sync
Run the initial synchronization to ensure `data/media.json` is fully up to date:

```bash
npm run media:sync
```

Verify that `data/media.json` contains the latest videos and valid schema.

---

## 5. Build and Process Management (PM2)

### 5.1 Build the Next.js Application
```bash
npm run build
```

### 5.2 Configure PM2 Ecosystem
Create an `ecosystem.config.cjs` file in the root of the project:

```javascript
// ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: "myriad-arts",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: "/var/www/myriad-arts",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      max_memory_restart: "500M",
      restart_delay: 3000,
      max_restarts: 10,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      error_file: "/var/log/myriad-arts/app-error.log",
      out_file: "/var/log/myriad-arts/app-out.log",
      merge_logs: true,
    },
  ],
};
```

Create the log directory:

```bash
sudo mkdir -p /var/log/myriad-arts
sudo chown -R $USER:$USER /var/log/myriad-arts
```

### 5.3 Start Application with PM2
```bash
pm2 start ecosystem.config.cjs
pm2 save
```

Configure PM2 to automatically start on server reboot:

```bash
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp /home/$USER
```

---

## 6. Nginx Web Server & SSL Configuration

### 6.1 Create Nginx Site Configuration
Create `/etc/nginx/sites-available/myriadarts.com`:

```bash
sudo nano /etc/nginx/sites-available/myriadarts.com
```

Paste the following Nginx configuration (replace `myriadarts.com` and `www.myriadarts.com` with your actual domain):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name myriadarts.com www.myriadarts.com;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;

    # Static Assets Cache (_next/static)
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        expires 365d;
        access_log off;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Public Static Files
    location /static {
        proxy_pass http://127.0.0.1:3000;
        expires 30d;
        access_log off;
        add_header Cache-Control "public, max-age=2592000";
    }

    # Main Reverse Proxy Route
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
        proxy_connect_timeout 60s;
    }

    # Block direct access to hidden files/directories
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

### 6.2 Enable Nginx Site
```bash
sudo ln -s /etc/nginx/sites-available/myriadarts.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6.3 Issue Free SSL Certificate (Let's Encrypt / Certbot)
```bash
sudo certbot --nginx -d myriadarts.com -d www.myriadarts.com
```

Certbot will automatically install the certificate, configure HTTPS redirection, and set up automatic renewal timers.

---

## 7. Automated YouTube Sync Cron Configuration

Set up a Linux cron job to run the synchronization script automatically every 30 minutes.

### 7.1 Edit Crontab
```bash
crontab -e
```

### 7.2 Add Synchronization Entry
Add the following line to the crontab:

```cron
# Myriad Arts YouTube Synchronization (Every 30 minutes)
*/30 * * * * cd /var/www/myriad-arts && /usr/bin/node scripts/youtube-sync.js >> /var/log/myriad-arts/sync.log 2>&1
```

> **Why this is safe:**
> - `scripts/youtube-sync.js` utilizes an exclusive file lock (`data/.sync.lock`). If a sync is already running, the new execution will exit cleanly without corruption.
> - Stale locks (>15 minutes) are automatically detected and recovered.
> - All writes to `data/media.json` are atomic (`.tmp.<pid>` $\rightarrow$ validation $\rightarrow$ POSIX rename).

---

## 8. Log Rotation Configuration

To prevent log files from growing indefinitely, configure `logrotate`:

Create `/etc/logrotate.d/myriad-arts`:

```bash
sudo nano /etc/logrotate.d/myriad-arts
```

Add:

```
/var/log/myriad-arts/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 YOUR_USER YOUR_USER
    sharedscripts
}
```

Test the configuration:

```bash
sudo logrotate -d /etc/logrotate.d/myriad-arts
```

---

## 9. Zero-Downtime Deployment & Update Script

Create a zero-downtime deployment script `deploy.sh` in the project root:

```bash
nano deploy.sh
```

Add:

```bash
#!/bin/bash
set -e

APP_DIR="/var/www/myriad-arts"
cd "$APP_DIR"

echo "🚀 [Deploy] Starting deployment..."

echo "📥 [Deploy] Pulling latest changes from git..."
git pull origin main

echo "📦 [Deploy] Installing dependencies..."
npm ci --prefer-offline

echo "🔨 [Deploy] Building Next.js application..."
npm run build

echo "🔄 [Deploy] Reloading PM2 cluster with zero downtime..."
pm2 reload ecosystem.config.cjs --update-env

echo "✅ [Deploy] Deployment completed successfully!"
```

Make it executable:

```bash
chmod +x deploy.sh
```

Whenever you push new code to `main`, run:

```bash
./deploy.sh
```

---

## 10. Operations & Troubleshooting Cheatsheet

| Task | Command |
|---|---|
| **Check App Status** | `pm2 status` |
| **View Live App Logs** | `pm2 logs myriad-arts` |
| **View YouTube Sync Logs** | `tail -f /var/log/myriad-arts/sync.log` |
| **Run Manual Sync Test** | `npm run media:sync -- --dry-run` |
| **Run Manual Real Sync** | `npm run media:sync` |
| **Restart App** | `pm2 reload myriad-arts` |
| **Test Nginx Config** | `sudo nginx -t` |
| **Reload Nginx** | `sudo systemctl reload nginx` |
| **Renew SSL Certificate** | `sudo certbot renew --dry-run` |

---

## 11. Security & Production Checklist

- [x] Node.js 20 LTS installed
- [x] `.env.production` secured with `chmod 600`
- [x] PM2 cluster mode configured with auto-restart on reboot
- [x] Nginx reverse proxy configured with Gzip compression and security headers
- [x] Let's Encrypt HTTPS enabled with auto-renewal
- [x] Automated 30-minute sync cron configured with process locking
- [x] Log rotation configured for all application and sync logs
- [x] Dynamic filesystem reads enabled in `lib/media.js` for instant media reflection
- [x] YouTube Shorts filtering active and verified
