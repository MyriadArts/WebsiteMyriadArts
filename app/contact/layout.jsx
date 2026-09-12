export const metadata = {
  title: "Contact | Myriad Arts",
  description: "Get in touch with Myriad Arts to book performances, workshops, and creative collaborations. Tell us about your artistic vision.",
  openGraph: {
    title: "Contact | Myriad Arts",
    description: "Get in touch with Myriad Arts to book performances, workshops, and creative collaborations. Tell us about your artistic vision.",
    url: "https://myriadarts.com/contact",
    siteName: "Myriad Arts",
    images: [
      {
        url: "/logos/myriad-arts-logo.jpg",
        width: 800,
        height: 600,
        alt: "Myriad Arts Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Myriad Arts",
    description: "Get in touch with Myriad Arts to book performances, workshops, and creative collaborations.",
    images: ["/logos/myriad-arts-logo.jpg"],
  },
  alternates: {
    canonical: "https://myriadarts.com/contact",
  },
};

export default function ContactLayout({ children }) {
  return <>{children}</>;
}
