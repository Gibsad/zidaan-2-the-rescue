import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Zidaan 2 The Rescue 🚒",
  description: "Zidaan is turning TWO! Join the Rescue Crew on October 31st.",
  openGraph: {
    title: "Zidaan 2 The Rescue 🚒",
    description: "Zidaan is turning TWO! Join the Rescue Crew on October 31st.",
    type: "website",
    url: siteUrl,
    siteName: "Zidaan 2 The Rescue",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zidaan 2 The Rescue 🚒",
    description: "Zidaan is turning TWO! Join the Rescue Crew on October 31st.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#e0302d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} ${nunito.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
