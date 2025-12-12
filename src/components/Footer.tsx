"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            icon: Instagram,
            link: "https://instagram.com/yadaynails.es",
            label: "Instagram",
        },
        {
            icon: WhatsAppIcon,
            link: "https://wa.me/34722224379?text=¡Hola!%20Me%20gustaría%20agendar%20una%20cita%20✨",
            label: "WhatsApp",
        },
    ];

    return (
        <footer className="bg-primary text-white py-4">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <h3 className="font-playfair text-xl font-bold mb-2">
                            YaDay Nail Designer
                        </h3>
                        <p className="text-white/80 text-sm">
                            Transformando tus uñas en obras de arte. Belleza, elegancia y
                            profesionalismo en cada detalle.
                        </p>
                    </div>

                    {/* Social Media - Left aligned, with space for WhatsApp button */}
                    <div className="md:pr-20">
                        <h4 className="font-semibold text-sm mb-2">Síguenos</h4>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/20 pt-4 text-center">
                    <p className="text-white/60 text-sm">
                        © {currentYear} YaDay Nail Designer. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
