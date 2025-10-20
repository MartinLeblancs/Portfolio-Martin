"use client";

import { useState } from "react";
import type { AppProps } from "next/app";
import { IntlProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import "../styles/index.css";
import ToriiEntrance from "../components/ToriiEntrance";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [showEntrance, setShowEntrance] = useState(true);

  const locale = pageProps.locale === "en" ? "en" : "fr";

  return (
    <IntlProvider messages={pageProps.translations} locale={locale}>
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
    {showEntrance && (
      <ToriiEntrance
        onComplete={() => setShowEntrance(false)}
        translations={pageProps.translations.entrance}
      />
    )}
    <Component {...pageProps} locale={locale} />
  </ThemeProvider>
</IntlProvider>

  );
}
