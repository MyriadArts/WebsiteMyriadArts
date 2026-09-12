"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WorkshopsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/services#workshops");
  }, [router]);

  return (
    <div className="bg-background-matte text-on-surface min-h-screen pt-[88px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-12 h-12 rounded-full border-t-2 border-primary animate-spin" />
        <p className="font-body-md text-text-muted">Loading Workshops...</p>
      </div>
    </div>
  );
}
