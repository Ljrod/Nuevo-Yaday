"use client";

import { motion } from "framer-motion";
import BookingForm from "@/components/BookingForm";
import { Calendar } from "lucide-react";

export default function BookingSection() {
    return (
        <section id="citas" className="py-20 bg-gradient-to-br from-white to-background">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-4">
                        <Calendar className="w-8 h-8 text-primary" />
                    </div>

                    <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-4">
                        Agenda tu Experiencia
                    </h2>

                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Reserva tu cita y descubre el lujo de un servicio personalizado.
                        Estamos aquí para hacer realidad tus diseños soñados.
                    </p>
                </motion.div>

                <BookingForm />

                {/* Additional Info */}
                <motion.div
                    className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                        <h3 className="font-semibold text-primary mb-2">Horarios</h3>
                        <p className="text-sm text-gray-600">
                            Lunes a Sábado
                            <br />
                            9:00 AM - 7:00 PM
                        </p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                        <h3 className="font-semibold text-primary mb-2">Ubicación</h3>
                        <p className="text-sm text-gray-600">
                            Av. Principal #123
                            <br />
                            Ciudad
                        </p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                        <h3 className="font-semibold text-primary mb-2">Contacto</h3>
                        <p className="text-sm text-gray-600">
                            +1 234 567 8900
                            <br />
                            info@yaday.com
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
