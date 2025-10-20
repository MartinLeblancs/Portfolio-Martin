"use client";

import { useState } from "react";
import type { AppProps } from "next/app";
import { IntlProvider } from 'next-intl';
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import "../styles/index.css";
import ToriiEntrance from "../components/ToriiEntrance";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function MyApp({ Component, pageProps }: AppProps) {
  const [showEntrance, setShowEntrance] = useState(true);

  return (
    <IntlProvider
      locale={pageProps.locale}
      messages={pageProps.translations}
    >
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Analytics />
        <SpeedInsights />
        {showEntrance && pageProps.translations?.entrance && (
          <ToriiEntrance
            onComplete={() => setShowEntrance(false)}
            translations={pageProps.translations.entrance}
          />
        )}
        <Component {...pageProps} />
      </ThemeProvider>
    </IntlProvider>
  );
}
