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
    techStack: ["React Native", "Next.js", "Node.js"],
    imageSrc: "/case-studies/cometake.png",
    imageAlt: "Cometake storefront homepage with featured product carousel",
  },
  {
    id: "idikarh-properties",
    title: "Idikarh Properties",
    tagline: "Real Estate, Real Easy",
    problem:
      "Idikarh Properties needed a brand presence that made finding and enquiring about a listing feel effortless, matching their positioning.",
    whatWasBuilt:
      "A real estate brand site built around a browsable listings grid, property detail pages, and a direct enquiry path.",
    standoutDetail:
      "Every listing page is built to load fast on mobile data, where most property searches in Nigeria actually happen.",
    techStack: ["Next.js", "Tailwind CSS"],
    imageSrc: "/case-studies/idikarh-properties.svg",
    imageAlt: "Placeholder cover image for the Idikarh Properties case study",
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
    techStack: ["Next.js", "PostgreSQL", "Full-text search"],
    imageSrc: "/case-studies/ijsr.png",
    imageAlt:
      "International Journal of Spectrum Research homepage with journal title and mission statement",
  },
  {
    id: "savannah-spot",
    title: "Savannah Spot",
    problem:
      "Local discovery in Nigerian cities is scattered across group chats and word of mouth. Savannah Spot needed a single place to browse hotels, gyms, and eateries.",
    whatWasBuilt:
      "A local discovery app with a premium glassmorphism interface, covering hotels, gyms, and eateries in one browsable, searchable experience.",
    standoutDetail:
      "The interface uses layered glass panels over real venue photography, a visual treatment few local discovery apps in the market use.",
    techStack: ["React Native", "Node.js", "PostgreSQL"],
    imageSrc: "/case-studies/savannah-spot.svg",
    imageAlt: "Placeholder cover image for the Savannah Spot case study",
    featured: true,
  },
  {
    id: "yunivax-sports",
    title: "Yunivax Sports",
    problem:
      "Football fans wanted live scores and match chat in one place, updating in real time instead of refreshing a page.",
    whatWasBuilt:
      "A real-time football platform combining live match scores with in-match chat, so fans follow and discuss a game as it happens.",
    standoutDetail:
      "Scores and chat messages both update over the same real-time connection, typically under a second behind the actual play.",
    techStack: ["Next.js", "WebSockets", "Node.js"],
    imageSrc: "/case-studies/yunivax-sports.svg",
    imageAlt: "Placeholder cover image for the Yunivax Sports case study",
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
  },
];
