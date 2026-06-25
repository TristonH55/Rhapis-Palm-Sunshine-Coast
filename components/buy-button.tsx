"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type ButtonSize = "default" | "sm" | "lg";

export function BuyButton({
  soldOut = false,
  size = "lg",
  className,
  label = "Buy now — $1,200 AUD",
}: {
  soldOut?: boolean;
  size?: ButtonSize;
  className?: string;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout. Please try again.");
      }
      window.location.href = data.url as string;
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  }

  if (soldOut) {
    return (
      <Button size={size} variant="secondary" disabled className={className}>
        Sold out — thank you
      </Button>
    );
  }

  return (
    <Button size={size} onClick={handleBuy} disabled={loading} className={className}>
      {loading ? (
        <>
          <Loader2 className="animate-spin" />
          Redirecting to secure checkout…
        </>
      ) : (
        label
      )}
    </Button>
  );
}
