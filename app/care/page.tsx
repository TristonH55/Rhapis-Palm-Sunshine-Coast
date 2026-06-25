import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Sun, Droplets, FlaskConical, Thermometer, Scissors, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Plant Care — Rhapis Palms Sunshine Coast",
  description:
    "How to care for your Rhapis (Lady) Palm — light, watering, feeding and positioning. Hardy, shade-tolerant and low-maintenance.",
};

const CARE = [
  {
    icon: Sun,
    title: "Light",
    body: "Loves bright, indirect light but is famously shade-tolerant. Avoid harsh, direct afternoon sun, which can scorch the fronds. Ideal for shaded patios and well-lit indoor spots.",
  },
  {
    icon: Droplets,
    title: "Watering",
    body: "Keep the soil lightly moist in the warmer months and let the top few centimetres dry out between waterings. Don't let it sit in water — good drainage is key.",
  },
  {
    icon: FlaskConical,
    title: "Feeding",
    body: "A slow-release palm fertiliser in spring and summer keeps the foliage deep green. Rhapis are slow growers and don't need heavy feeding.",
  },
  {
    icon: Thermometer,
    title: "Position",
    body: "Happy indoors or outdoors in a sheltered, shaded position. Perfect for Sunshine Coast courtyards, entrances, pool surrounds and living rooms.",
  },
  {
    icon: Scissors,
    title: "Maintenance",
    body: "Very low-maintenance. Simply trim any old or damaged fronds at the base. Wipe indoor leaves occasionally to keep them glossy and dust-free.",
  },
];

export default function CarePage() {
  return (
    <main>
      {/* intro */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Easy-care elegance
            </p>
            <h1 className="mt-3 font-serif text-5xl text-foreground">Plant care</h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
              The Rhapis Palm is one of the most forgiving palms you can grow. With
              a little light and the occasional water, it rewards you for years with
              lush, evergreen foliage — indoors or out.
            </p>
            <Link
              href="/#buy"
              className={cn(buttonVariants({ size: "lg" }), "mt-7")}
            >
              Get your own <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="relative mx-auto max-w-md">
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-border shadow-xl">
              <Image
                src="/Rhapis-Palm-5.png"
                alt="Rhapis Palm foliage"
                width={900}
                height={1000}
                className="h-[28rem] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* care cards */}
      <section className="bg-secondary/30 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2">
            {CARE.map((c) => (
              <Card key={c.title} className="h-full">
                <CardContent className="flex gap-4 pt-6">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                    <c.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-foreground">{c.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {c.body}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* about */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-serif text-4xl text-foreground">
            About our plants
          </h2>
          <p className="mt-6 text-center text-lg leading-relaxed text-muted-foreground">
            Every Rhapis Palm we sell is grown locally on the Sunshine Coast and
            acclimatised to our conditions. These are mature, well-established
            specimens — not seedlings — with every plant a minimum of 2 metres tall
            (most are taller), ready to make an immediate statement in your home or
            garden.
          </p>
          <div className="mt-10">
            <Accordion>
              <AccordionItem value="why">
                <AccordionTrigger>Why choose a mature specimen?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Rhapis Palms are slow growers, so a 2-metre plant represents years
                  of growth. Buying mature means instant impact without the long wait.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="pickup">
                <AccordionTrigger>How does pickup work?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  After purchase we contact you using the details from checkout to
                  arrange a convenient Sunshine Coast pickup time. Please bring a
                  suitable vehicle — these are large, healthy plants.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  );
}
