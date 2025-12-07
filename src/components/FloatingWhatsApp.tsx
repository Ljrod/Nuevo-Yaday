"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function FloatingWhatsApp() {
    const [showPopup, setShowPopup] = useState(false);
    const [popupDismissed, setPopupDismissed] = useState(false);

    // WhatsApp number - Updated with actual number
    const whatsappNumber = "34722224379"; // +34 722 22 43 79
    const whatsappMessage = encodeURIComponent("¡Hola! Me gustaría agendar una cita 💅");

    useEffect(() => {
        // Show popup after 10 seconds
        const popupTimer = setTimeout(() => {
            if (!popupDismissed) {
                setShowPopup(true);
            }
        }, 10000);

        // Auto-hide popup after 8 seconds if not dismissed
        const hideTimer = setTimeout(() => {
            if (showPopup && !popupDismissed) {
                setShowPopup(false);
            }
        }, 18000);

        return () => {
            clearTimeout(popupTimer);
            clearTimeout(hideTimer);
        };
    }, [popupDismissed, showPopup]);

    const handleDismissPopup = () => {
        setShowPopup(false);
        setPopupDismissed(true);
    };

    const handleWhatsAppClick = () => {
        setShowPopup(false);
        window.open(
            `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
            "_blank"
        );
    };

    return (
        <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        >
            {/* Popup Message */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        className="absolute bottom-20 right-0 w-64 mb-2"
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-white rounded-2xl shadow-2xl p-4 relative border border-gray-100">
                            {/* Close button */}
                            <button
                                onClick={handleDismissPopup}
                                className="absolute -top-2 -right-2 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-colors"
                                aria-label="Cerrar"
                            >
                                <X className="w-4 h-4 text-gray-600" />
                            </button>

                            {/* Message content */}
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                                    <span className="text-white text-lg">💅</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-800 mb-1">
                                        ¿Lista para lucir uñas perfectas? ✨
                                    </p>
                                    <p className="text-xs text-gray-600 mb-3">
                                        ¡Agenda tu cita ahora y recibe atención personalizada!
                                    </p>
                                    <button
                                        onClick={handleWhatsAppClick}
                                        className="w-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                        Agendar por WhatsApp
                                    </button>
                                </div>
                            </div>

                            {/* Triangle pointer */}
                            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* WhatsApp Button with Official Logo */}
            <motion.button
                onClick={handleWhatsAppClick}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl transition-colors relative group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Contactar por WhatsApp"
            >
                {/* WhatsApp Official Logo SVG */}
                <svg
                    className="w-9 h-9"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>

                {/* Pulse animation */}
                <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20" />
            </motion.button>
        </motion.div>
    );
}
