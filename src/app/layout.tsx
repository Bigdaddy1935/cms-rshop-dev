import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import ClientProviders from "@/components/layout/ClientProviders";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link
          rel="preload"
          href="/fonts/IRANSansWeb_Medium.woff"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body cz-shortcut-listen="false">
        <Toaster />
        {/* <GlobalLoader /> */}
        <ClientProviders>
          <Suspense fallback={<></>}>{children}</Suspense>
        </ClientProviders>
      </body>
    </html>
  );
}
