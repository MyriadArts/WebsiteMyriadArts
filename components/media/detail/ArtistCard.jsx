import Image from "next/image";

export default function ArtistCard({ video }) {
  if (!video) return null;

  const artistName = video.artist || "Calakar";
  const artistRole = video.artistRole || "Lead Choreographer & Educator";
  const artistImage = video.artistImage || "/logos/myriad-arts-logo.jpg";
  return (
    <div className="flex items-center gap-2 md:gap-4 shrink min-w-0">
      <div className="w-[32px] h-[32px] md:w-[48px] md:h-[48px] rounded-full shrink-0 overflow-hidden relative">
        <Image 
          className="w-full h-full object-cover" 
          src={artistImage} 
          alt={artistName} 
          fill
          sizes="(max-width: 768px) 32px, 48px"
        />
      </div>
      <div className="flex items-center gap-2 md:gap-6 shrink min-w-0">
        <div className="flex flex-col shrink min-w-0">
          <h4 className="type-heading-md text-white truncate">
            {artistName}
          </h4>
        </div>
        <a 
          href="https://www.youtube.com/@Calakar" 
          target="_blank" 
          rel="noopener noreferrer"
          className="shrink-0"
        >
          <button suppressHydrationWarning className="px-3 md:px-5 py-1.5 md:py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-all type-button whitespace-nowrap">
            Subscribe
          </button>
        </a>
      </div>
    </div>
  );
}
