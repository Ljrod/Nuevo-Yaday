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
        id: "manicura",
        name: "Manicura",
        description: "Cuidado completo de manos y uñas. Limado, corte de cutícula, masaje hidratante y acabado perfecto.",
        price: "Consultar",
        duration: "45 min",
        features: ["Limado profesional", "Cuidado de cutículas", "Masaje hidratante"],
        mainImageUrl: "/images/services/manicura-main.jpg",
        sampleImageUrls: [
            "/images/services/manicura-1.jpg",
            "/images/services/manicura-2.jpg",
            "/images/services/manicura-3.jpg",
        ],
    },
    {
        id: "pedicura",
        name: "Pedicura",
        description: "Tratamiento completo para tus pies. Cuidado de uñas, exfoliación y masaje relajante.",
        price: "Consultar",
        duration: "60 min",
        features: ["Exfoliación profunda", "Cuidado de uñas", "Masaje relajante"],
        mainImageUrl: "/images/services/pedicura-main.jpg",
        sampleImageUrls: [
            "/images/services/pedicura-1.jpg",
            "/images/services/pedicura-2.jpg",
            "/images/services/pedicura-3.jpg",
        ],
    },
    {
        id: "esmaltado-semipermanente",
        name: "Esmaltado Semipermanente",
        description: "Esmalte de larga duración que mantiene tus uñas perfectas por semanas sin descamación.",
        price: "Consultar",
        duration: "45 min",
        features: ["Hasta 3 semanas de duración", "Acabado brillante", "Sin descamación"],
        mainImageUrl: "/images/services/semipermanente-main.jpg",
        sampleImageUrls: [
            "/images/services/semipermanente-1.jpg",
            "/images/services/semipermanente-2.jpg",
            "/images/services/semipermanente-3.jpg",
        ],
    },
    {
        id: "sistema-soft-gel",
        name: "Sistema Soft Gel",
        description: "Extensión de uñas con técnica de gel suave. Resultados naturales y resistentes.",
        price: "Consultar",
        duration: "90 min",
        features: ["Aspecto natural", "Flexible y resistente", "Larga duración"],
        mainImageUrl: "/images/services/soft-gel-main.jpg",
        sampleImageUrls: [
            "/images/services/soft-gel-1.jpg",
            "/images/services/soft-gel-2.jpg",
            "/images/services/soft-gel-3.jpg",
        ],
    },
    {
        id: "nivelacion",
        name: "Nivelación",
        description: "Corrección y nivelación de uñas para un acabado uniforme y perfecto.",
        price: "Consultar",
        duration: "60 min",
        features: ["Superficie uniforme", "Corrección de imperfecciones", "Acabado profesional"],
        mainImageUrl: "/images/services/nivelacion-main.jpg",
        sampleImageUrls: [
            "/images/services/nivelacion-1.jpg",
            "/images/services/nivelacion-2.jpg",
            "/images/services/nivelacion-3.jpg",
        ],
    },
    {
        id: "retoques",
        name: "Retoques",
        description: "Mantenimiento y reparación de tus uñas para mantenerlas siempre perfectas.",
        price: "Consultar",
        duration: "30 min",
        features: ["Relleno de crecimiento", "Reparaciones menores", "Refresco de esmalte"],
        mainImageUrl: "/images/services/retoques-main.jpg",
        sampleImageUrls: [
            "/images/services/retoques-1.jpg",
            "/images/services/retoques-2.jpg",
            "/images/services/retoques-3.jpg",
        ],
    },
    {
        id: "retiro-material",
        name: "Retiro de Material",
        description: "Remoción segura y cuidadosa de esmalte semipermanente, gel o acrílico.",
        price: "Consultar",
        duration: "30 min",
        features: ["Proceso seguro", "Sin daño a la uña natural", "Cuidado post-retiro"],
        mainImageUrl: "/images/services/retiro-main.jpg",
        sampleImageUrls: [
            "/images/services/retiro-1.jpg",
            "/images/services/retiro-2.jpg",
            "/images/services/retiro-3.jpg",
        ],
    },
];

export const availableTimes = [
    "09:00",
    "10:30",
    "12:00",
    "13:30",
    "15:00",
    "16:30",
    "18:00",
    "19:30",
    "21:00",
    "22:30",
];
