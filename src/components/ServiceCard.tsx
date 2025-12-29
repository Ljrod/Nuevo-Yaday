"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Service } from "@/lib/services";
import { Clock, DollarSign } from "lucide-react";

interface ServiceCardProps {
    service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleMouseEnter = () => {
        setIsFlipped(true);
    };

    const handleMouseLeave = () => {
        setIsFlipped(false);
    };

    const handleTouchStart = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className="relative w-full h-[480px] cursor-pointer group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
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
                        {/* Image Area */}
                        <div className="relative w-full h-[70%] overflow-hidden">
                            {/* Main Service Image */}
                            <img
                                src={service.mainImageUrl}
                                alt={service.name}
                                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${service.id === 'pedicura' ? 'object-[center_35%]' : 'object-center'
                                    }`}
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        </div>

                        {/* Content Area */}
                        <div className="relative h-[30%] bg-white p-6 flex flex-col">
                            {/* Title */}
                            <h3 className="font-playfair text-2xl font-bold text-primary mb-3 leading-tight">
                                {service.name}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-gray-600 mb-4 flex-grow">
                                {service.description}
                            </p>


                            {/* Call to Action */}
                            <p className="text-xs text-gray-400 italic text-center">
                                Pasa el mouse para ver ejemplos
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
                        <div className="mb-6">
                            <h3 className="font-playfair text-2xl font-bold text-primary text-center">
                                {service.name}
                            </h3>
                        </div>

                        {/* Gallery Grid */}
                        <div className="grid grid-cols-2 gap-4 flex-grow">
                            {[service.mainImageUrl, ...service.sampleImageUrls.slice(0, 3)].map((url, index) => (
                                <motion.div
                                    key={index}
                                    className="relative aspect-square rounded-xl overflow-hidden group/img"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {/* Sample Image */}
                                    <img
                                        src={url}
                                        alt={`${service.name} ejemplo ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200" />
                                </motion.div>
                            ))}
                        </div>



                        {/* Back Indicator */}
                        <p className="text-xs text-gray-400 italic text-center mt-6">
                            Quita el mouse para volver
                        </p>
                    </div>
                </div>
            </motion.div>


        </div>
    );
}
