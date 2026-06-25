import Link from "next/link";
import { CheckCircle2, MapPin } from "lucide-react";
import { stripe } from "@/lib/stripe";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let name: string | null = null;
  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      name = session.customer_details?.name ?? null;
    } catch {
      // ignore — still show a generic thank-you
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-20">
      <Card className="max-w-xl text-center">
        <CardContent className="flex flex-col items-center gap-4 px-8 py-12">
          <span className="flex size-16 items-center justify-center rounded-full bg-accent text-primary">
            <CheckCircle2 className="size-9" />
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Order confirmed
          </p>
          <h1 className="font-serif text-4xl text-foreground">
            Thank you{name ? `, ${name}` : ""}!
          </h1>
          <p className="text-muted-foreground">
            Your Rhapis Palm is reserved. A payment receipt has been emailed to you
            by Stripe.
          </p>
          <div className="flex items-start gap-2 rounded-xl bg-secondary/60 p-4 text-left text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
            <span>
              <strong className="text-foreground">Pickup only — Sunshine Coast.</strong>{" "}
              We&apos;ll be in touch shortly using the phone and email from your
              checkout to arrange a time. Please bring a suitable vehicle.
            </span>
          </div>
          <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-2")}>
            Back to home
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
