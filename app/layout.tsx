import type { Metadata } from "next";
import { Lexend, M_PLUS_1, Outfit } from "next/font/google";
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
  preload: false,
});

const mplus = M_PLUS_1({
  variable: "--font-mplus",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  description: `${site.role}. ${site.school} ${site.grad}.`,
  icons: {
    icon: `${process.env.BASE_PATH}/images/favicon.png`,
    apple: `${process.env.BASE_PATH}/images/favicon.png`,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${lexend.variable} ${mplus.variable} h-full antialiased`}
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
