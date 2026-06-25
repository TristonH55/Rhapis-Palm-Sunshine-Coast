import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { getProduct } from "@/lib/db";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";

// Elegant serif for headlines + clean sans for body.
const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Rhapis Palm — Sunshine Coast | Premium Lady Palms",
  description:
    "Mature, locally grown Rhapis (Lady) Palms on the Sunshine Coast — averaging around 2m tall. Elegant, resilient, evergreen. $1,200 AUD each or 10 for $9,800, pickup only. Limited stock.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Live stock for the header badge; never let a DB hiccup break the whole app.
  let stock: number | null = null;
  try {
    const product = await getProduct();
    stock = product?.stock ?? null;
  } catch {
    stock = null;
  }

  return (
    <html
      lang="en"
      className={cn("h-full antialiased", serif.variable, sans.variable, "font-sans")}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SiteHeader stock={stock} />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
