export const BUSINESS = {
  name: "Rhapis Palms",
  region: "Sunshine Coast, QLD",
  email: "albliz@bigpond.com",
  phone: "+61 0415 224 473",
  phoneHref: "tel:+61415224473",
  address: "Alexandra Headland, QLD, Sunshine Coast, 4557",
};

// Total ever offered (for "X of TOTAL" scarcity messaging). Live remaining
// comes from the database.
export const TOTAL_STOCK = 37;

// Single plant + bulk/trade bundle.
export const SINGLE_PRICE_CENTS = 120000; // $1,200 AUD
export const BULK = {
  qty: 10,
  priceCents: 980000, // $9,800 AUD for 10 (save $2,200)
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
    a: "Every plant is a minimum of 2 metres tall — many are taller, so the average is well above 2m. These are mature, well-established, multi-stemmed specimens. As each is a living plant, exact heights vary.",
  },
  {
    q: "Is it pickup only?",
    a: "Yes. All plants are pickup only from Alexandra Headland on the Sunshine Coast. After your purchase we'll contact you using the phone and email from checkout to arrange a convenient time. Please bring a suitable vehicle.",
  },
  {
    q: "Do you offer bulk or trade pricing?",
    a: "Yes — buy 10 palms for $9,800 AUD (a saving of $2,200). Ideal for hotels, resorts, property developers and stylists. Use the bulk option on this page, or contact us for larger volumes.",
  },
  {
    q: "How do I pay?",
    a: "Securely online via Stripe — all major cards accepted. Card details are handled by Stripe and never touch our site. You'll receive an emailed receipt.",
  },
  {
    q: "Are they easy to care for?",
    a: "Very. Rhapis Palms are one of the most forgiving palms you can grow — they tolerate shade, handle indoor conditions well and need minimal attention. See our Plant Care page for a full guide.",
  },
];

export function formatAud(cents: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
