import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "YaDay Nail Designer - Salón de Uñas Premium en Almodóvar del Río",
    description:
        "Salón de uñas profesional en Almodóvar del Río, Córdoba. Manicura gel, pedicura spa, uñas esculpidas y nail art premium. Diseños exclusivos y atención personalizada. ¡Agenda tu cita!",
    keywords: [
        "salón de uñas Almodóvar del Río",
        "manicura Córdoba",
        "pedicura spa",
        "nail art",
        "uñas esculpidas",
        "uñas acrilicas",
        "manicura gel",
        "diseño de uñas",
        "salón de belleza Almodóvar",
        "uñas profesionales Córdoba",
        "YaDay Nail Designer",
    ],
    authors: [{ name: "YaDay Nail Designer" }],
    creator: "YaDay Nail Designer",
    publisher: "YaDay Nail Designer",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL("https://yaday.com"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "YaDay Nail Designer - Salón de Uñas Premium",
        description:
            "Diseños exclusivos de uñas en Almodóvar del Río. Manicura gel, pedicura spa y nail art profesional. Atención personalizada y productos de alta calidad.",
        url: "https://yaday.com",
        siteName: "YaDay Nail Designer",
        locale: "es_ES",
        type: "website",
        images: [
            {
                url: "/images/about/owner.jpg",
                width: 1200,
                height: 630,
                alt: "YaDay Nail Designer - Salón de Uñas Premium",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "YaDay Nail Designer - Salón de Uñas Premium",
        description:
            "Diseños exclusivos de uñas en Almodóvar del Río. Agenda tu cita y descubre el arte en tus manos.",
        images: ["/images/about/owner.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        // google: "tu-codigo-de-verificacion-aqui",
        // yandex: "tu-codigo-yandex",
        // other: "tu-codigo",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className="scroll-smooth">
            <head>
                {/* Geolocalización para SEO local */}
                <meta name="geo.region" content="ES-CO" />
                <meta name="geo.placename" content="Almodóvar del Río" />
                <meta name="geo.position" content="37.7226;-5.0275" />
                <meta name="ICBM" content="37.7226, -5.0275" />

                {/* Schema.org structured data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BeautySalon",
                            name: "YaDay Nail Designer",
                            image: "/images/about/owner.jpg",
                            "@id": "https://yaday.com",
                            url: "https://yaday.com",
                            telephone: "+34722224379",
                            priceRange: "$$",
                            address: {
                                "@type": "PostalAddress",
                                streetAddress: "Almodóvar del Río",
                                addressLocality: "Almodóvar del Río",
                                addressRegion: "Córdoba",
                                postalCode: "14720",
                                addressCountry: "ES",
                            },
                            geo: {
                                "@type": "GeoCoordinates",
                                latitude: 37.7226,
                                longitude: -5.0275,
                            },
                            openingHoursSpecification: [
                                {
                                    "@type": "OpeningHoursSpecification",
                                    dayOfWeek: [
                                        "Monday",
                                        "Tuesday",
                                        "Wednesday",
                                        "Thursday",
                                        "Friday",
                                        "Saturday",
                                    ],
                                    opens: "09:00",
                                    closes: "23:00",
                                },
                            ],
                            sameAs: [
                                "https://instagram.com/yaday",
                                "https://facebook.com/yaday",
                            ],
                        }),
                    }}
                />
            </head>
            <body className="antialiased">{children}</body>
        </html>
    );
}
