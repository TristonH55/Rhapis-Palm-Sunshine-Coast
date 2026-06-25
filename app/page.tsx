import Image from "next/image";
import Link from "next/link";
import {
  Sun,
  ShieldCheck,
  Home as HomeIcon,
  Leaf,
  MapPin,
  Check,
  ArrowRight,
  Sprout,
  Ruler,
} from "lucide-react";
import { getProduct } from "@/lib/db";
import { FEATURES, FAQ, GALLERY, HERO_IMAGE, formatAud } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BuyButton } from "@/components/buy-button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const FEATURE_ICONS = { sun: Sun, shield: ShieldCheck, home: HomeIcon, leaf: Leaf };

function StockBadge({ stock }: { stock: number }) {
  const soldOut = stock <= 0;
  return (
    <Badge variant="outline" className="gap-1.5 border-primary/30 text-foreground">
      <span
        className={cn(
          "size-1.5 rounded-full",
          soldOut ? "bg-muted-foreground" : "bg-primary"
        )}
      />
      {soldOut ? "Sold out" : `Only ${stock} of 20 remaining`}
    </Badge>
  );
}

export default async function Home() {
  const product = await getProduct();
  const stock = product?.stock ?? 0;
  const price = product ? formatAud(product.price_cents) : "$1,200";
  const soldOut = stock <= 0;

  return (
    <main className="flex flex-col">
      {/* ===== HERO (split) ===== */}
      <section className="relative overflow-hidden">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-accent/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-secondary/60 blur-3xl" />

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:py-24">
          {/* left: copy */}
          <div className="order-2 lg:order-1">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              <Sprout className="size-4" /> Timeless Tropical Beauty
            </p>
            <h1 className="mt-5 font-serif text-5xl leading-[0.95] text-foreground sm:text-6xl">
              Rhapis Palm
              <span className="mt-1 block text-3xl italic text-primary sm:text-4xl">
                Sunshine Coast
              </span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              Mature, locally grown Lady Palms — averaging around{" "}
              <strong className="text-foreground">2 metres tall</strong>. The
              perfect blend of tropical sophistication and easy-care living.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <span className="font-serif text-4xl font-semibold text-foreground">
                {price}
                <span className="ml-1 align-middle text-base font-sans font-normal text-muted-foreground">
                  AUD
                </span>
              </span>
              <StockBadge stock={stock} />
            </div>

            <div id="buy-hero" className="mt-8 flex flex-wrap items-center gap-3">
              <BuyButton soldOut={soldOut} />
              <Link
                href="/gallery"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                View gallery <ArrowRight className="size-4" />
              </Link>
            </div>
            <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4 text-primary" /> Pickup only — Sunshine Coast
            </p>
          </div>

          {/* right: framed photo */}
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-xl">
                <Image
                  src={HERO_IMAGE}
                  alt="Mature Rhapis Palm specimen"
                  width={900}
                  height={1100}
                  priority
                  className="h-[26rem] w-full object-cover sm:h-[32rem]"
                />
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-sm font-medium shadow-md backdrop-blur">
                <Ruler className="size-4 text-primary" /> ~2m mature specimen
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-5 text-sm font-medium text-muted-foreground">
          <span className="flex items-center gap-2"><Sprout className="size-4 text-primary" /> Locally grown</span>
          <Separator orientation="vertical" className="hidden h-4 sm:block" />
          <span className="flex items-center gap-2"><Ruler className="size-4 text-primary" /> ~2m mature</span>
          <Separator orientation="vertical" className="hidden h-4 sm:block" />
          <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Hardy & low-care</span>
          <Separator orientation="vertical" className="hidden h-4 sm:block" />
          <span className="flex items-center gap-2"><MapPin className="size-4 text-primary" /> Sunshine Coast pickup</span>
        </div>
      </section>

      {/* ===== PRODUCT CARD (the buy unit) ===== */}
      <section id="buy" className="scroll-mt-20 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-4xl text-foreground">Reserve your Rhapis Palm</h2>
            <p className="mt-3 text-muted-foreground">
              One premium specimen · approx. 2m tall · locally grown
            </p>
          </div>

          <Card className="overflow-hidden p-0">
            <div className="grid md:grid-cols-2">
              <div className="relative min-h-64">
                <Image
                  src="/Rhapis-Palm-3.png"
                  alt="Rhapis Palm for sale"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <CardContent className="flex flex-col justify-center gap-5 p-8">
                <div>
                  <h3 className="font-serif text-2xl text-foreground">
                    Rhapis Palm — Sunshine Coast
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Mature Lady Palm (<em>Rhapis excelsa</em>)
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-serif text-4xl font-semibold text-foreground">
                    {price}
                  </span>
                  <span className="text-sm text-muted-foreground">AUD</span>
                  <StockBadge stock={stock} />
                </div>

                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> Locally grown on the Sunshine Coast</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> Hardy, shade-tolerant & low-maintenance</li>
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> Perfect indoors or outdoors</li>
                </ul>

                <div className="flex flex-col gap-2">
                  <BuyButton soldOut={soldOut} className="w-full" />
                  <p className="text-center text-xs text-muted-foreground">
                    🔒 Secure checkout by Stripe · 📍 Pickup only — Sunshine Coast
                  </p>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* ===== WHY RHAPIS (benefit cards) ===== */}
      <section className="bg-secondary/30 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-4xl text-foreground">Why a Rhapis Palm?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              One of the most refined and forgiving palms you can grow — and a rare
              find at this size and maturity.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => {
              const Icon = FEATURE_ICONS[f.icon];
              return (
                <Card key={f.title} className="h-full">
                  <CardContent className="pt-6">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-primary">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-4 font-serif text-xl text-foreground">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {f.body}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== GALLERY PREVIEW ===== */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-4xl text-foreground">Gallery</h2>
              <p className="mt-2 text-muted-foreground">A look at our mature specimens.</p>
            </div>
            <Link
              href="/gallery"
              className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
            >
              View all <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {GALLERY.slice(0, 4).map((src, i) => (
              <div
                key={src}
                className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-secondary"
              >
                <Image
                  src={src}
                  alt={`Rhapis Palm specimen ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-secondary/30 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center font-serif text-4xl text-foreground">
            Frequently asked
          </h2>
          <Accordion>
            {FAQ.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-base">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ===== FINAL CTA BAND ===== */}
      <section className="bg-primary px-6 py-20 text-primary-foreground">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl text-primary-foreground">
            Bring the tropics home
          </h2>
          <p className="mx-auto mt-4 max-w-md text-primary-foreground/80">
            {soldOut
              ? "All 20 have now sold — thank you to everyone."
              : `Only ${stock} of these premium mature palms remain. ${price} AUD, pickup only.`}
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/#buy"
              className={cn(
                buttonVariants({ size: "lg", variant: "secondary" })
              )}
            >
              {soldOut ? "View details" : "Reserve yours now"} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
