export interface CaseStudy {
  id: string;
  title: string;
  tagline?: string;
  problem: string;
  whatWasBuilt: string;
  standoutDetail: string;
  techStack: string[];
  imageSrc: string;
  imageAlt: string;
  /** Natural pixel dimensions of imageSrc, so the card can size its frame to
   * exactly match the image's aspect ratio instead of leaving letterbox gaps. */
  imageWidth: number;
  imageHeight: number;
  /** Live project URL, shown as a "Visit site" link when present. */
  url?: string;
  featured?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "cometake",
    title: "Cometake",
    problem:
      "Cometake needed a single storefront that worked the same way on the web and as a mobile app, without keeping two separate codebases in sync.",
    whatWasBuilt:
      "A mobile and web e-commerce app sharing one backend, so product listings, orders, and inventory stay in sync everywhere customers shop.",
    standoutDetail:
      "Customers can start browsing on the website and finish checkout in the app without losing their cart.",
    techStack: ["Flutter", "Next.js", "Node.js"],
    imageSrc: "/case-studies/cometake.png",
    imageAlt: "Cometake storefront homepage with featured product carousel",
    imageWidth: 1310,
    imageHeight: 455,
    url: "https://cometake.net",
  },
  {
    id: "ijsr",
    title: "International Journal of Spectrum Research",
    problem:
      "The journal needed a proper submissions pipeline instead of managing manuscripts over email.",
    whatWasBuilt:
      "An academic publishing platform with author submissions, full-text search and filtering, and a searchable archive of past issues.",
    standoutDetail:
      "Search and filtering were built to handle years of back issues without the archive page slowing down.",
    techStack: ["Next.js", "Firebase", "Full-text search"],
    imageSrc: "/case-studies/ijsr.png",
    imageAlt:
      "International Journal of Spectrum Research homepage with journal title and mission statement",
    imageWidth: 1310,
    imageHeight: 565,
    url: "https://ijsrjournal.com",
  },
  {
    id: "savannah-spot",
    title: "Savannah Spot",
    problem:
      "Discerning travelers in Nigerian cities had no curated way to find premium hotels, restaurants, and experiences, just directory clutter and word of mouth.",
    whatWasBuilt:
      "A curated hospitality discovery platform covering hotels, restaurants, nightlife, and wellness venues, starting with Awka and built to expand city by city, with an interactive map and handpicked recommendations instead of exhaustive listings.",
    standoutDetail:
      "Every listing is hand-picked rather than pulled from an open directory, so what's live is a small, curated set worth actually visiting, not exhaustive clutter.",
    techStack: ["Next.js", "Node.js", "PostgreSQL"],
    imageSrc: "/case-studies/savannah-spot.png",
    imageAlt:
      'SavannaSpot homepage: "Experience Awka like never before" over a night skyline, with search and category sidebar',
    imageWidth: 1310,
    imageHeight: 900,
    url: "https://savannaspot.com",
    featured: true,
  },
  {
    id: "marketplace",
    title: "Multi-vendor marketplace",
    problem:
      "A multi-vendor marketplace needed each vendor to manage their own storefront while still sharing one checkout, payments, and wallet system.",
    whatWasBuilt:
      "A marketplace with per-vendor dashboards and role-based access, unified checkout via Paystack, an in-app wallet, and VTU airtime and data top-up built in.",
    standoutDetail:
      "Vendors get their own dashboard and permissions, but customers check out once, even when a cart spans multiple vendors.",
    techStack: ["Next.js", "Paystack", "Node.js"],
    imageSrc: "/case-studies/marketplace.png",
    imageAlt:
      "Perfekt Mart marketplace homepage with category grid and bill payment promo",
    imageWidth: 1310,
    imageHeight: 665,
    url: "https://perfektmart.com.ng",
  },
  {
    id: "perfektscore",
    title: "PerfektScore",
    problem:
      "Football fans juggle several different apps and sites just to keep track of fixtures, live scores, and highlights across the leagues they follow.",
    whatWasBuilt:
      "A football tracking platform covering 23 leagues and 6 major competitions, with live fixtures, results, team pages, and highlight clips in one place.",
    standoutDetail:
      "Highlight clips pull in automatically as matches finish, so fans don't have to go hunting for them after a big game.",
    techStack: ["Next.js", "TheSportsDB API", "Scorebat"],
    imageSrc: "/case-studies/perfektscore.png",
    imageAlt:
      "PerfektScore dashboard showing today's fixtures, live match count, and league sidebar",
    imageWidth: 1310,
    imageHeight: 900,
    url: "https://perfektscore.vercel.app",
    featured: true,
  },
];
