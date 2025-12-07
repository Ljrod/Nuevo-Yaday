import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "YaDay Nail Designer - Arte en tus Manos",
    description:
        "Estudio de diseño de uñas premium. Experimenta el lujo y la elegancia en cada detalle con diseños exclusivos que reflejan tu personalidad.",
    keywords: [
        "diseño de uñas",
        "manicura",
        "pedicura",
        "nail art",
        "uñas esculpidas",
        "salón de belleza",
        "YaDay",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className="scroll-smooth">
            <body className="antialiased">{children}</body>
        </html>
    );
}
