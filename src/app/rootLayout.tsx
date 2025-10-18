import './globals.css';
import { ReactNode } from 'react';
import Navbar from './components/Navbar';
import GlobalStars from './components/GlobalStars';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                <title>Portfolio Martin</title>
            </head>
            <body className="relative bg-black text-white">
                {/* Canvas fixe pour étoiles sur tout le site */}
                <GlobalStars />

                {/* Navbar au-dessus */}
                <div className="relative z-20">
                    <Navbar />
                </div>

                {/* Contenu principal au-dessus des étoiles */}
                <div className="relative z-10">
                    {children}
                </div>
            </body>
        </html>
    );
}
