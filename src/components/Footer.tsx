"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
