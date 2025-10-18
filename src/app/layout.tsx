import '../styles/globals.css';
import { ReactNode } from 'react';
import Navbar from './components/Navbar';
import GlobalStarsCanvas from './components/GlobalStars';
import CustomCursor from './components/CustomCursor';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                <title>Portfolio Martin</title>
            </head>
            <body className="relative bg-black text-white">
                <CustomCursor />
                {/* Canvas étoiles global */}
                <div className="fixed inset-0 -z-10 pointer-events-none">
                    <GlobalStarsCanvas />
                </div>

                {/* Navbar */}
                <div className="relative z-20">
                    <Navbar />
                </div>

                {/* Contenu principal */}
                <div className="relative z-10">{children}</div>
            </body>
        </html>
    );
}
