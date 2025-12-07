export interface Service {
    id: string;
    name: string;
    mainImageUrl: string;
    sampleImageUrls: string[];
}

export const services: Service[] = [
    {
        id: "manicura-gel",
        name: "Manicura Gel",
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
