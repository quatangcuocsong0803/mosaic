import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/src/components/Navbar";

export const metadata: Metadata = {
  title: "MOSAIC",
  description: "A personality typology platform for self-exploration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
