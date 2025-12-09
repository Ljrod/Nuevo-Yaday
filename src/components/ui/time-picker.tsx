"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeSlot {
    time: string;
    disabled?: boolean;
}

interface TimePickerProps {
    times: string[];
    selected?: string;
    onSelect?: (time: string) => void;
    disabledTimes?: string[];
    disabled?: boolean;
    className?: string;
}

function TimePicker({
    times,
    selected,
    onSelect,
    disabledTimes = [],
    disabled = false,
    className,
}: TimePickerProps) {
    const handleTimeClick = (time: string) => {
        if (!disabled && !disabledTimes.includes(time) && onSelect) {
            onSelect(time);
        }
    };

    // Group times by morning (before 13:00) and afternoon (13:00+)
    const morningTimes = times.filter((time) => {
        const hour = parseInt(time.split(":")[0]);
        return hour < 13;
    });

    const afternoonTimes = times.filter((time) => {
        const hour = parseInt(time.split(":")[0]);
        return hour >= 13;
    });

    const TimeButton = ({ time }: { time: string }) => {
        const isSelected = selected === time;
        const isDisabled = disabled || disabledTimes.includes(time);

        return (
            <button
                type="button"
                onClick={() => handleTimeClick(time)}
                disabled={isDisabled}
                className={cn(
                    "relative flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    "border-2",
                    // Default state
                    !isSelected && !isDisabled && "border-gray-200 bg-white text-gray-700 hover:border-primary/50 hover:bg-primary/5",
                    // Selected state
                    isSelected && "border-primary bg-primary text-white shadow-md",
                    // Disabled state
                    isDisabled && "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                )}
            >
                <Clock className="w-3.5 h-3.5" />
                <span>{time}</span>
                {isDisabled && !disabled && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                )}
            </button>
        );
    };

    if (disabled) {
        return (
            <div className={cn("p-4 bg-gray-50 rounded-lg border border-gray-200", className)}>
                <p className="text-sm text-gray-500 text-center">
                    Selecciona una fecha primero
                </p>
            </div>
        );
    }

    return (
        <div className={cn("space-y-4", className)}>
            {/* Morning times */}
            {morningTimes.length > 0 && (
                <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1">
                        <span>☀️</span> Mañana
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                        {morningTimes.map((time) => (
                            <TimeButton key={time} time={time} />
                        ))}
                    </div>
                </div>
            )}

            {/* Afternoon times */}
            {afternoonTimes.length > 0 && (
                <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1">
                        <span>🌙</span> Tarde
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                        {afternoonTimes.map((time) => (
                            <TimeButton key={time} time={time} />
                        ))}
                    </div>
                </div>
            )}

            {/* Legend */}
            {disabledTimes.length > 0 && (
                <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                        <span>Ocupada</span>
                    </div>
                </div>
            )}
        </div>
    );
}

TimePicker.displayName = "TimePicker";

export { TimePicker };
export type { TimePickerProps };
