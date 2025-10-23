"use client";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import "../styles/index.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { I18nProvider } from "@/contexts/i18n";

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <I18nProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Analytics />
        <SpeedInsights />
        <Component {...pageProps} />
      </ThemeProvider>
    </I18nProvider>
  );
}
