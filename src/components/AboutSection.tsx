"use client";

import { motion } from "framer-motion";
import { Heart, Award, Sparkles } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
    const features = [
        {
            icon: Heart,
            title: "Pasión por el Detalle",
            description:
                "Cada diseño es creado con dedicación y amor por el arte de las uñas.",
        },
        {
            icon: Award,
            title: "Atención Personalizada",
            description:
                "Nos dedicamos al cuidado de tus uñas con atención única para cada cliente.",
        },
        {
            icon: Sparkles,
            title: "Elegancia Premium",
            description:
                "Utilizamos solo productos de la más alta calidad para resultados excepcionales.",
        },
    ];

    return (
        <section id="nosotros" className="pt-4 pb-20 bg-gradient-to-br from-background to-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image Column */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                            {/* Owner Photo */}
                            <Image
                                src="/images/about/owner.jpg"
                                alt="Dueña de YaDay Nail Designer"
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                                priority
                            />
                        </div>

                        {/* Decorative Element */}
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-10" />
                    </motion.div>

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
                            Sobre Nosotros
                        </h2>

                        <div className="space-y-4 text-gray-700 mb-8">
                            <p className="text-base leading-relaxed">
                                En <span className="font-semibold text-primary">YaDay Nail Designer</span>,
                                nos dedicamos al cuidado de tus uñas con atención personalizada,
                                para que luzcas siempre manos hermosas y perfectamente cuidadas.
                            </p>

                            <p className="text-base leading-relaxed">
                                Cada servicio es una experiencia única diseñada especialmente para ti.
                                Trabajamos con productos de alta calidad y técnicas profesionales
                                para garantizar resultados excepcionales que reflejen tu estilo y personalidad.
                            </p>

                            <p className="text-base leading-relaxed">
                                Con pasión y dedicación por la belleza de tus uñas, nos enfocamos
                                en brindarte un servicio de calidad que transforme tus manos en
                                verdaderas obras de arte.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-start gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                                        <feature.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-primary mb-1">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
