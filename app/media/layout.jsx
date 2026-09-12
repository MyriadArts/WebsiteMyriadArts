import MediaShaderBackground from "../../components/media/MediaShaderBackground";
import GlobalBackground from "../../components/shared/GlobalBackground";

export const metadata = {
  title: "Media Hub — Myriad Arts",
  description: "Experience our highly anticipated full-length stage productions, captured in multi-angle 4K. A digital ecosystem built for arts enthusiasts.",
};

export default function MediaLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-[#050505] text-[#e2e2e2]">
      {/* Layer 0: Foundation */}
      <GlobalBackground />
      
      {/* Layer 1: Media Atmosphere */}
      <MediaShaderBackground />
      
      {/* Layer 2: Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
