"use client";

import { useState } from "react";
import type { AppProps } from "next/app";
import { IntlProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import "../styles/index.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <IntlProvider
      locale={pageProps.locale}
      messages={pageProps.translations}
    >
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Analytics />
        <SpeedInsights />
        <Component {...pageProps} />
      </ThemeProvider>
    </IntlProvider>
  );
}
