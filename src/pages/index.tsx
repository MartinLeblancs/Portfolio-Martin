import Head from "next/head";
import { useTranslations } from "next-intl";

import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import FloatingControls from "@/components/Controls";

const HomePage = ({
  translations,
  locale,
}: {
  translations: any;
  locale: "fr" | "en";
}) => {
  const t = useTranslations();

  return (
    <>
      <Head>
        <title>Martin LEBLANCS</title>
        <meta name="description" content={t("hero.subtitle")} />
      </Head>

      <div className="min-h-screen">
        <Hero translations={translations.hero} />
        <Skills />
        <Timeline translations={translations.timeline} />
        <Projects translations={translations.projects}/>
        <Education translations={translations.education}/>
        <Contact translations={translations.contact}/>

        <FloatingControls currentLocale={locale} />

        <footer className="py-8 border-t border-border/50">
          <div className="container mx-auto px-6 text-center">
            <p className="text-muted-foreground text-sm">{t("footer.text")}</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export async function getStaticProps({ locale }: { locale?: string }) {
  return {
    props: {
      translations: (await import(`../translations/${locale}.json`)).default,
      locale: locale === "en" ? "en" : "fr",
    },
  };
}

export default HomePage;
