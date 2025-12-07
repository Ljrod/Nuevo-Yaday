"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, User, Phone } from "lucide-react";
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
import { Calendar } from "@/components/ui/calendar";
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
        phone: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation
        const newErrors: Record<string, string> = {};

        if (!formData.service) newErrors.service = "Por favor selecciona un servicio";
        if (!formData.date) newErrors.date = "Por favor selecciona una fecha";
        if (!formData.time) newErrors.time = "Por favor selecciona una hora";
        if (!formData.name.trim()) newErrors.name = "Por favor ingresa tu nombre";
        if (!formData.phone.trim()) newErrors.phone = "Por favor ingresa tu teléfono";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Log to console as specified
            console.log("=== DATOS DE LA CITA ===");
            console.log("Servicio:", formData.service);
            console.log(
                "Fecha:",
                formData.date ? format(formData.date, "PPP", { locale: es }) : ""
            );
            console.log("Hora:", formData.time);
            console.log("Nombre:", formData.name);
            console.log("Teléfono:", formData.phone);
            console.log("========================");

            // Show success message
            alert(
                `¡Cita agendada con éxito!\n\nServicio: ${formData.service}\nFecha: ${formData.date ? format(formData.date, "PPP", { locale: es }) : ""
                }\nHora: ${formData.time}\n\nTe contactaremos pronto al ${formData.phone
                }`
            );

            // Reset form
            setFormData({
                service: "",
                date: undefined,
                time: "",
                name: "",
                phone: "",
            });
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
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
                                <Calendar
                                    mode="single"
                                    selected={formData.date}
                                    onSelect={(date) => setFormData({ ...formData, date })}
                                    disabled={(date) =>
                                        date < new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {errors.date && (
                            <p className="text-sm text-red-500">{errors.date}</p>
                        )}
                    </div>

                    {/* Time Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="time" className="flex items-center gap-2 text-base">
                            <span className="text-primary">3.</span> Hora
                        </Label>
                        <Select
                            value={formData.time}
                            onValueChange={(value) =>
                                setFormData({ ...formData, time: value })
                            }
                        >
                            <SelectTrigger
                                id="time"
                                className={cn(errors.time && "border-red-500")}
                            >
                                <SelectValue placeholder="Elige una hora..." />
                            </SelectTrigger>
                            <SelectContent>
                                {availableTimes.map((time) => (
                                    <SelectItem key={time} value={time}>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            {time}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
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
                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Nombre Completo
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
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                Teléfono / WhatsApp
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="+1 234 567 8900"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                                className={cn(errors.phone && "border-red-500")}
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
                >
                    Confirmar Cita
                </Button>

                <p className="text-sm text-gray-500 text-center">
                    Te contactaremos pronto para confirmar tu cita
                </p>
            </div>
        </motion.form>
    );
}
