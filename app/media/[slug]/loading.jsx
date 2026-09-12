export default function Loading() {
  return (
    <main className="pt-20 animate-pulse">
      {/* Cinematic Video Player Section Skeleton */}
      <section className="relative w-full aspect-video md:h-[819px] bg-[#0c0f0f] flex items-center justify-center overflow-hidden">
        <div className="w-24 h-24 rounded-full bg-[#1a1a1a]"></div>
      </section>

      {/* Video Metadata Skeleton */}
      <div className="px-6 md:px-[60px] py-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-4 w-full max-w-2xl">
            <div className="h-4 bg-[#1a1a1a] rounded w-32"></div>
            <div className="h-10 bg-[#1a1a1a] rounded w-3/4"></div>
            <div className="h-4 bg-[#1a1a1a] rounded w-48"></div>
          </div>
          <div className="flex gap-3">
            <div className="w-24 h-10 bg-[#1a1a1a] rounded-lg"></div>
            <div className="w-24 h-10 bg-[#1a1a1a] rounded-lg"></div>
            <div className="w-24 h-10 bg-[#1a1a1a] rounded-lg"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[48px]">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-[48px]">
            {/* Description Skeleton */}
            <div className="bg-[#1a1a1a] p-6 rounded-xl space-y-4">
              <div className="h-6 bg-[#282a2b] rounded w-40"></div>
              <div className="space-y-2">
                <div className="h-4 bg-[#282a2b] rounded w-full"></div>
                <div className="h-4 bg-[#282a2b] rounded w-full"></div>
                <div className="h-4 bg-[#282a2b] rounded w-3/4"></div>
              </div>
              <div className="flex gap-2 pt-4">
                <div className="w-20 h-6 bg-[#282a2b] rounded-full"></div>
                <div className="w-24 h-6 bg-[#282a2b] rounded-full"></div>
                <div className="w-16 h-6 bg-[#282a2b] rounded-full"></div>
              </div>
            </div>

            {/* Artist Profile Skeleton */}
            <div className="bg-[#1a1a1a] p-6 rounded-xl flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-[#282a2b] shrink-0"></div>
              <div className="flex-grow space-y-3">
                <div className="h-6 bg-[#282a2b] rounded w-48"></div>
                <div className="h-4 bg-[#282a2b] rounded w-32"></div>
              </div>
              <div className="w-32 h-10 bg-[#282a2b] rounded-full shrink-0"></div>
            </div>
          </div>

          {/* Sidebar / Recommendations Skeleton */}
          <aside className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="h-6 bg-[#1a1a1a] rounded w-32"></div>
              <div className="h-4 bg-[#1a1a1a] rounded w-16"></div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex gap-3">
                  <div className="w-40 aspect-video rounded-lg bg-[#1a1a1a] shrink-0"></div>
                  <div className="space-y-2 flex-grow">
                    <div className="h-4 bg-[#1a1a1a] rounded w-full"></div>
                    <div className="h-4 bg-[#1a1a1a] rounded w-1/2"></div>
                    <div className="h-3 bg-[#1a1a1a] rounded w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
