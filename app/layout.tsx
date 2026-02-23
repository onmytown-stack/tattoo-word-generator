import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Japanese Tattoo Word Generator",
  description:
    "Find your Japanese tattoo word. 3 quick questions. A word selected with nuance by a native Japanese creator.",
  openGraph: {
    title: "Japanese Tattoo Word Generator",
    description:
      "Find your Japanese tattoo word. 3 quick questions. A word selected with nuance.",
    type: "website",
  },
};

const GA_ID = "G-3LZS2M9953";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}