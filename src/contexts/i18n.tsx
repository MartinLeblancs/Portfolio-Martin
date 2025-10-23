"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Locale = "fr" | "en";

interface I18nContextType {
    locale: Locale;
    messages: Record<string, any>;
    setLocale: (loc: Locale) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
    const [locale, setLocale] = useState<Locale>("fr");
    const [messages, setMessages] = useState<Record<string, any>>({});

    useEffect(() => {
        import(`../translations/${locale}.json`).then((mod) => setMessages(mod.default));
    }, [locale]);

    return (
        <I18nContext.Provider value={{ locale, messages, setLocale }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useI18n = () => {
    const context = useContext(I18nContext);
    if (!context) throw new Error("useI18n must be used within I18nProvider");
    return context;
};
