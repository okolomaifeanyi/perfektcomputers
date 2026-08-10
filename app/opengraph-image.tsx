import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} - Websites & Apps That Get Your Business Found, and Paid`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const whiteWords = [
  "Websites",
  "&",
  "Apps",
  "That",
  "Get",
  "Your",
  "Business",
];
const goldWords = ["Found,", "and", "Paid"];

export default async function Image() {
  const [geistSemiBold, geistMono, logoData] = await Promise.all([
    readFile(
      join(
        process.cwd(),
        "node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.ttf"
      )
    ),
    readFile(
      join(
        process.cwd(),
        "node_modules/geist/dist/fonts/geist-mono/GeistMono-Medium.ttf"
      )
    ),
    readFile(join(process.cwd(), "public/logo.png"), "base64"),
  ]);
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e1524",
          padding: "72px 88px",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={52} height={52} alt="" />
          <span
            style={{
              marginLeft: 16,
              fontSize: 28,
              fontWeight: 600,
              color: "#f2f4f7",
            }}
          >
            {siteConfig.name}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 66,
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          {whiteWords.map((word) => (
            <span key={word} style={{ color: "#f2f4f7", marginRight: 20 }}>
              {word}
            </span>
          ))}
          {goldWords.map((word) => (
            <span key={word} style={{ color: "#d4af37", marginRight: 20 }}>
              {word}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 64, height: 3, background: "#8a6a1d" }} />
          <span
            style={{
              marginTop: 20,
              fontFamily: "Geist Mono",
              fontSize: 24,
              color: "#8a6a1d",
            }}
          >
            perfektcomputers.com.ng
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geistSemiBold, style: "normal", weight: 600 },
        {
          name: "Geist Mono",
          data: geistMono,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}
