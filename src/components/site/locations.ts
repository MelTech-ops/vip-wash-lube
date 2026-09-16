// Single source of truth for business copy across the site.

// Link preview (Open Graph). This is the picture and text that appear when the site
// URL is pasted into iMessage, WhatsApp, Facebook, LinkedIn, Slack or X.
// OG_IMAGE: drop a 1200x630 JPG or PNG into public/ and point this at it, e.g.
// "/og-image.jpg". Leave it empty to fall back to the first Wix service image.
export const SITE = {
  name: "VIP Wash & Lube",
  ogImage: "/og-image.jpg",
  ogImageAlt: "VIP Wash & Lube detailing bay",
};

// PLACEHOLDER: hours, prices and the location blurbs are benchmarked, not confirmed.
// Replace with the owner's real figures before this goes anywhere public.

export interface Location {
  slug: string;
  city: string;
  address: string;
  cityStateZip: string;
  phone: string;
  phoneHref: string;
  mapsQuery: string;
  blurb: string;
  features: string[];
}

export const LOCATIONS: Location[] = [
  {
    slug: "stratford",
    city: "Stratford",
    address: "1747 Stratford Avenue",
    cityStateZip: "Stratford, CT 06615",
    phone: "(203) 380-9274",
    phoneHref: "tel:+12033809274",
    mapsQuery: "1747+Stratford+Avenue+Stratford+CT+06615",
    blurb:
      "The original shop, and still the busiest. Three detail bays behind the wash tunnel, with the lounge looking straight into them.",
    features: ["Express wash tunnel", "3 detail bays", "Full lube service", "Customer lounge"],
  },
  {
    slug: "bridgeport",
    city: "Bridgeport",
    address: "1837 Main Street",
    cityStateZip: "Bridgeport, CT 06604",
    phone: "(203) 696-1073",
    phoneHref: "tel:+12036961073",
    mapsQuery: "1837+Main+Street+Bridgeport+CT+06604",
    blurb:
      "Main Street location built for volume. In and out on a lunch break, or leave the car with us for the afternoon.",
    features: ["Express wash tunnel", "2 detail bays", "Full lube service", "Members lane"],
  },
  {
    slug: "east-hartford",
    city: "East Hartford",
    address: "170 Tolland Street",
    cityStateZip: "East Hartford, CT 06108",
    phone: "(860) 263-8865",
    phoneHref: "tel:+18602638865",
    mapsQuery: "170+Tolland+Street+East+Hartford+CT+06108",
    blurb:
      "Our newest shop, and the one set up for the heavy work. Ceramic coatings and multi-stage paint correction under controlled light.",
    features: ["Express wash tunnel", "2 detail bays", "Coating cure bay", "Full lube service"],
  },
];

export const HOURS = [
  { days: "Monday to Friday", time: "8:00 AM to 6:00 PM" },
  { days: "Saturday", time: "8:00 AM to 6:00 PM" },
  { days: "Sunday", time: "9:00 AM to 4:00 PM" },
];

export const WASH_MENU = [
  { name: "Express Exterior", price: "$13", detail: "Soft-touch wash, spot-free rinse, power dry" },
  { name: "Wheels Express", price: "$19", detail: "Express Exterior plus wheel cleaner and tire shine" },
  { name: "Super Shine", price: "$19", detail: "Express Exterior plus triple-foam polish and clear coat" },
  { name: "The Works", price: "$25", detail: "Everything above, plus undercarriage bath and rain repellent" },
];

export const LUBE_MENU = [
  { name: "All Weather Oil Change", price: "$34.99", detail: "Up to 5 quarts, new filter, 21-point inspection" },
  { name: "High Mileage", price: "$74.99", detail: "For vehicles over 75,000 miles" },
  { name: "Full Synthetic", price: "$79.99", detail: "Extended drain interval, full synthetic blend" },
  { name: "Full Synthetic Premium", price: "$109.99", detail: "Top-tier synthetic, maximum protection" },
];

export const MEMBERSHIP = {
  price: "$27.99",
  cadence: "per month",
  name: "The VIP Club",
  perks: [
    "Unlimited Express Exterior washes, every day",
    "Members-only lane at all three locations",
    "20% off every detail package",
    "Add a second vehicle for $19/month",
  ],
};

// Reviews come from each location's Google Business Profile once connected.
// No testimonial copy is invented anywhere in this project.
export const REVIEW_LINKS = LOCATIONS.map((l) => ({
  city: l.city,
  write: `https://search.google.com/local/writereview?q=VIP+Wash+%26+Lube+${encodeURIComponent(l.city)}+CT`,
  read: `https://www.google.com/search?q=VIP+Wash+%26+Lube+${encodeURIComponent(l.city)}+CT+reviews`,
}));

export const STATS = [
  { figure: "3", label: "Connecticut locations" },
  { figure: "30+", label: "Years on Stratford Ave" },
  { figure: "7", label: "Detail bays" },
  { figure: "7", label: "Days a week" },
];

export const STANDARDS = [
  { n: "01", title: "Two buckets, always", body: "Grit guards, a fresh microfiber per panel, pH-neutral soap. We do not put swirl marks into paint we were hired to correct." },
  { n: "02", title: "Bays you can see into", body: "Glass-front detail bays at every location. Watch the work from the lounge, or don't. The result is the same." },
  { n: "03", title: "The same hands, every time", body: "Family-run since the Stratford Avenue shop opened. Our detailers stay, so your car meets someone who remembers it." },
];

export const STORY = [
  {
    heading: "It started with one tunnel on Stratford Avenue",
    body: "A single wash bay, a hand-painted sign, and a rule that has not changed since: nobody drives off in a car we would not be happy to hand back to our own family. The tunnel got busier, the lube bay went in, and the detail bays came last, because we would not offer detailing until we could do it properly.",
  },
  {
    heading: "Three shops, one standard",
    body: "Bridgeport came next, then East Hartford. Same equipment, same chemicals, same training. A Complete VIP Detail means the identical thing in all three towns, which sounds obvious and is genuinely rare in this business.",
  },
  {
    heading: "Why the detail bays have glass fronts",
    body: "Because most people have never actually watched their car being detailed, and once they do they understand what they are paying for. Clay bar decontamination, a machine polish under proper light, leather conditioned by hand. It is slow work. That is the point.",
  },
];
