"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CustomCalendarProps {
    selected?: Date;
    onSelect?: (date: Date | undefined) => void;
    disabled?: (date: Date) => boolean;
    className?: string;
}

const DAYS = ["L", "M", "X", "J", "V", "S", "D"];
const MONTHS = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function CustomCalendar({
    selected,
    onSelect,
    disabled,
    className,
}: CustomCalendarProps) {
    const [currentDate, setCurrentDate] = React.useState(() => {
        return selected || new Date();
    });

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get first day of month (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfMonth = new Date(year, month, 1);
    // Convert to Monday-based week (0 = Monday, 6 = Sunday)
    let startDay = firstDayOfMonth.getDay() - 1;
    if (startDay < 0) startDay = 6;

    // Get number of days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get days from previous month to fill the first row
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    // Build calendar grid
    const calendarDays: (Date | null)[] = [];

    // Previous month days
    for (let i = startDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        calendarDays.push(new Date(year, month - 1, day));
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(new Date(year, month, day));
    }

    // Next month days to complete the grid (6 rows max)
    const remainingDays = 42 - calendarDays.length;
    for (let day = 1; day <= remainingDays; day++) {
        calendarDays.push(new Date(year, month + 1, day));
    }

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const isSelected = (date: Date) => {
        if (!selected) return false;
        return (
            date.getDate() === selected.getDate() &&
            date.getMonth() === selected.getMonth() &&
            date.getFullYear() === selected.getFullYear()
        );
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    const isCurrentMonth = (date: Date) => {
        return date.getMonth() === month;
    };

    const isDisabled = (date: Date) => {
        if (disabled) {
            return disabled(date);
        }
        return false;
    };

    const handleDateClick = (date: Date) => {
        if (!isDisabled(date) && onSelect) {
            onSelect(date);
        }
    };

    return (
        <div className={cn("p-4 bg-white rounded-lg", className)}>
            {/* Header with navigation */}
            <div className="flex items-center justify-between mb-4">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={prevMonth}
                    type="button"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-base font-semibold text-gray-900">
                    {MONTHS[month]} {year}
                </h2>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={nextMonth}
                    type="button"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS.map((day, index) => (
                    <div
                        key={index}
                        className="h-9 flex items-center justify-center text-sm font-medium text-gray-500"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date, index) => {
                    if (!date) return <div key={index} className="h-9 w-9" />;

                    const selected = isSelected(date);
                    const today = isToday(date);
                    const currentMonth = isCurrentMonth(date);
                    const dateDisabled = isDisabled(date);

                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => handleDateClick(date)}
                            disabled={dateDisabled}
                            className={cn(
                                "h-9 w-9 rounded-md text-sm font-normal transition-colors flex items-center justify-center",
                                // Base styles
                                currentMonth ? "text-gray-900" : "text-gray-400",
                                // Hover state
                                !dateDisabled && !selected && "hover:bg-gray-100",
                                // Selected state
                                selected && "bg-primary text-white hover:bg-primary",
                                // Today state
                                today && !selected && "bg-gray-100 font-semibold",
                                // Disabled state
                                dateDisabled && "opacity-50 cursor-not-allowed text-gray-300"
                            )}
                        >
                            {date.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

CustomCalendar.displayName = "CustomCalendar";

export { CustomCalendar };
export type { CustomCalendarProps };
