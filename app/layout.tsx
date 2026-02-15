import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
