import type { Metadata } from "next";
import localFont from "next/font/local";
const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});
const space = localFont({
  src: "../../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  variable: "--font-space",
  display: "swap",
  weight: "300 700",
});
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://rilcell.com"),
  title: "Ril Cell | Assistência Técnica de Celulares em Fortaleza",
  description:
    "Assistência técnica de celulares em Fortaleza. Troca de tela, bateria, reparos em placa e manutenção de iPhone e Android. Consulte a Ril Cell.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ril Cell | Precisão em cada reparo",
    description: "Assistência técnica especializada em Fortaleza.",
    locale: "pt_BR",
    type: "website",
    images: ["/images/campaign/hero-desktop-1536.webp"],
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${space.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(!sessionStorage.getItem("ril-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("intro-pending");document.documentElement.dataset.introStarted=String(performance.now());setTimeout(()=>document.documentElement.classList.remove("intro-pending"),1800)}}catch{}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
