import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-[60px] flex flex-col items-center justify-center text-center">
      <h1 className="type-display-xl text-[#c1121f] mb-4">404</h1>
      <h2 className="type-heading-lg text-white mb-6">Performance Not Found</h2>
      <p className="type-body-md text-[#bab8b7] max-w-md mb-8">
        The video you are looking for has been archived or does not exist. 
      </p>
      <Link href="/media" className="px-8 py-3 bg-[#c1121f] text-white rounded-lg type-button hover:bg-[#a00f1a] transition-colors">
        Return to Media Hub
      </Link>
    </div>
  );
}
