import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <div className="group relative w-full">

      {/* Outer Glow */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-cyan-500/20 via-cyan-400/5 to-transparent opacity-0 blur-sm transition-all duration-500 group-focus-within:opacity-100" />

      {/* Border Glow */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.06] transition-all duration-300 group-focus-within:border-cyan-400/30 group-hover:border-white/10" />

      <input
        type={type}
        ref={ref}
        className={cn(
          // Layout
          "relative flex h-14 w-full rounded-2xl px-5 py-3",

          // Colors
          "bg-[#0B1120]/80 text-white placeholder:text-zinc-500",

          // Typography
          "text-sm font-medium tracking-wide",

          // Glass Effect
          "backdrop-blur-xl",

          // Borders
          "border border-transparent",

          // Smooth Animation
          "transition-all duration-300",

          // Focus
          "focus:bg-[#0B1120] focus:outline-none focus:ring-4 focus:ring-cyan-500/10",

          // Hover
          "hover:bg-[#0F172A]/90",

          // Disabled
          "disabled:cursor-not-allowed disabled:opacity-50",

          // Autofill Fix
          "autofill:bg-transparent",

          className
        )}
        {...props}
      />
    </div>
  );
});

Input.displayName = "Input";

export { Input };