"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomSelectProps {
    name: string;
    placeholder: string;
    options: string[];
    required?: boolean;
    value?: string;
    onChange?: (value: string) => void;
}

export default function CustomSelect({
    name,
    placeholder,
    options,
    required,
    value: controlledValue,
    onChange,
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState("");
    const ref = useRef<HTMLDivElement>(null);

    const value = controlledValue ?? internalValue;

    // Close on click outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
        } else if (e.key === "Escape") {
            setIsOpen(false);
        } else if (e.key === "ArrowDown" && isOpen) {
            e.preventDefault();
            const currentIdx = options.indexOf(value);
            const nextIdx = Math.min(currentIdx + 1, options.length - 1);
            const newValue = options[nextIdx];
            setInternalValue(newValue);
            onChange?.(newValue);
        } else if (e.key === "ArrowUp" && isOpen) {
            e.preventDefault();
            const currentIdx = options.indexOf(value);
            const prevIdx = Math.max(currentIdx - 1, 0);
            const newValue = options[prevIdx];
            setInternalValue(newValue);
            onChange?.(newValue);
        }
    };

    const selectOption = (option: string) => {
        setInternalValue(option);
        onChange?.(option);
        setIsOpen(false);
    };

    return (
        <div ref={ref} className="relative">
            {/* Hidden native select for form submission */}
            <input type="hidden" name={name} value={value} required={required} />

            {/* Custom trigger */}
            <div
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                tabIndex={0}
                className="editorial-input flex items-center justify-between cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
            >
                <span
                    className={value ? "text-text" : "text-text-muted/40"}
                    style={{
                        fontFamily: "var(--font-body)",
                        fontStyle: "italic",
                    }}
                >
                    {value || placeholder}
                </span>
                <motion.span
                    className="font-mono text-[11px] text-text-muted"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    ↓
                </motion.span>
            </div>

            {/* Dropdown panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        role="listbox"
                        className="absolute top-full left-0 right-0 z-50 mt-1 border border-border bg-bg-surface backdrop-blur-xl"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                    >
                        {options.map((option) => (
                            <div
                                key={option}
                                role="option"
                                aria-selected={option === value}
                                className={`px-4 py-3 cursor-pointer transition-colors ${option === value
                                        ? "text-accent bg-accent/5"
                                        : "text-text-muted hover:text-text hover:bg-border/20"
                                    }`}
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: "15px",
                                    fontStyle: "italic",
                                }}
                                onClick={() => selectOption(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
