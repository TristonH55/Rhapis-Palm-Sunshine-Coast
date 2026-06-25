"use client";

import * as React from "react";
import Image from "next/image";
import { Ruler } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { GALLERY } from "@/lib/site";
import { cn } from "@/lib/utils";

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  // gentle auto-advance
  React.useEffect(() => {
    if (!api) return;
    const id = setInterval(() => api.scrollNext(), 4500);
    return () => clearInterval(id);
  }, [api]);

  return (
    <div className="relative mx-auto max-w-md">
      <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-xl"
      >
        <CarouselContent className="ml-0">
          {GALLERY.map((src, i) => (
            <CarouselItem key={src} className="pl-0">
              <Image
                src={src}
                alt={`Rhapis Palm specimen ${i + 1}`}
                width={900}
                height={1100}
                priority={i === 0}
                className="h-[26rem] w-full object-cover sm:h-[32rem]"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3" />
        <CarouselNext className="right-3" />
      </Carousel>

      {/* dots */}
      <div className="absolute inset-x-0 bottom-16 flex justify-center gap-1.5">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "size-2 rounded-full transition-all",
              i === current ? "w-5 bg-white" : "bg-white/60 hover:bg-white/80"
            )}
          />
        ))}
      </div>

      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-sm font-medium shadow-md backdrop-blur">
        <Ruler className="size-4 text-primary" /> Average around 2m
      </div>
    </div>
  );
}
