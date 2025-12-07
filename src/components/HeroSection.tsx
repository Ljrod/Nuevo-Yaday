"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
    const scrollToBooking = () => {
        const element = document.getElementById("citas");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{
                background: `linear-gradient(135deg, #ffecf1 0%, #fff5f8 50%, #ffe4ec 100%)`,
            }}
        >
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-5 md:left-10 w-24 h-24 md:w-32 md:h-32 rounded-full bg-accent/10"
                    animate={{
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-5 md:right-10 w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary/10"
                    animate={{
                        y: [0, -30, 0],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-lg"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <Sparkles className="w-4 h-4 text-accent" />
                            <span className="text-sm font-medium text-primary">
                                Estudio de Diseño Premium
                            </span>
                        </motion.div>

                        <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-primary mb-6 leading-tight">
                            Arte en tus Manos
                        </h1>

                        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Experimenta el lujo y la elegancia en cada detalle. Diseños
                            exclusivos que reflejan tu personalidad y estilo único.
                        </p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <Button
                                variant="accent"
                                size="lg"
                                onClick={scrollToBooking}
                                className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow"
                            >
                                Agendar una Cita
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => {
                                    const element = document.getElementById("servicios");
                                    if (element) element.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="text-lg px-8 py-6 bg-white/80 backdrop-blur-sm"
                            >
                                Ver Servicios
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                        animate={{
                            y: [0, 10, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2">
                            <motion.div
                                className="w-1.5 h-1.5 bg-primary rounded-full"
                                animate={{
                                    y: [0, 16, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
