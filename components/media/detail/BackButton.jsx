"use client";

import Link from "next/link";

export default function BackButton() {
  return (
    <Link 
      href="/media/library"
      className="inline-flex items-center gap-2 text-[#aaa] hover:text-white transition-colors font-sans text-sm font-semibold"
    >
      <span className="material-symbols-outlined text-[20px]">arrow_back</span>
      Back to Library
    </Link>
  );
}
