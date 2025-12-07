"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const contactInfo = [
        {
            icon: MapPin,
            text: "Av. Principal #123, Ciudad",
            link: "https://maps.google.com",
        },
        {
            icon: Phone,
            text: "+1 234 567 8900",
            link: "tel:+12345678900",
        },
        {
            icon: Mail,
            text: "info@yaday.com",
            link: "mailto:info@yaday.com",
        },
    ];

    const socialLinks = [
        {
            icon: Instagram,
            link: "https://instagram.com/yaday",
            label: "Instagram",
        },
        {
            icon: Facebook,
            link: "https://facebook.com/yaday",
            label: "Facebook",
        },
    ];

    return (
        <footer className="bg-primary text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Section */}
                    <div>
                        <h3 className="font-playfair text-2xl font-bold mb-4">
                            YaDay Nail Designer
                        </h3>
                        <p className="text-white/80 text-sm">
                            Transformando tus uñas en obras de arte. Belleza, elegancia y
                            profesionalismo en cada detalle.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Contacto</h4>
                        <ul className="space-y-3">
                            {contactInfo.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-white/80 hover:text-accent transition-colors"
                                    >
                                        <item.icon className="w-4 h-4" />
                                        <span className="text-sm">{item.text}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Síguenos</h4>
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

                        {/* WhatsApp */}
                        <div className="mt-6">
                            <a
                                href="https://wa.me/12345678900"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
                            >
                                <Phone className="w-4 h-4" />
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/20 pt-8 text-center">
                    <p className="text-white/60 text-sm">
                        © {currentYear} YaDay Nail Designer. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
