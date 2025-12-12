"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, User, Phone, Mail } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CustomCalendar } from "@/components/ui/custom-calendar";
import { TimePicker } from "@/components/ui/time-picker";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { services, availableTimes } from "@/lib/services";
import { cn } from "@/lib/utils";

export default function BookingForm() {
    const [formData, setFormData] = useState({
        service: "",
        date: undefined as Date | undefined,
        time: "",
        name: "",
        email: "",
        phone: "",
        mensaje: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [horasOcupadas, setHorasOcupadas] = useState<string[]>([]);
    const [checkingAvailability, setCheckingAvailability] = useState(false);

    // Consultar disponibilidad cuando cambia la fecha
    useEffect(() => {
        const fetchAvailability = async () => {
            if (!formData.date) {
                setHorasOcupadas([]);
                return;
            }

            setCheckingAvailability(true);
            try {
                const fecha = format(formData.date, "yyyy-MM-dd");
                const response = await fetch(`/api/availability?fecha=${fecha}`);
                const data = await response.json();

                if (response.ok) {
                    setHorasOcupadas(data.horasOcupadas || []);
                } else {
                    console.error("Error fetching availability:", data.error);
                    setHorasOcupadas([]);
                }
            } catch (error) {
                console.error("Error fetching availability:", error);
                setHorasOcupadas([]);
            } finally {
                setCheckingAvailability(false);
            }
        };

        fetchAvailability();
    }, [formData.date]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation
        const newErrors: Record<string, string> = {};

        if (!formData.service) newErrors.service = "Por favor selecciona un servicio";
        if (!formData.date) newErrors.date = "Por favor selecciona una fecha";
        if (!formData.time) newErrors.time = "Por favor selecciona una hora";
        if (!formData.name.trim()) newErrors.name = "Por favor ingresa tu nombre";
        if (!formData.email.trim()) {
            newErrors.email = "Por favor ingresa tu email";
        } else {
            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = "Esto no es una dirección de correo electrónico válida";
            }
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Por favor ingresa tu teléfono";
        } else {
            // Validar que solo contenga números (después de limpiar espacios y caracteres especiales)
            const phoneNumbers = formData.phone.replace(/[\s\-\(\)\+]/g, '');
            if (!/^\d+$/.test(phoneNumbers)) {
                newErrors.phone = "El teléfono debe contener solo números";
            } else if (phoneNumbers.length < 9) {
                newErrors.phone = "El teléfono debe tener al menos 9 dígitos";
            }
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsSubmitting(true);

            try {
                // Preparar datos para enviar
                const bookingData = {
                    nombre: formData.name,
                    email: formData.email,
                    telefono: formData.phone,
                    servicio: formData.service,
                    fecha: formData.date ? format(formData.date, "yyyy-MM-dd") : "",
                    hora: formData.time,
                    mensaje: formData.mensaje || "",
                };

                // Enviar a la API
                const response = await fetch("/api/bookings", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bookingData),
                });

                const data = await response.json();

                if (response.ok) {
                    // Éxito
                    alert(
                        `¡Cita agendada con éxito! ✨\n\nServicio: ${formData.service}\nFecha: ${formData.date ? format(formData.date, "PPP", { locale: es }) : ""
                        }\nHora: ${formData.time}\n\nTe contactaremos pronto al ${formData.email}`
                    );

                    // Reset form
                    setFormData({
                        service: "",
                        date: undefined,
                        time: "",
                        name: "",
                        email: "",
                        phone: "",
                        mensaje: "",
                    });
                } else {
                    // Error del servidor
                    alert(
                        `Error al agendar la cita: ${data.error || "Por favor intenta de nuevo"}`
                    );
                }
            } catch (error) {
                console.error("Error al enviar formulario:", error);
                alert(
                    "Error de conexión. Por favor verifica tu internet e intenta de nuevo."
                );
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <div className="space-y-6">
                {/* Service Selection */}
                <div className="space-y-2">
                    <Label htmlFor="service" className="flex items-center gap-2 text-base">
                        <span className="text-primary">1.</span> Selecciona tu Servicio
                    </Label>
                    <Select
                        value={formData.service}
                        onValueChange={(value) =>
                            setFormData({ ...formData, service: value })
                        }
                    >
                        <SelectTrigger
                            id="service"
                            className={cn(errors.service && "border-red-500")}
                        >
                            <SelectValue placeholder="Elige un servicio..." />
                        </SelectTrigger>
                        <SelectContent>
                            {services.map((service) => (
                                <SelectItem key={service.id} value={service.name}>
                                    {service.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.service && (
                        <p className="text-sm text-red-500">{errors.service}</p>
                    )}
                </div>

                {/* Date and Time Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date Picker */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-base">
                            <span className="text-primary">2.</span> Fecha
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !formData.date && "text-muted-foreground",
                                        errors.date && "border-red-500"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formData.date ? (
                                        format(formData.date, "PPP", { locale: es })
                                    ) : (
                                        <span>Selecciona una fecha</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <CustomCalendar
                                    selected={formData.date}
                                    onSelect={(date) => setFormData({ ...formData, date })}
                                    disabled={(date: Date) =>
                                        date < new Date(new Date().setHours(0, 0, 0, 0))
                                    }
                                />
                            </PopoverContent>
                        </Popover>
                        {errors.date && (
                            <p className="text-sm text-red-500">{errors.date}</p>
                        )}
                    </div>

                    {/* Time Selection */}
                    <div className="space-y-2 md:col-span-2">
                        <Label className="flex items-center gap-2 text-base">
                            <span className="text-primary">3.</span> Hora
                            {checkingAvailability && (
                                <span className="text-xs text-gray-500 ml-2">
                                    (Consultando disponibilidad...)
                                </span>
                            )}
                        </Label>
                        <div className={cn(
                            "p-4 rounded-lg border",
                            errors.time ? "border-red-500 bg-red-50/50" : "border-gray-200 bg-gray-50/50"
                        )}>
                            <TimePicker
                                times={availableTimes}
                                selected={formData.time}
                                onSelect={(time) => setFormData({ ...formData, time })}
                                disabledTimes={horasOcupadas}
                                disabled={!formData.date || checkingAvailability}
                            />
                        </div>
                        {errors.time && (
                            <p className="text-sm text-red-500">{errors.time}</p>
                        )}
                    </div>
                </div>

                {/* Personal Information */}
                <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-lg text-primary mb-4">
                        4. Tus Datos de Contacto
                    </h3>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Nombre Completo *
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Tu nombre"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className={cn(errors.name && "border-red-500")}
                                required
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email *
                            </Label>
                            <input
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                onInvalid={(e) => {
                                    e.preventDefault();
                                    (e.target as HTMLInputElement).setCustomValidity(
                                        'Esto no es una dirección de correo electrónico válida'
                                    );
                                }}
                                onInput={(e) => {
                                    (e.target as HTMLInputElement).setCustomValidity('');
                                }}
                                className={cn(
                                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                                    errors.email && "border-red-500"
                                )}
                                required
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                Teléfono / WhatsApp *
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="+34 722 22 43 79"
                                value={formData.phone}
                                onChange={(e) => {
                                    // Permitir solo números, espacios, +, -, (, )
                                    const value = e.target.value.replace(/[^\d\s\+\-\(\)]/g, '');
                                    setFormData({ ...formData, phone: value });
                                }}
                                className={cn(errors.phone && "border-red-500")}
                                required
                            />
                            {errors.phone && (
                                <p className="text-sm text-red-500">{errors.phone}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="w-full text-lg font-semibold mt-6"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Enviando..." : "Confirmar Cita"}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                    Te contactaremos pronto para confirmar tu cita
                </p>
            </div>
        </motion.form>
    );
}
