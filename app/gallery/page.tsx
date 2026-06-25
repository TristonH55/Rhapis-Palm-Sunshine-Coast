import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { GALLERY } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Gallery — Rhapis Palms Sunshine Coast",
  description: "Photos of our mature, locally grown Rhapis (Lady) Palms.",
};

export default function GalleryPage() {
  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Our specimens
          </p>
          <h1 className="mt-3 font-serif text-5xl text-foreground">Gallery</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Mature, multi-stemmed Rhapis Palms — every plant a minimum of 2 metres
            tall, with most taller. Grown right here on the Sunshine Coast.
          </p>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {GALLERY.map((src, i) => (
            <div
              key={src}
              className="overflow-hidden rounded-2xl border border-border bg-secondary"
            >
              <Image
                src={src}
                alt={`Rhapis Palm specimen ${i + 1}`}
                width={800}
                height={1000}
                className="h-auto w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/#buy" className={cn(buttonVariants({ size: "lg" }))}>
            Reserve yours — $1,200 AUD <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
