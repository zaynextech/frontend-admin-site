import { cn } from "@/lib/utils"

export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        // Base Styling: Deep background with a subtle border
        "group relative overflow-hidden rounded-2xl border border-white/5 bg-slate-950 p-8 transition-all duration-300",
        // Hover State: Lift effect and border illumination
        "hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)]",
        className
      )}
      {...props}
    >
      {/* 1. Atmospheric Radial Glow (The "Pro" Look) */}
      <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100" 
           style={{
             background: "radial-gradient(600px circle at center, rgba(255,255,255,0.06), transparent 40%)"
           }} 
      />

      {/* 2. Top Edge Light-Leak */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* 3. Content - Ensure it stays above the glow */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}