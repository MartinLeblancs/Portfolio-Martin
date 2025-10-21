import { useEffect, useState } from "react";

export function useLocale() {
    const [locale, setLocale] = useState<"fr" | "en">("fr");

    useEffect(() => {
        // Détecte la langue via l'URL
        const path = window.location.pathname;
        if (path.startsWith("/en")) setLocale("en");
        else if (path.startsWith("/fr")) setLocale("fr");
        else {
            // langue par défaut du navigateur si / simple
            const navLang = navigator.language.startsWith("en") ? "en" : "fr";
            setLocale(navLang);
        }
    }, []);

    return locale;
}
