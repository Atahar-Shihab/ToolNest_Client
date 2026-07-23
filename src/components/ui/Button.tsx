import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "success" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants: Record<string, string> = {
      primary: "bg-primary hover:bg-primary/90 text-white",
      secondary: "bg-secondary hover:bg-secondary/90 text-white",
      outline: "border border-border hover:bg-surface-hover text-foreground",
      ghost: "hover:bg-surface-hover text-foreground",
      destructive: "bg-error hover:bg-error/90 text-white",
      success: "bg-success hover:bg-success/90 text-white",
      danger: "bg-error hover:bg-error/90 text-white",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
export { Button };