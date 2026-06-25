import type { Metadata } from "next";
import { MapPin, Mail, Phone, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { BUSINESS } from "@/lib/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact — Rhapis Palms Sunshine Coast",
  description:
    "Get in touch about our Rhapis (Lady) Palms. Pickup only on the Sunshine Coast.",
};

const INFO = [
  { icon: Phone, title: "Phone", body: BUSINESS.phone, href: BUSINESS.phoneHref },
  { icon: Mail, title: "Email", body: BUSINESS.email, href: `mailto:${BUSINESS.email}` },
  { icon: MapPin, title: "Location", body: BUSINESS.address },
  { icon: Truck, title: "Pickup only", body: "Arranged after purchase — bring a suitable vehicle." },
];

export default function ContactPage() {
  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            We&apos;d love to hear from you
          </p>
          <h1 className="mt-3 font-serif text-5xl text-foreground">Contact</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Questions about our Rhapis Palms or pickup? Send us a message.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="pt-6">
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4 lg:col-span-2">
            {INFO.map((item) => (
              <Card key={item.title}>
                <CardContent className="flex items-start gap-3 pt-6">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                    <item.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-medium text-foreground">{item.title}</h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        {item.body}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{item.body}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
