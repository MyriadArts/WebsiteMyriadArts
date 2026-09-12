"use client";

import dynamic from "next/dynamic";

const SpotlightCanvas = dynamic(() => import("./SpotlightCanvas"), {
  ssr: false,
});

export default function SpotlightWrapper() {
  return <SpotlightCanvas />;
}
