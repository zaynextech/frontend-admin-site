import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base: Clean geometry, medium weight, precise transitions. 
  // 'active:scale-[0.98]' provides excellent tactile feedback.
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        // Zaynex Brand Primary: Uses a subtle top-down gradient for depth, no glows.
        default: 
          "bg-gradient-to-b from-[#06B6D4] to-[#0891B2] text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.15)] hover:from-[#22D3EE] hover:to-[#06B6D4]",
        
        // Advanced Outline: Transparent background with a refined border effect.
        outline: 
          "border border-white/10 bg-transparent text-zinc-300 hover:bg-white/5 hover:text-zinc-100",
        
        // Ghost/Subtle: Invisible until hovered. Used for less important actions.
        ghost: 
          "text-zinc-400 hover:bg-white/5 hover:text-zinc-100",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-sm", // Keeps the text size normal, just widens the hit target
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }