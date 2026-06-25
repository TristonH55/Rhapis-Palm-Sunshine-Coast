export const BUSINESS = {
  name: "Rhapis Palms",
  region: "Sunshine Coast, QLD",
  email: "hello@rhapispalms.com.au", // update to your real address
};

export const GALLERY = [
  "/Rhapis-Palm-1.png",
  "/Rhapis-Palm-2.png",
  "/Rhapis-Palm-3.png",
  "/Rhapis-Palm-4.png",
  "/Rhapis-Palm-5.png",
  "/Rhapis-Palm-6.png",
  "/Rhapis-Palms-7.png",
];

export const HERO_IMAGE = "/Rhapis-Palm-1.png";

export const FEATURES = [
  {
    icon: "sun",
    title: "Thrives in shade & sun",
    body: "Famously shade-tolerant — perfect for patios, courtyards and indoors.",
  },
  {
    icon: "shield",
    title: "Hardy & low maintenance",
    body: "Slow-growing, pest-resistant and forgiving. Easy-care elegance.",
  },
  {
    icon: "home",
    title: "Indoor & outdoor",
    body: "Equally at home in a living room or a shaded Sunshine Coast garden.",
  },
  {
    icon: "leaf",
    title: "Lush tropical appeal",
    body: "Full, fan-leaved foliage that brings instant resort-style greenery.",
  },
] as const;

export const FAQ = [
  {
    q: "How big are the plants?",
    a: "These are mature, well-established specimens averaging around 2 metres tall — multi-stemmed and full. Sizes vary slightly as each is a living plant.",
  },
  {
    q: "Is it pickup only?",
    a: "Yes. All plants are pickup only from the Sunshine Coast. After your purchase we'll contact you using the phone and email from checkout to arrange a convenient time. Please bring a suitable vehicle.",
  },
  {
    q: "How do I pay?",
    a: "Securely online via Stripe — all major cards accepted. Card details are handled by Stripe and never touch our site. You'll receive an emailed receipt.",
  },
  {
    q: "Are they easy to care for?",
    a: "Very. Rhapis Palms are one of the most forgiving palms you can grow — they tolerate shade, handle indoor conditions well and need minimal attention. See our Plant Care page for a full guide.",
  },
  {
    q: "How many are available?",
    a: "We only have 20 of these premium mature specimens. Stock updates live on this page as they sell.",
  },
];

export function formatAud(cents: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
