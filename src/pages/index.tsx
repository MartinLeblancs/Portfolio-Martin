"use client";

import { useState, useEffect } from "react";
import Head from "next/head";

import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Controls from "@/components/Controls";
import { useI18n } from "@/contexts/i18n";

export default function HomePage() {
  const { messages } = useI18n();
  if (!messages.footer) return null;
  const t = messages.footer;
  return (
    <>
      <Head>
        <title>Martin LEBLANCS</title>
      </Head>

      <div className="min-h-screen">
        <Hero />
        <Skills />
        <Timeline />
        <Projects />
        <Education />
        <Contact />

        <Controls />

        <footer className="py-8 border-t border-border/50">
          <div className="container mx-auto px-6 text-center">
            <p className="text-muted-foreground text-sm">{t.text}</p>
          </div>
        </footer>
      </div>
    </>
  );
}
