"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Leaf, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/care", label: "Plant Care" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ stock }: { stock: number | null }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const soldOut = stock !== null && stock <= 0;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Leaf className="size-5" />
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
            Rhapis Palms
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {stock !== null && (
            <Badge
              variant="outline"
              className="hidden gap-1.5 border-primary/30 text-foreground sm:inline-flex"
            >
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  soldOut ? "bg-muted-foreground" : "bg-primary"
                )}
              />
              {soldOut ? "Sold out" : `${stock} of 20 left`}
            </Badge>
          )}

          <Link
            href="/#buy"
            className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}
          >
            Buy now
          </Link>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "md:hidden"
              )}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-6">
              <SheetHeader className="px-0">
                <SheetTitle className="flex items-center gap-2 font-serif text-xl">
                  <Leaf className="size-5 text-primary" /> Rhapis Palms
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1">
                {NAV.map((item) => (
                  <SheetClose
                    key={item.href}
                    render={
                      <Link
                        href={item.href}
                        className={cn(
                          "rounded-md px-3 py-3 text-base font-medium transition-colors",
                          pathname === item.href
                            ? "bg-accent text-primary"
                            : "text-foreground hover:bg-muted"
                        )}
                      >
                        {item.label}
                      </Link>
                    }
                  />
                ))}
              </nav>
              <SheetClose
                render={
                  <Link
                    href="/#buy"
                    className={cn(buttonVariants({ size: "lg" }), "mt-6 w-full")}
                  >
                    Buy now — $1,200 AUD
                  </Link>
                }
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
