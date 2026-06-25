import Link from "next/link";
import { Leaf, MapPin, Mail, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Leaf className="size-4" />
            </span>
            <span className="font-serif text-lg font-semibold">Rhapis Palms</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Mature, locally grown Rhapis (Lady) Palms — elegant, resilient and
            evergreen. Grown on the Sunshine Coast.
          </p>
        </div>

        <div>
          <h3 className="font-serif text-base font-semibold">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            <li><Link href="/gallery" className="hover:text-foreground">Gallery</Link></li>
            <li><Link href="/care" className="hover:text-foreground">Plant Care</Link></li>
            <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-base font-semibold">Pickup location</h3>
          <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>
              {BUSINESS.address}
              <span className="block">Pickup only — arranged after purchase.</span>
            </span>
          </p>
        </div>

        <div>
          <h3 className="font-serif text-base font-semibold">Get in touch</h3>
          <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
            <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
            <a href={BUSINESS.phoneHref} className="hover:text-foreground">
              {BUSINESS.phone}
            </a>
          </p>
          <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
            <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
            <Link href="/contact" className="hover:text-foreground">
              Send us a message
            </Link>
          </p>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Rhapis Palms · Sunshine Coast, QLD · Locally grown
      </div>
    </footer>
  );
}
