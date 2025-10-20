"use client";

import { useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "emailjs-com";

interface ContactTranslations {
  title: string;
  subtitle: string;
  contactInfo: { email: string; phone: string; location: string };
  social: { linkedin: string; github: string };
  form: {
    title: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    submit: string;
    success: string;
    error: string;
  };
  findMeOn: string;
}

interface ContactProps {
  translations: ContactTranslations;
}

const Contact = ({ translations }: ContactProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const contactInfo = [
    {
      icon: Mail,
      label: translations.contactInfo.email,
      value: "martin.leblancs@epitech.eu",
      href: "mailto:martin.leblancs@epitech.eu",
    },
    {
      icon: Phone,
      label: translations.contactInfo.phone,
      value: "07 75 11 52 42",
      href: "tel:+33775115242",
    },
    {
      icon: MapPin,
      label: translations.contactInfo.location,
      value: "Boulogne Billancourt, France",
      href: null,
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: translations.social.linkedin,
      href: "https://www.linkedin.com/in/martin-leblancs-7a2154209/",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Github,
      label: translations.social.github,
      href: "https://github.com/MartinLeblancs",
      gradient: "from-secondary to-secondary-glow",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".scroll-reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    emailjs
      .sendForm(
        "portfolio-martin",
        "template_kjbe36j",
        formRef.current,
        "DnZANrwntYpYDLwYM"
      )
      .then(
        () => alert(translations.form.success),
        (err) => alert(translations.form.error + err.text)
      );

    formRef.current.reset();
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pattern-circles opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-56 h-56 rounded-full border border-primary/20 animate-rotate-slow zen-circle" />
      <div
        className="absolute bottom-20 left-10 w-72 h-72 rounded-full border border-secondary/10 animate-rotate-slow"
        style={{ animationDirection: "reverse" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl font-bold mb-4 font-noto-jp">
            <span className="text-gradient">{translations.title}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{translations.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8 scroll-reveal">
            <div className="glass-card p-8 rounded-2xl hover-glow transition-all duration-500">
              <h3 className="text-2xl font-bold mb-6 text-gradient font-noto-jp">{translations.form.title}</h3>

              <div className="space-y-6">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-start gap-4 group transition-all duration-300 hover:translate-x-2">
                      <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                        <p className="font-medium group-hover:text-primary transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );

                  return item.href ? (
                    <a key={item.label} href={item.href} className="block">
                      {content}
                    </a>
                  ) : (
                    <div key={item.label}>{content}</div>
                  );
                })}
              </div>

              {/* Social links */}
              <div className="mt-8 pt-8 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-4">{translations.findMeOn}</p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <div className="glass-card p-4 rounded-xl hover-glow group text-center transition-all duration-300 hover:scale-105">
                          <div
                            className={`inline-flex p-3 bg-gradient-to-br ${social.gradient} rounded-lg mb-2 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                          >
                            <Icon className="h-6 w-6 text-foreground" />
                          </div>
                          <p className="text-sm font-medium">{social.label}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="scroll-reveal">
            <div className="glass-card p-8 rounded-2xl hover-glow transition-all duration-500">
              <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="text-sm font-medium mb-2 block group-focus-within:text-primary transition-colors">
                      {translations.form.name}
                    </label>
                    <Input
                      name="name"
                      placeholder={translations.form.namePlaceholder}
                      className="bg-background/50 border-border/50 focus:border-primary transition-all duration-300 hover:border-primary/50"
                      required
                    />
                  </div>
                  <div className="group">
                    <label className="text-sm font-medium mb-2 block group-focus-within:text-primary transition-colors">
                      {translations.form.email}
                    </label>
                    <Input
                      type="email"
                      name="email"
                      placeholder={translations.form.emailPlaceholder}
                      className="bg-background/50 border-border/50 focus:border-primary transition-all duration-300 hover:border-primary/50"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="text-sm font-medium mb-2 block group-focus-within:text-primary transition-colors">
                    {translations.form.subject}
                  </label>
                  <Input
                    name="subject"
                    placeholder={translations.form.subjectPlaceholder}
                    className="bg-background/50 border-border/50 focus:border-primary transition-all duration-300 hover:border-primary/50"
                    required
                  />
                </div>

                <div className="group">
                  <label className="text-sm font-medium mb-2 block group-focus-within:text-primary transition-colors">
                    {translations.form.message}
                  </label>
                  <Textarea
                    name="message"
                    placeholder={translations.form.messagePlaceholder}
                    rows={6}
                    className="bg-background/50 border-border/50 focus:border-primary transition-all duration-300 resize-none hover:border-primary/50"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-primary-dark hover:shadow-glow transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10">{translations.form.submit}</span>
                  <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
