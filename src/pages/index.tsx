"use client";

import { useState, useEffect } from "react";
import Head from "next/head";

import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import FloatingControls from "@/components/Controls";

import { useLocale } from "@/hooks/use-locale";
import { NextIntlClientProvider } from "next-intl";
import ToriiEntrance from "@/components/ToriiEntrance";

export default function HomePage() {
  const locale = useLocale();
  const [translations, setTranslations] = useState<any>(null);
  const [showEntrance, setShowEntrance] = useState(true);

  useEffect(() => {
    if (!locale) return;
    import(`../translations/${locale}.json`).then((mod) => setTranslations(mod.default));
  }, [locale]);

  if (!translations) return null; // tu peux mettre un loader ici

  return (
    <NextIntlClientProvider locale={locale} messages={translations}>
      {showEntrance && translations.entrance && (
        <ToriiEntrance
          translations={translations.entrance}
          onComplete={() => setShowEntrance(false)}
        />
      )}
      <Head>
        <title>Martin LEBLANCS</title>
        <meta name="description" content={translations.hero.subtitle} />
      </Head>

      <div className="min-h-screen">
        <Hero translations={translations.hero} />
        <Skills />
        <Timeline translations={translations.timeline} />
        <Projects translations={translations.projects} />
        <Education translations={translations.education} />
        <Contact translations={translations.contact} />

        <FloatingControls currentLocale={locale} />

        <footer className="py-8 border-t border-border/50">
          <div className="container mx-auto px-6 text-center">
            <p className="text-muted-foreground text-sm">{translations.footer.text}</p>
          </div>
        </footer>
      </div>
    </NextIntlClientProvider>
  );
}
