"use client";

import Link from "next/link";
import { VIPBadge } from "./vip-badge";
import { VelvetLogo } from "./velvet-logo";

export function VelvetHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <VelvetLogo className="w-10 h-10" />
          <span className="font-[family-name:var(--font-cinzel)] text-lg font-semibold tracking-wider text-[#f4eade]">
            VELVET
          </span>
        </Link>
        <VIPBadge />
      </div>
    </header>
  );
}
