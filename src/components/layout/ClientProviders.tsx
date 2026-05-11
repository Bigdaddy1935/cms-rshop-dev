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
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            gcTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
          mutations: {
            retry: 0,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider locale="fa-IR">
        {children}
      </HeroUIProvider>
    </QueryClientProvider>
  );
}
