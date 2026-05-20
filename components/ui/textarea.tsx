import * as React from "react"
import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <div className="group relative w-full">
      {/* Background Glow Effect */}
      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-b from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-focus-within:opacity-100" />
      
      <textarea
        className={cn(
          // Base: Depth-first design with subtle transparency
          "relative flex min-h-[140px] w-full rounded-xl border border-white/5 bg-slate-900/40 px-4 py-4 text-sm text-white backdrop-blur-sm transition-all duration-200",
          // Scrollbar Styling (Advanced)
          "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20",
          // Typography & Interaction
          "placeholder:text-slate-500 outline-none resize-none",
          // Focus & Hover states
          "focus:border-white/20 focus:ring-4 focus:ring-white/5 focus:bg-slate-900/80",
          "hover:border-white/10 hover:bg-slate-900/60",
          className
        )}
        ref={ref}
        {...props}
      />
      
      {/* Subtle Bottom-Right Resize Indicator Hint (Visual only since resize is none) */}
      <div className="absolute bottom-3 right-3 pointer-events-none opacity-20">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 1L1 11M11 5L5 11M11 9L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  )
})

Textarea.displayName = "Textarea"

export { Textarea }