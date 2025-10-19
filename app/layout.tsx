import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "물회의 취향",
  description: "당신의 물회 취향은?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dongle&family=Gothic+A1&display=swap" rel="stylesheet" />
        <link rel="icon" href="/imgs/logo.png" />
        <Script src="//wcs.naver.net/wcslog.js" strategy="beforeInteractive"></Script>
        <Script strategy="lazyOnload">
          {`
  if(!wcs_add) var wcs_add = {};
  wcs_add["wa"] = "12e354f3d63e900";
  if(window.wcs) {
  wcs_do();
}
  `}
        </Script>
        {/* <Script src="//wcs.naver.net/wcslog.js" strategy="afterInteractive" />
        <Script id="naver-analytics" strategy="afterInteractive">
          {`
          if(!wcs_add) var wcs_add = {};
          wcs_add["wa"] = "12e354f3d63e900";
          if(window.wcs) {
            wcs_do();
          }
        `}
        </Script> */}
      </head>
      <body
        className="antialiased w-full overflow-x-hidden bg-gradient-to-r from-[#FF6F91] via-[#FFD43B] to-[#4FB1FF]"
        style={{ fontFamily: "'Gothic A1', sans-serif" }}
      >
        <div className="max-w-[480px] mx-auto bg-white min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
