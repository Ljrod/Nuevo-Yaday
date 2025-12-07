"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Service } from "@/lib/services";
import Image from "next/image";

interface ServiceCardProps {
    service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="relative w-full h-[400px] cursor-pointer perspective-1000"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="relative w-full h-full"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                style={{
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Front of Card */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden shadow-lg"
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                    }}
                >
                    <div className="relative w-full h-full bg-white">
                        <div className="relative w-full h-3/4 bg-gradient-to-br from-primary/5 to-accent/5">
                            {/* Placeholder for image */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center p-8">
                                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                        <span className="text-white text-3xl font-playfair">
                                            {service.name.charAt(0)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Imagen: {service.mainImageUrl}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-white p-6">
                            <h3 className="font-playfair text-2xl font-bold text-primary mb-2">
                                {service.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                                Toca para ver ejemplos
                            </p>
                        </div>
                    </div>
                </div>

                {/* Back of Card */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden shadow-lg"
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    <div className="w-full h-full bg-white p-6">
                        <h3 className="font-playfair text-xl font-bold text-primary mb-4">
                            Ejemplos de {service.name}
                        </h3>
                        <div className="grid grid-cols-1 gap-3 h-[calc(100%-3rem)]">
                            {service.sampleImageUrls.map((url, index) => (
                                <div
                                    key={index}
                                    className="relative bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg overflow-hidden flex items-center justify-center"
                                >
                                    {/* Placeholder for sample images */}
                                    <div className="text-center p-4">
                                        <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                                            <span className="text-primary text-xl font-bold">
                                                {index + 1}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500">{url}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Flip Indicator */}
            <div className="absolute top-4 right-4 z-10 pointer-events-none">
                <motion.div
                    className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md"
                    animate={{ rotate: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <svg
                        className="w-5 h-5 text-primary"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </motion.div>
            </div>
        </div>
    );
}
