"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BiLoaderAlt } from "react-icons/bi";

export default function GlobalLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div
      className={`
        fixed inset-0 z-[9999] 
        flex items-center justify-center 
        transition-opacity duration-300
        ${loading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        bg-black/40 backdrop-blur-xl
      `}
    >
      <div className="flex flex-col items-center gap-4 p-8 bg-slate-800/60 rounded-2xl shadow-2xl border border-white/10">
        <BiLoaderAlt className="w-12 h-12 animate-spin text-white drop-shadow-md" />
        <p className="text-xl text-white">در حال لود صفحه...</p>
      </div>
    </div>
  );
}
