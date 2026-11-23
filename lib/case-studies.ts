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
  relatedLink?: { label: string; url: string };
  featured?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "cometake",
    title: "Cometake",
    problem:
      "Cometake needed a single storefront that worked the same way on the web and as an Android app, without keeping two separate codebases in sync.",
    whatWasBuilt:
      "A shared commerce stack for the website and com.cometake.app Android app, so product listings, orders, and inventory stay in sync everywhere customers shop.",
    standoutDetail:
      "Customers can start browsing on the website and finish checkout in the app without losing their cart.",
    techStack: ["Flutter", "Android", "Next.js", "Supabase"],
    imageSrc: "/case-studies/cometake.png",
    imageAlt:
      "Cometake storefront homepage with a New Arrivals hero banner, category sidebar, flash sales products, and quick-access promo tiles",
    imageWidth: 1310,
    imageHeight: 860,
    url: "https://cometake.net",
  },
  {
    id: "ijsr",
    title: "IJSR Journal",
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
    imageHeight: 900,
    url: "https://www.ijsrjournal.com/",
    relatedLink: {
      label: "Explore Noble City Publishers (NCP)",
      url: "https://www.ijsrjournal.com/ncp",
    },
  },
  {
    id: "savanna-spot",
    title: "Savanna Spot",
    problem:
      "Finding a short stay can mean calling several venues just to compare photos, amenities, and availability.",
    whatWasBuilt:
      "A venue discovery site with searchable listings, amenity filters, and booking enquiries. The current public listings are short stays in Lagos.",
    standoutDetail:
      "Guests can compare listing details and submit an enquiry without paying on the site.",
    techStack: ["Next.js", "Supabase", "PostgreSQL"],
    imageSrc: "/case-studies/savanna-spot.webp",
    imageAlt:
      "Savanna Spot homepage with the Lagos bridge at night, city choices, weather estimate, and venue search",
    imageWidth: 1310,
    imageHeight: 679,
    url: "https://www.savannaspot.com/",
    featured: true,
  },
  {
    id: "marketplace",
    title: "Perfekt Mart",
    problem:
      "A multi-vendor marketplace needed each vendor to manage their own storefront while still sharing one checkout, payments, and wallet system.",
    whatWasBuilt:
      "A marketplace with per-vendor dashboards and role-based access, unified checkout via Paystack, an in-app wallet, and VTU airtime and data top-up built in.",
    standoutDetail:
      "Vendors get their own dashboard and permissions, but customers check out once, even when a cart spans multiple vendors.",
    techStack: ["Next.js", "Paystack", "Supabase"],
    imageSrc: "/case-studies/perfekt-mart.webp",
    imageAlt:
      "Perfekt Mart storefront with product search, a seller recruitment banner, and shortcuts for airtime, bills, product comparison, and wallet",
    imageWidth: 1310,
    imageHeight: 679,
    url: "https://perfektmart.com.ng",
  },
  {
    id: "perfektscore",
    title: "PerfektScore",
    tagline: "Archived project. Live demo offline.",
    problem:
      "Football fans juggle several different apps and sites just to keep track of fixtures, live scores, and highlights across the leagues they follow.",
    whatWasBuilt:
      "A football tracking platform that brought fixtures, results, team pages, and highlight clips together.",
    standoutDetail:
      "Integrated football data and video feeds for match updates and highlights.",
    techStack: ["Next.js", "TheSportsDB API", "Scorebat"],
    imageSrc: "/case-studies/perfektscore.png",
    imageAlt:
      "PerfektScore dashboard showing today's fixtures, live match count, and league sidebar",
    imageWidth: 1310,
    imageHeight: 900,
    featured: true,
  },
  {
    id: "yunivax",
    title: "Yunivax",
    problem:
      "A football, entertainment, and news brand needed one site that could switch between fast-moving stories and match updates without feeling stitched together.",
    whatWasBuilt:
      "A content site with sports highlights, live-score links, and editorial sections for football, entertainment, and news.",
    standoutDetail:
      "The homepage balances scoreboard-heavy sports content with editorial posts without breaking the layout.",
    techStack: ["HTML", "CSS", "JavaScript", "Netlify"],
    imageSrc: "/case-studies/yunivax.png",
    imageAlt:
      "Yunivax homepage with a top navigation bar, highlights and livescore tabs, and a grid of football highlight cards",
    imageWidth: 1310,
    imageHeight: 900,
    url: "https://yunivax.netlify.app",
  },
  {
    id: "kaiserlowe-ugo",
    title: "Kaiserlowe UGO",
    problem:
      "A construction company needed a site that felt credible and could explain services, training, and portfolio work at a glance.",
    whatWasBuilt:
      "A responsive corporate site with a bold hero, services, training pages, portfolio, and contact flow.",
    standoutDetail:
      "The hero and navigation keep the site looking like a serious contractor brand instead of a generic template.",
    techStack: ["HTML", "CSS", "JavaScript", "Netlify"],
    imageSrc: "/case-studies/kaiserlowe-ugo.png",
    imageAlt:
      "Kaiserlowe UGO homepage with a construction hero image, blue navigation bar, and a bold welcome headline",
    imageWidth: 1310,
    imageHeight: 900,
    url: "https://kaiserlowe.netlify.app",
  },
  {
    id: "yunikstarz",
    title: "Yunikstarz",
    problem:
      "A sports agency needed a dramatic landing page to present talent and opportunities with a stronger visual identity.",
    whatWasBuilt:
      "A promotional site for a sports agency with a hero-led layout, brand visuals, and lightweight navigation.",
    standoutDetail:
      "The fiery hero treatment gives the brand a distinct sports identity instead of a plain agency page.",
    techStack: ["HTML", "CSS", "JavaScript", "Netlify"],
    imageSrc: "/case-studies/yunikstarz.png",
    imageAlt:
      "Yunikstarz sports agency homepage with a dark hero, flaming football artwork, and the company introduction on the right",
    imageWidth: 1310,
    imageHeight: 900,
    url: "https://yunikstarz.netlify.app",
  },
  {
    id: "savanna-spot-hub",
    title: "Savanna Spot Hub",
    problem:
      "The community product needed a separate home for discovery and social interaction, distinct from the venue listings site.",
    whatWasBuilt:
      "A Next.js and Supabase community platform with a feed, discovery, friend requests, and notifications.",
    standoutDetail:
      "Scoped relationship updates to each account and paused fallback polling in inactive tabs.",
    techStack: ["Next.js", "Supabase", "Social UI"],
    imageSrc: "/case-studies/savanna-spot-hub.webp",
    imageAlt:
      "Savanna Spot Hub public Articles page with navigation, an illustrated editorial card, and guest sign-in links",
    imageWidth: 1310,
    imageHeight: 679,
    url: "https://hub.savannaspot.com/",
  },
  {
    id: "weather-forecast-app",
    title: "Weather Forecast App",
    problem:
      "A simple forecast tool needed a cleaner way to look up weather by city without extra clutter.",
    whatWasBuilt:
      "A weather lookup app with a full-screen hero, city search, and forecast results.",
    standoutDetail:
      "The cloud-scape background gives the utility app more presence than a stock widget layout.",
    techStack: ["HTML", "CSS", "JavaScript"],
    imageSrc: "/case-studies/weather-forecast-app.png",
    imageAlt:
      "Weather forecast landing page with a dramatic cloud background, city search input, and a Get Weather button",
    imageWidth: 1310,
    imageHeight: 900,
    url: "https://weather-forecasted-now.netlify.app",
  },
  {
    id: "advanced-calculator",
    title: "Advanced Calculator",
    problem:
      "The calculator needed scientific functions without burying them under a generic keypad layout.",
    whatWasBuilt:
      "A scientific calculator with memory controls, trig functions, powers, roots, and a readable display.",
    standoutDetail:
      "The oversized display and grid of operators keep the interface usable even with many functions.",
    techStack: ["HTML", "CSS", "JavaScript"],
    imageSrc: "/case-studies/advanced-calculator.png",
    imageAlt:
      "Advanced calculator app with a large display, scientific function keys, and a bright yellow background",
    imageWidth: 1310,
    imageHeight: 900,
    url: "https://advanced-calcalator.netlify.app",
  },
  {
    id: "event-update",
    title: "Event Update",
    problem:
      "Event planning needed a structured form that could handle titles, dates, locations, and media uploads in one pass.",
    whatWasBuilt:
      "An event update and publishing interface with a preview card, form fields, and media upload support.",
    standoutDetail:
      "The form keeps the live preview visible so editors can check the event details before saving.",
    techStack: ["HTML", "CSS", "JavaScript"],
    imageSrc: "/case-studies/event-update.png",
    imageAlt:
      "Event update editor with a preview card, event form fields, and Save and Reset buttons beneath the inputs",
    imageWidth: 1310,
    imageHeight: 900,
    url: "https://gl-event.netlify.app",
  },
  {
    id: "inventory-lite",
    title: "Inventory Management (Lite)",
    problem:
      "Small shops needed a lightweight way to track stock without a heavy back-office system.",
    whatWasBuilt:
      "A lean inventory tool for stock counts, item records, and basic management workflows.",
    standoutDetail:
      "It stays intentionally small so it can be used as a quick internal utility rather than a full ERP.",
    techStack: ["HTML", "CSS", "JavaScript"],
    imageSrc: "/case-studies/inventory-lite.png",
    imageAlt:
      "Inventory management dashboard with add and remove item forms, an inventory table, and a history log",
    imageWidth: 1310,
    imageHeight: 900,
    url: "https://inventory-lite.netlify.app",
  },
];
