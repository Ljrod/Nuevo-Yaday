export interface Service {
    id: string;
    name: string;
    description: string;
    price?: string;
    duration?: string;
    features: string[];
    mainImageUrl: string;
    sampleImageUrls: string[];
}

export const services: Service[] = [
    {
        id: "manicura-gel",
        name: "Manicura Gel",
        description: "Uñas perfectas con acabado de larga duración. Gel de alta calidad que mantiene tus uñas impecables por semanas.",
        price: "Desde $25",
        duration: "45 min",
        features: ["Larga duración", "Acabado profesional", "Sin descamación"],
        mainImageUrl: "/images/services/manicura-gel-main.jpg",
        sampleImageUrls: [
            "/images/services/manicura-gel-1.jpg",
            "/images/services/manicura-gel-2.jpg",
            "/images/services/manicura-gel-3.jpg",
        ],
    },
    {
        id: "pedicura-spa",
        name: "Pedicura Spa",
        description: "Experiencia de relajación total con tratamiento completo para tus pies. Incluye exfoliación, hidratación y masaje.",
        price: "Desde $35",
        duration: "60 min",
        features: ["Masaje relajante", "Exfoliación profunda", "Hidratación intensa"],
        mainImageUrl: "/images/services/pedicura-spa-main.jpg",
        sampleImageUrls: [
            "/images/services/pedicura-spa-1.jpg",
            "/images/services/pedicura-spa-2.jpg",
            "/images/services/pedicura-spa-3.jpg",
        ],
    },
    {
        id: "unas-esculpidas",
        name: "Uñas Esculpidas",
        description: "Extensión de uñas con técnica de esculpido profesional. Resultados naturales y elegantes que realzan tu estilo.",
        price: "Desde $45",
        duration: "90 min",
        features: ["Extensión natural", "Diseño personalizado", "Resistencia extrema"],
        mainImageUrl: "/images/services/unas-esculpidas-main.jpg",
        sampleImageUrls: [
            "/images/services/unas-esculpidas-1.jpg",
            "/images/services/unas-esculpidas-2.jpg",
            "/images/services/unas-esculpidas-3.jpg",
        ],
    },
    {
        id: "nail-art",
        name: "Nail Art Premium",
        description: "Arte en tus uñas con diseños únicos y creativos. Desde elegantes hasta atrevidos, cada detalle es una obra maestra.",
        price: "Desde $30",
        duration: "60 min",
        features: ["Diseños exclusivos", "Técnicas avanzadas", "Materiales premium"],
        mainImageUrl: "/images/services/nail-art-main.jpg",
        sampleImageUrls: [
            "/images/services/nail-art-1.jpg",
            "/images/services/nail-art-2.jpg",
            "/images/services/nail-art-3.jpg",
        ],
    },
    {
        id: "diseno-personalizado",
        name: "Diseño Personalizado",
        description: "Tu imaginación hecha realidad. Trabajamos contigo para crear el diseño perfecto que refleje tu personalidad única.",
        price: "Consultar",
        duration: "Variable",
        features: ["100% personalizado", "Asesoría experta", "Resultados únicos"],
        mainImageUrl: "/images/services/diseno-personalizado-main.jpg",
        sampleImageUrls: [
            "/images/services/diseno-personalizado-1.jpg",
            "/images/services/diseno-personalizado-2.jpg",
            "/images/services/diseno-personalizado-3.jpg",
        ],
    },
];

export const availableTimes = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
];
