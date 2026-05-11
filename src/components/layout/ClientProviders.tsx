"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
const HeroUIProvider = dynamic(() => import("@heroui/system").then(mod => mod.HeroUIProvider), {
  ssr: false,
});
import { useState } from "react";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider locale="fa-IR"> {/* navigate={router.push} */}
        {children}
      </HeroUIProvider>
    </QueryClientProvider>
  );
}
