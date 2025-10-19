import { useState } from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/index.css";

import ToriiEntrance from "../components/ToriiEntrance";

export default function MyApp({ Component, pageProps }: AppProps) {
    const [showEntrance, setShowEntrance] = useState(true);

    return (
        <>
            {showEntrance && <ToriiEntrance onComplete={() => setShowEntrance(false)} />}
            <Component {...pageProps} />
        </>
    );
}
