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
  Hotel,
  Building2,
  Sparkles,
  Flame,
} from "lucide-react";
import { getProduct } from "@/lib/db";
import {
  FEATURES,
  FAQ,
  GALLERY,
  TOTAL_STOCK,
  BULK,
  formatAud,
} from "@/lib/site";
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
import { HeroCarousel } from "@/components/hero-carousel";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const FEATURE_ICONS = { sun: Sun, shield: ShieldCheck, home: HomeIcon, leaf: Leaf };

const USE_CASES = [
  {
    icon: Hotel,
    title: "Hotels & resorts",
    body: "Make an instant statement in foyers, lobbies and pool surrounds with mature, resort-grade greenery.",
  },
  {
    icon: Building2,
    title: "Property developers",
    body: "Finish new developments with established palms that look complete on day one — no waiting years to grow in.",
  },
  {
    icon: Sparkles,
    title: "Stylists & corporate",
    body: "Premium feature plants for home staging, corporate fit-outs and styled interiors that photograph beautifully.",
  },
];

function StockBadge({ stock, hurry = false }: { stock: number; hurry?: boolean }) {
  const soldOut = stock <= 0;
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 border-primary/30 text-foreground",
        hurry && !soldOut && "border-gold/50 text-gold-foreground"
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          soldOut ? "bg-muted-foreground" : hurry ? "bg-gold" : "bg-primary"
        )}
      />
      {soldOut
        ? "Sold out"
        : `Only ${stock} of ${TOTAL_STOCK} left${hurry ? " — hurry!" : ""}`}
    </Badge>
  );
}

export default async function Home() {
  const product = await getProduct();
  const stock = product?.stock ?? 0;
  const price = product ? formatAud(product.price_cents) : "$1,200";
  const bulkPrice = formatAud(BULK.priceCents);
  const bulkSaving = formatAud(BULK.qty * (product?.price_cents ?? 120000) - BULK.priceCents);
  const soldOut = stock <= 0;
  const bulkAvailable = stock >= BULK.qty;

  return (
    <main className="flex flex-col">
      {/* ===== HERO (split) ===== */}
      <section className="relative overflow-hidden">
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
              Mature, locally grown Lady Palms —{" "}
              <strong className="text-foreground">
                every plant a minimum of 2 metres tall
              </strong>
              , with most taller. The perfect blend of tropical sophistication and
              easy-care living.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <span className="font-serif text-4xl font-semibold text-foreground">
                {price}
                <span className="ml-1 align-middle font-sans text-base font-normal text-muted-foreground">
                  AUD
                </span>
              </span>
              <StockBadge stock={stock} hurry />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <BuyButton soldOut={soldOut} />
              <Link
                href="/gallery"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                View gallery <ArrowRight className="size-4" />
              </Link>
            </div>
            <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4 text-primary" /> Pickup only — Alexandra
              Headland, Sunshine Coast
            </p>
          </div>

          {/* right: carousel */}
          <div className="order-1 lg:order-2">
            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-5 text-sm font-medium text-muted-foreground">
          <span className="flex items-center gap-2"><Sprout className="size-4 text-primary" /> Locally grown</span>
          <Separator orientation="vertical" className="hidden h-4 sm:block" />
          <span className="flex items-center gap-2"><Ruler className="size-4 text-primary" /> Minimum 2m (avg taller)</span>
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
              One premium specimen · minimum 2m tall · locally grown
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
                  <StockBadge stock={stock} hurry />
                </div>

                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> Every plant a minimum of 2m tall</li>
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

      {/* ===== TRADE / BULK + CORPORATE USE CASES ===== */}
      <section id="bulk" className="scroll-mt-20 bg-primary px-6 py-20 text-primary-foreground">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/70">
              <Building2 className="size-4" /> Trade & bulk
            </p>
            <h2 className="mt-3 font-serif text-4xl text-primary-foreground">
              Premium palms for hotels, developers & stylists
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/80">
              Mature, resort-grade Rhapis Palms make an instant impression — no
              waiting years for them to establish. Perfect for commercial and
              styled spaces.
            </p>
          </div>

          {/* use cases */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {USE_CASES.map((u) => (
              <div
                key={u.title}
                className="rounded-2xl bg-primary-foreground/5 p-6 ring-1 ring-primary-foreground/10"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary-foreground/10 text-primary-foreground">
                  <u.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-serif text-xl text-primary-foreground">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">
                  {u.body}
                </p>
              </div>
            ))}
          </div>

          {/* bulk deal */}
          <Card className="mx-auto mt-12 max-w-2xl text-center">
            <CardContent className="flex flex-col items-center gap-4 p-8">
              <Badge className="gap-1.5 bg-gold text-gold-foreground">
                <Flame className="size-3.5" /> Best value
              </Badge>
              <h3 className="font-serif text-3xl text-foreground">
                Bulk pack — {BULK.qty} palms
              </h3>
              <div className="flex flex-wrap items-end justify-center gap-3">
                <span className="font-serif text-5xl font-semibold text-foreground">
                  {bulkPrice}
                </span>
                <span className="mb-1 text-sm text-muted-foreground">
                  AUD for {BULK.qty} · save {bulkSaving}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                That&apos;s {formatAud(BULK.priceCents / BULK.qty)} per palm, each a
                minimum of 2m tall. Pickup only — Sunshine Coast.
              </p>
              <BuyButton
                bundle="bulk"
                soldOut={!bulkAvailable}
                label={`Buy ${BULK.qty} for ${bulkPrice} AUD`}
                className="mt-2 w-full sm:w-auto"
              />
              {!bulkAvailable && !soldOut && (
                <p className="text-xs text-muted-foreground">
                  Fewer than {BULK.qty} left — please{" "}
                  <Link href="/contact" className="underline">contact us</Link> for
                  availability.
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Need more than {BULK.qty}?{" "}
                <Link href="/contact" className="text-primary underline">
                  Contact us for volume pricing
                </Link>
                .
              </p>
            </CardContent>
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
      <section className="bg-foreground px-6 py-20 text-background">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl text-background">Bring the tropics home</h2>
          <p className="mx-auto mt-4 max-w-md text-background/80">
            {soldOut
              ? "All have now sold — thank you to everyone."
              : `Only ${stock} of ${TOTAL_STOCK} premium mature palms remain. ${price} AUD each, or ${bulkPrice} for ${BULK.qty}. Pickup only.`}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/#buy" className={cn(buttonVariants({ size: "lg", variant: "secondary" }))}>
              {soldOut ? "View details" : "Reserve yours now"} <ArrowRight className="size-4" />
            </Link>
            {!soldOut && bulkAvailable && (
              <Link
                href="/#bulk"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
                )}
              >
                See bulk deal
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
