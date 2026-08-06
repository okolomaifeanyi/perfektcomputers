const whatsappNumber = "2349030658008";

export const siteConfig = {
  name: "Perfect Computers",
  whatsappNumber,
  whatsappLink: `https://wa.me/${whatsappNumber}`,
  email: "ifeanyiokoloma@gmail.com",
} as const;

export type SiteConfig = typeof siteConfig;
