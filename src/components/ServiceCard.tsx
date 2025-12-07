"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Service } from "@/lib/services";
import { Clock, DollarSign, Sparkles } from "lucide-react";

interface ServiceCardProps {
    service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="relative w-full h-[480px] cursor-pointer group"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="relative w-full h-full"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                style={{
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Front of Card */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-xl"
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                    }}
                >
                    <motion.div
                        className="relative w-full h-full bg-white"
                        whileHover={{ y: -8 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Gradient Background Area */}
                        <div className="relative w-full h-[55%] bg-gradient-to-br from-primary/10 via-accent/20 to-primary/5 overflow-hidden">
                            {/* Decorative Circles */}
                            <div className="absolute top-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
                            <div className="absolute bottom-5 left-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl" />

                            {/* Icon/Initial */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                    <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg transform rotate-6 group-hover:rotate-12 transition-transform duration-300">
                                        <Sparkles className="w-12 h-12 text-white" strokeWidth={1.5} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="relative h-[45%] bg-white p-6 flex flex-col">
                            {/* Title */}
                            <h3 className="font-playfair text-2xl font-bold text-primary mb-3 leading-tight">
                                {service.name}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                                {service.description}
                            </p>

                            {/* Info Badges */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {service.price && (
                                    <div className="flex items-center gap-1.5 bg-primary/5 px-3 py-1.5 rounded-full">
                                        <DollarSign className="w-4 h-4 text-primary" />
                                        <span className="text-xs font-medium text-primary">
                                            {service.price}
                                        </span>
                                    </div>
                                )}
                                {service.duration && (
                                    <div className="flex items-center gap-1.5 bg-accent/10 px-3 py-1.5 rounded-full">
                                        <Clock className="w-4 h-4 text-accent" />
                                        <span className="text-xs font-medium text-gray-700">
                                            {service.duration}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Call to Action */}
                            <p className="text-xs text-gray-400 italic text-center">
                                Toca para ver ejemplos
                            </p>
                        </div>

                        {/* Glassmorphism Overlay on Hover */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                        />
                    </motion.div>
                </div>

                {/* Back of Card */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-xl"
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    <div className="w-full h-full bg-gradient-to-br from-white to-primary/5 p-6 flex flex-col">
                        {/* Header */}
                        <div className="mb-4">
                            <h3 className="font-playfair text-xl font-bold text-primary mb-2">
                                {service.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                                Galería de ejemplos
                            </p>
                        </div>

                        {/* Gallery Grid */}
                        <div className="grid grid-cols-2 gap-3 flex-grow mb-4">
                            {service.sampleImageUrls.slice(0, 4).map((url, index) => (
                                <motion.div
                                    key={index}
                                    className="relative bg-gradient-to-br from-primary/10 via-accent/15 to-primary/5 rounded-xl overflow-hidden group/img"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {/* Placeholder for sample images */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center p-3">
                                            <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center shadow-md">
                                                <span className="text-white text-lg font-bold">
                                                    {index + 1}
                                                </span>
                                            </div>
                                            <p className="text-[10px] text-gray-500 line-clamp-1 px-2">
                                                Ejemplo {index + 1}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200" />
                                </motion.div>
                            ))}
                        </div>

                        {/* Features */}
                        <div className="space-y-2">
                            <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                                Características
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {service.features.slice(0, 3).map((feature, index) => (
                                    <span
                                        key={index}
                                        className="text-xs bg-white px-3 py-1 rounded-full text-gray-700 shadow-sm border border-primary/10"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Back Indicator */}
                        <p className="text-xs text-gray-400 italic text-center mt-4">
                            Toca para volver
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Flip Indicator */}
            <div className="absolute top-4 right-4 z-10 pointer-events-none">
                <motion.div
                    className="bg-white/95 backdrop-blur-sm rounded-full p-2.5 shadow-lg border border-primary/10"
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
