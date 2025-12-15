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
                addBotMessage("📝 Este es el resumen de tu cita. Revisa que todo esté correcto:");
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

    // Mapa de pasos anteriores
    const previousStepMap: Record<Step, Step | null> = {
        welcome: null,
        service: "welcome",
        date: "service",
        time: "date",
        name: "time",
        email: "name",
        phone: "email",
        message: "phone",
        confirm: "message",
        completed: null,
    };

    // Mensajes para cada paso al volver
    const stepMessages: Record<Step, string> = {
        welcome: "¡Hola! 👋 ¿Te gustaría agendar una cita?",
        service: "¿Qué servicio te interesa?",
        date: "¿Para qué fecha te gustaría agendar tu cita?",
        time: "¿A qué hora prefieres tu cita?",
        name: "¿Cuál es tu nombre completo?",
        email: "¿Cuál es tu email?",
        phone: "¿Cuál es tu número de teléfono o WhatsApp?",
        message: "¿Tienes algún comentario adicional? (Opcional - escribe 'no' si no)",
        confirm: "",
        completed: "",
    };

    const goBack = () => {
        const prevStep = previousStepMap[currentStep];
        if (prevStep) {
            // Limpiar el dato del paso actual
            if (currentStep === "service") {
                setBookingData(prev => ({ ...prev, service: "" }));
            } else if (currentStep === "date") {
                setBookingData(prev => ({ ...prev, date: null }));
            } else if (currentStep === "time") {
                setBookingData(prev => ({ ...prev, time: "" }));
            } else if (currentStep === "name") {
                setBookingData(prev => ({ ...prev, name: "" }));
            } else if (currentStep === "email") {
                setBookingData(prev => ({ ...prev, email: "" }));
            } else if (currentStep === "phone") {
                setBookingData(prev => ({ ...prev, phone: "" }));
            } else if (currentStep === "message") {
                setBookingData(prev => ({ ...prev, mensaje: "" }));
            }

            setCurrentStep(prevStep);
            addBotMessage(`⬅️ Volviendo... ${stepMessages[prevStep]}`);
        }
    };

    const goToStep = (step: Step) => {
        setCurrentStep(step);
        addBotMessage(`✏️ Editando... ${stepMessages[step]}`);
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
                        className="fixed z-50 bg-white shadow-2xl flex flex-col overflow-hidden
                            bottom-0 right-0 left-0 top-0 rounded-none
                            sm:bottom-24 sm:right-6 sm:left-auto sm:top-auto sm:rounded-2xl
                            sm:w-[380px] sm:max-w-[calc(100vw-3rem)] sm:h-[600px] sm:max-h-[calc(100vh-8rem)]"
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
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
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
                                <div className="space-y-2">
                                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
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
                                    <div className="flex gap-2 pt-2 border-t border-gray-100">
                                        <button onClick={goBack} className="flex-1 text-gray-600 text-sm py-2 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">⬅️ Volver</button>
                                        <button onClick={handleReset} className="flex-1 text-red-500 text-sm py-2 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">🔄 Reiniciar</button>
                                    </div>
                                </div>
                            )}

                            {currentStep === "date" && (
                                <div className="space-y-2">
                                    <input
                                        type="date"
                                        min={format(new Date(), "yyyy-MM-dd")}
                                        onChange={(e) => {
                                            // Evitar problema de zona horaria: parsear manualmente la fecha
                                            const [year, month, day] = e.target.value.split('-').map(Number);
                                            const localDate = new Date(year, month - 1, day);
                                            handleDateSelect(localDate);
                                        }}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                    />
                                    <div className="flex gap-2 pt-2 border-t border-gray-100">
                                        <button onClick={goBack} className="flex-1 text-gray-600 text-sm py-2 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">⬅️ Volver</button>
                                        <button onClick={handleReset} className="flex-1 text-red-500 text-sm py-2 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">🔄 Reiniciar</button>
                                    </div>
                                </div>
                            )}

                            {currentStep === "time" && (
                                <div className="space-y-2">
                                    <div className="grid grid-cols-3 gap-2 max-h-36 overflow-y-auto">
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
                                    <div className="flex gap-2 pt-2 border-t border-gray-100">
                                        <button onClick={goBack} className="flex-1 text-gray-600 text-sm py-2 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">⬅️ Volver</button>
                                        <button onClick={handleReset} className="flex-1 text-red-500 text-sm py-2 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">🔄 Reiniciar</button>
                                    </div>
                                </div>
                            )}

                            {(currentStep === "name" || currentStep === "email" || currentStep === "phone" || currentStep === "message") && (
                                <div className="space-y-2">
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
                                    <div className="flex gap-2 pt-2 border-t border-gray-100">
                                        <button onClick={goBack} className="flex-1 text-gray-600 text-sm py-2 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">⬅️ Volver</button>
                                        <button onClick={handleReset} className="flex-1 text-red-500 text-sm py-2 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">🔄 Reiniciar</button>
                                    </div>
                                </div>
                            )}

                            {currentStep === "confirm" && (
                                <div className="space-y-3">
                                    <p className="text-xs text-gray-500 text-center">Toca un campo para editarlo:</p>
                                    <div className="space-y-2 text-sm">
                                        <button onClick={() => goToStep("service")} className="w-full flex justify-between items-center bg-gray-50 p-2 rounded-lg hover:bg-gray-100">
                                            <span className="text-gray-500">🎨 Servicio:</span>
                                            <span className="font-medium text-[#075E54]">{bookingData.service}</span>
                                        </button>
                                        <button onClick={() => goToStep("date")} className="w-full flex justify-between items-center bg-gray-50 p-2 rounded-lg hover:bg-gray-100">
                                            <span className="text-gray-500">📅 Fecha:</span>
                                            <span className="font-medium text-[#075E54]">{bookingData.date ? format(bookingData.date, "PPP", { locale: es }) : ""}</span>
                                        </button>
                                        <button onClick={() => goToStep("time")} className="w-full flex justify-between items-center bg-gray-50 p-2 rounded-lg hover:bg-gray-100">
                                            <span className="text-gray-500">🕐 Hora:</span>
                                            <span className="font-medium text-[#075E54]">{bookingData.time}</span>
                                        </button>
                                        <button onClick={() => goToStep("name")} className="w-full flex justify-between items-center bg-gray-50 p-2 rounded-lg hover:bg-gray-100">
                                            <span className="text-gray-500">👤 Nombre:</span>
                                            <span className="font-medium text-[#075E54]">{bookingData.name}</span>
                                        </button>
                                        <button onClick={() => goToStep("email")} className="w-full flex justify-between items-center bg-gray-50 p-2 rounded-lg hover:bg-gray-100">
                                            <span className="text-gray-500">📧 Email:</span>
                                            <span className="font-medium text-[#075E54]">{bookingData.email}</span>
                                        </button>
                                        <button onClick={() => goToStep("phone")} className="w-full flex justify-between items-center bg-gray-50 p-2 rounded-lg hover:bg-gray-100">
                                            <span className="text-gray-500">📱 Teléfono:</span>
                                            <span className="font-medium text-[#075E54]">{bookingData.phone}</span>
                                        </button>
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <button
                                            onClick={handleReset}
                                            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                                        >
                                            ❌ Cancelar
                                        </button>
                                        <button
                                            onClick={() => confirmBooking(bookingData.mensaje)}
                                            className="flex-1 bg-[#25D366] text-white py-2 px-4 rounded-lg hover:bg-[#20BA5A] transition-colors text-sm font-medium"
                                        >
                                            ✅ Confirmar
                                        </button>
                                    </div>
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
