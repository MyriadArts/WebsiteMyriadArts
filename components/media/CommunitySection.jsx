export default function CommunitySection() {
  return (
    <section className="mt-[48px] px-[6vw] py-24 border-t border-[#5e3f3b]/20 bg-[#0c0f0f]">
      <div className="text-center mb-16">
        <span className="text-[#ffb4aa] font-['Inter'] text-[14px] leading-[20px] tracking-[0.05em] font-[600] tracking-widest uppercase mb-4 block">
          Connected Community
        </span>
        <h2 className="font-['Montserrat'] text-[48px] leading-[56px] tracking-[-0.01em] font-[700] text-[#e2e2e2]">
          Explore Our Digital Presence
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
        {/* Instagram Card */}
        <div className="bg-[#141414] p-8 rounded-[1rem] border border-[#5e3f3b]/30 hover:border-[#e50914] transition-colors group">
          <div className="flex justify-between items-start mb-8">
            <div className="p-4 bg-[#2F2F2F] rounded-full group-hover:bg-[#e50914]/10 transition-colors">
              <span className="material-symbols-outlined text-4xl">photo_camera</span>
            </div>
            <button suppressHydrationWarning className="bg-white/5 border border-white/10 px-4 py-2 rounded-[0.5rem] text-[14px] leading-[20px] hover:bg-white/10 text-white">
              Follow
            </button>
          </div>
          <h3 className="text-center font-['Montserrat'] text-[24px] leading-[32px] font-[600] text-[#e2e2e2] mb-2">Instagram</h3>
          <p className="text-[#e9bcb6] font-['Inter'] text-[16px] leading-[24px] font-[400] mb-8">
            Daily updates, behind-the-scenes glimpses, and visual storytelling from our latest stage productions.
          </p>
          <div className="grid grid-cols-3 gap-2">
            <div className="aspect-square bg-[#2F2F2F] rounded-md overflow-hidden">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLLUArKLX9thCbdk8A6cRfxfewGXcY73W2-8y1KBMvEPBBhAGhrRWzilBQ7R29i-AZFhiMLiBdReByVltJjWJ9Q1YDoxmJb9QaN-ieRTjnToo9P5lMcy9u1ypjm6f4uld1uVKPwtZhjZpU7wN6areU6o_igTntDVWFMXUl2rFA-DTWkCj96X4SdUg0mw4pjEwgh0fbCWwfYCW5Imi3rXoVwZhlejftCHqfcYXCUfK13gPuBcroeSUHTnsw_lunPav-J38Fb2HUS7H4" 
                alt="Instagram 1" 
              />
            </div>
            <div className="aspect-square bg-[#2F2F2F] rounded-md overflow-hidden">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJ8qCttBLJw630cZldlQRQ9tMw-jiLAlJ2Bi8Ia7vqeNAG-e3eFrfV9hv3a8299iTmnfb-4WDzV03CIwKtzDz9bwXTMKYKiIYZzPOW2Aazd6wmYp6v82620FFEFxkNjA3no-UmAdd_Mx-JCdRNDpdnpXpExJURABU-j-3dJr_peDn7cwzcqWi_3BtKzOMmLMxY-ZO8OS74iTqUQCkK07FcdUnsv8a0Vf6zG3LRAVaJb7sf_Z_UymY_jPyst3IuNNPydeig-5GCdY7U" 
                alt="Instagram 2" 
              />
            </div>
            <div className="aspect-square bg-[#2F2F2F] rounded-md overflow-hidden">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnsAyR_vHAFxtYtNyIrjlSU4D61KsIoUyZRzhpQJwA8tmFojxH1nDJxFeKuwI4o506MhV7YGdbspN-84IYVLbhyJ9BPd4wnruHlcI9cxYxHOcsFK_adHvKb4ZwFWyF_Juy3EB_ILQ8cK0ItfSDtEgfL8xUnukSN8kFx5_hA8ffBAcUUgZBAqbJtTmOjjsvaRgtdsFXaBbrk6t5OnNAYS52ibA0ipGfTTwtvB-q6A5ovgaFPLeONfiZKGoFpCOjGgBPnpKd06dO2s26" 
                alt="Instagram 3" 
              />
            </div>
          </div>
        </div>

        {/* Facebook Card */}
        <div className="bg-[#141414] p-8 rounded-[1rem] border border-[#5e3f3b]/30 hover:border-[#e50914] transition-colors group">
          <div className="flex justify-between items-start mb-8">
            <div className="p-4 bg-[#2F2F2F] rounded-full group-hover:bg-[#e50914]/10 transition-colors">
              <span className="material-symbols-outlined text-4xl">groups</span>
            </div>
            <button suppressHydrationWarning className="bg-white/5 border border-white/10 px-4 py-2 rounded-[0.5rem] text-[14px] leading-[20px] hover:bg-white/10 text-white">
              Join Group
            </button>
          </div>
          <h3 className="text-center font-['Montserrat'] text-[24px] leading-[32px] font-[600] text-[#e2e2e2] mb-2">Facebook</h3>
          <p className="text-[#e9bcb6] font-['Inter'] text-[16px] leading-[24px] font-[400] mb-8">
            Join the Brand Community to discuss performances, share insights, and get early access to event announcements.
          </p>
          <div className="bg-[#2F2F2F]/50 p-4 rounded-lg border border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#e50914]"></div>
              <div className="text-[12px] leading-[16px]">
                <div className="font-bold">Official Myriad Arts</div>
                <div className="text-[#e9bcb6]">2 hours ago</div>
              </div>
            </div>
            <p className="text-[12px] leading-[16px] text-[#e9bcb6] line-clamp-2">
              "The energy at last night's premiere was absolutely electric! Thank you to everyone who joined us..."
            </p>
          </div>
        </div>

        {/* YouTube Card */}
        <div className="bg-[#141414] p-8 rounded-[1rem] border border-[#5e3f3b]/30 hover:border-[#e50914] transition-colors group">
          <div className="flex justify-between items-start mb-8">
            <div className="p-4 bg-[#2F2F2F] rounded-full group-hover:bg-[#e50914]/10 transition-colors">
              <span className="material-symbols-outlined text-4xl">video_library</span>
            </div>
            <button suppressHydrationWarning className="bg-[#e50914] text-white px-4 py-2 rounded-[0.5rem] text-[14px] leading-[20px] font-bold">
              Subscribe
            </button>
          </div>
          <h3 className="text-center font-['Montserrat'] text-[24px] leading-[32px] font-[600] text-[#e2e2e2] mb-2">YouTube</h3>
          <p className="text-[#e9bcb6] font-['Inter'] text-[16px] leading-[24px] font-[400] mb-8">
            Our flagship platform for full-length 4K performances, documentaries, and exclusive artist interviews.
          </p>
          <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
            <img 
              className="w-full h-full object-cover opacity-60" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR_4yGJlXJkmfHrRQR3iKjZBYIAZvyMMR-s98X06oAALlIU8AtY9aro29ztHNFFljRZPOtMcDldDtskPY5xP4AAkUAZxZNowJT72d8oQgSaffsMjWMDNxom-C0N7tzjHzm6wkuje0R1XkSt7jSW86Iq4o5opTimQF0icXMtdWa2HeGFN9JhqIVoCq1qzInqg0bRc1Oqp2iI25jQMVbd16RNPNy7SptKpeD6fQlRUZnhphavckTkRcPUeyfMDmWo4lLTJgYUfwLon33" 
              alt="YouTube Thumbnail" 
            />
            <span className="material-symbols-outlined absolute inset-0 flex items-center justify-center text-5xl">
              play_circle
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
