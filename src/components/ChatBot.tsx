"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Calendar, Clock, User, Mail, Phone } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { services, availableTimes } from "@/lib/services";

type Message = {
    id: string;
    type: "bot" | "user";
    content: string;
    timestamp: Date;
};

type Step =
    | "welcome"
    | "service"
    | "date"
    | "time"
    | "name"
    | "email"
    | "phone"
    | "message"
    | "confirm"
    | "completed";

type BookingData = {
    service: string;
    date: Date | null;
    time: string;
    name: string;
    email: string;
    phone: string;
    mensaje: string;
};

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentStep, setCurrentStep] = useState<Step>("welcome");
    const [bookingData, setBookingData] = useState<BookingData>({
        service: "",
        date: null,
        time: "",
        name: "",
        email: "",
        phone: "",
        mensaje: "",
    });
    const [inputValue, setInputValue] = useState("");
    const [availableHours, setAvailableHours] = useState<string[]>(availableTimes);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Iniciar conversación
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            addBotMessage(
                "¡Hola! 👋 Soy el asistente virtual de YaDay Nail Designer. ¿Te gustaría agendar una cita?"
            );
        }
    }, [isOpen]);

    const addBotMessage = (content: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            type: "bot",
            content,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newMessage]);
    };

    const addUserMessage = (content: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            type: "user",
            content,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newMessage]);
    };

    const handleServiceSelect = (serviceName: string) => {
        addUserMessage(serviceName);
        setBookingData({ ...bookingData, service: serviceName });
        setCurrentStep("date");
        setTimeout(() => {
            addBotMessage("Perfecto! ¿Para qué fecha te gustaría agendar tu cita?");
        }, 500);
    };

    const handleDateSelect = async (date: Date) => {
        addUserMessage(format(date, "PPP", { locale: es }));
        setBookingData({ ...bookingData, date });

        // Fetch available hours for selected date
        const fecha = format(date, "yyyy-MM-dd");
        try {
            const response = await fetch(`/api/availability?fecha=${fecha}`);
            const data = await response.json();
            const occupiedHours = data.horasOcupadas || [];
            const available = availableTimes.filter(time => !occupiedHours.includes(time));
            setAvailableHours(available);
        } catch (error) {
            console.error("Error fetching availability:", error);
            setAvailableHours(availableTimes);
        }

        setCurrentStep("time");
        setTimeout(() => {
            addBotMessage("¿A qué hora prefieres tu cita?");
        }, 500);
    };

    const handleTimeSelect = (time: string) => {
        addUserMessage(time);
        setBookingData({ ...bookingData, time });
        setCurrentStep("name");
        setTimeout(() => {
            addBotMessage("Excelente! Para confirmar la reserva, ¿cuál es tu nombre completo?");
        }, 500);
    };

    const handleTextInput = (step: Step, value: string) => {
        addUserMessage(value);

        if (step === "name") {
            setBookingData({ ...bookingData, name: value });
            setCurrentStep("email");
            setTimeout(() => {
                addBotMessage(`Gracias ${value}! ¿Cuál es tu email?`);
            }, 500);
        } else if (step === "email") {
            setBookingData({ ...bookingData, email: value });
            setCurrentStep("phone");
            setTimeout(() => {
                addBotMessage("Por último, ¿cuál es tu número de teléfono o WhatsApp?");
            }, 500);
        } else if (step === "phone") {
            setBookingData({ ...bookingData, phone: value });
            setCurrentStep("message");
            setTimeout(() => {
                addBotMessage("¿Tienes algún comentario o pregunta adicional? (Opcional - puedes escribir 'no' si no tienes nada que agregar)");
            }, 500);
        } else if (step === "message") {
            const mensaje = value.toLowerCase() === "no" ? "" : value;
            setBookingData({ ...bookingData, mensaje });
            setCurrentStep("confirm");
            setTimeout(() => {
                confirmBooking(mensaje);
            }, 500);
        }

        setInputValue("");
    };

    const confirmBooking = async (mensaje: string) => {
        const data = { ...bookingData, mensaje };

        addBotMessage(
            `📝 Confirmemos tu cita:\n\n` +
            `🎨 Servicio: ${data.service}\n` +
            `📅 Fecha: ${data.date ? format(data.date, "PPP", { locale: es }) : ""}\n` +
            `🕐 Hora: ${data.time}\n` +
            `👤 Nombre: ${data.name}\n` +
            `📧 Email: ${data.email}\n` +
            `📱 Teléfono: ${data.phone}\n\n` +
            `Procesando tu reserva...`
        );

        try {
            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre: data.name,
                    email: data.email,
                    telefono: data.phone,
                    servicio: data.service,
                    fecha: data.date ? format(data.date, "yyyy-MM-dd") : "",
                    hora: data.time,
                    mensaje: data.mensaje,
                }),
            });

            if (response.ok) {
                setCurrentStep("completed");
                setTimeout(() => {
                    addBotMessage(
                        "✅ ¡Cita agendada con éxito! ✨\n\n" +
                        "Te hemos enviado un email de confirmación. " +
                        "Nos pondremos en contacto contigo pronto.\n\n" +
                        "¿Necesitas agendar otra cita?"
                    );
                }, 1000);
            } else {
                addBotMessage("❌ Hubo un error al procesar tu reserva. Por favor, intenta nuevamente o contáctanos directamente.");
            }
        } catch (error) {
            addBotMessage("❌ Error de conexión. Por favor, verifica tu internet e intenta nuevamente.");
        }
    };

    const handleReset = () => {
        setCurrentStep("welcome");
        setBookingData({
            service: "",
            date: null,
            time: "",
            name: "",
            email: "",
            phone: "",
            mensaje: "",
        });
        setMessages([]);
        setTimeout(() => {
            addBotMessage("¡Hola! 👋 ¿Te gustaría agendar una cita?");
        }, 300);
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-2xl flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <X key="close" className="w-7 h-7" />
                    ) : (
                        <MessageCircle key="open" className="w-7 h-7" />
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <MessageCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Asistente YaDay</h3>
                                    <p className="text-xs text-white/80">Siempre disponible</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#ECE5DD]">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-lg px-4 py-2 ${message.type === "user"
                                            ? "bg-[#DCF8C6] text-gray-800"
                                            : "bg-white text-gray-800 shadow-sm"
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-200">
                            {currentStep === "welcome" && (
                                <div className="space-y-2">
                                    <button
                                        onClick={() => {
                                            addUserMessage("Sí, quiero agendar una cita");
                                            setCurrentStep("service");
                                            setTimeout(() => addBotMessage("Perfecto! ¿Qué servicio te interesa?"), 500);
                                        }}
                                        className="w-full bg-[#25D366] text-white py-2 px-4 rounded-lg hover:bg-[#20BA5A] transition-colors text-sm font-medium"
                                    >
                                        Sí, agendar cita
                                    </button>
                                    <button
                                        onClick={() => window.open("https://wa.me/34722224379", "_blank")}
                                        className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                                    >
                                        Contactar por WhatsApp
                                    </button>
                                </div>
                            )}

                            {currentStep === "service" && (
                                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                                    {services.filter(s => s.id !== 'retiro-material').map((service) => (
                                        <button
                                            key={service.id}
                                            onClick={() => handleServiceSelect(service.name)}
                                            className="bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#075E54] py-2 px-3 rounded-lg transition-colors text-xs font-medium text-left"
                                        >
                                            {service.name}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {currentStep === "date" && (
                                <input
                                    type="date"
                                    min={format(new Date(), "yyyy-MM-dd")}
                                    onChange={(e) => handleDateSelect(new Date(e.target.value))}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                />
                            )}

                            {currentStep === "time" && (
                                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                                    {availableHours.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => handleTimeSelect(time)}
                                            className="bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#075E54] py-2 px-3 rounded-lg transition-colors text-sm font-medium"
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {(currentStep === "name" || currentStep === "email" || currentStep === "phone" || currentStep === "message") && (
                                <div className="flex gap-2">
                                    <input
                                        type={currentStep === "email" ? "email" : currentStep === "phone" ? "tel" : "text"}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter" && inputValue.trim()) {
                                                handleTextInput(currentStep, inputValue.trim());
                                            }
                                        }}
                                        placeholder={
                                            currentStep === "name" ? "Tu nombre..." :
                                                currentStep === "email" ? "tu@email.com" :
                                                    currentStep === "phone" ? "+34 722224379" :
                                                        "Escribe aquí..."
                                        }
                                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                        autoFocus
                                    />
                                    <button
                                        onClick={() => {
                                            if (inputValue.trim()) {
                                                handleTextInput(currentStep, inputValue.trim());
                                            }
                                        }}
                                        className="bg-[#25D366] text-white p-2 rounded-lg hover:bg-[#20BA5A] transition-colors"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            )}

                            {currentStep === "completed" && (
                                <button
                                    onClick={handleReset}
                                    className="w-full bg-[#25D366] text-white py-2 px-4 rounded-lg hover:bg-[#20BA5A] transition-colors text-sm font-medium"
                                >
                                    Agendar otra cita
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
