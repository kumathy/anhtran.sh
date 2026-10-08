import type { Metadata } from "next";
import { Gothic_A1, Lexend, M_PLUS_1, Outfit } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["vietnamese"],
  display: "block",
  preload: false,
});

const mplus = M_PLUS_1({
  variable: "--font-mplus",
  display: "block",
  preload: false,
});

const gothic = Gothic_A1({
  variable: "--font-gothic",
  weight: ["400", "500"],
  display: "block",
  preload: false,
});

const description = `${site.role}. ${site.school} ${site.grad}.`;
const previewImage = {
  url: `${site.url}/images/favicon.png`,
  width: 512,
  height: 512,
  alt: site.name,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  description,
  icons: {
    icon: `${process.env.BASE_PATH}/images/favicon.png`,
    apple: `${process.env.BASE_PATH}/images/favicon.png`,
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.name,
    description,
    images: [previewImage],
  },
  twitter: {
    card: "summary",
    title: site.name,
    description,
    images: [previewImage],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${lexend.variable} ${mplus.variable} ${gothic.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <div className="flex flex-1 flex-col animate-page-in motion-reduce:animate-none">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
