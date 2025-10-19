import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import AudioButton from "@/components/AudioPlayer";
import Education from "@/components/Education";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Skills />
      <Timeline />
      <Projects />
      <Education />
      <Contact />

      {/* Footer */}
      <AudioButton />
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Martin LEBLANCS. Conçu avec passion et innovation.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
