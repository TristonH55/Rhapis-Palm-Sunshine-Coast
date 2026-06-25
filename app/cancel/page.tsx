import Link from "next/link";
import { XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CancelPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-20">
      <Card className="max-w-xl text-center">
        <CardContent className="flex flex-col items-center gap-4 px-8 py-12">
          <span className="flex size-16 items-center justify-center rounded-full bg-secondary text-muted-foreground">
            <XCircle className="size-9" />
          </span>
          <h1 className="font-serif text-4xl text-foreground">Payment cancelled</h1>
          <p className="text-muted-foreground">
            No charge was made. Your Rhapis Palm is still available — pick up right
            where you left off whenever you&apos;re ready.
          </p>
          <Link href="/#buy" className={cn(buttonVariants({ size: "lg" }), "mt-2")}>
            Return to checkout
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
