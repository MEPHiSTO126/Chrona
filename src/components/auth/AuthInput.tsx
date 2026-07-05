"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface AuthInputProps {
  type: string;
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  autoComplete?: string;
}

export const AuthInput = ({
  type, label, id, name, value, onChange, placeholder, autoComplete,
}: AuthInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-white/60 uppercase tracking-wider">
        {label}
      </label>
      <div className={`relative group transition-all duration-200 ${isFocused ? 'ring-2 ring-primary/60 rounded-xl' : ''}`}>
        {/* Glowing border frame */}
        <div className={`absolute -inset-px rounded-xl transition-all duration-200 pointer-events-none
          ${isFocused
            ? 'bg-gradient-to-r from-primary/70 via-orange-400/50 to-primary/70 opacity-100'
            : 'bg-white/10 opacity-100'
          }`}
        />
        <input
          type={inputType}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="relative w-full bg-white/10 text-white placeholder-white/30 text-sm font-medium rounded-xl px-4 py-3 pr-10 outline-none border-none backdrop-blur-sm"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};
