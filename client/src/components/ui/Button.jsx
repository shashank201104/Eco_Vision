//Author - Pratham Khare
import React from "react";
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils.js"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",

    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:bg-primary-hover shadow-soft hover:shadow-medium",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-soft",
                outline:
                    "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground shadow-soft  hover: shadow-medium",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary-hover shadow-soft",
                ghost:
                    "text-foreground hover:bg-accent hover:text-accent-foreground",
                link:
                    "text-primary underline-offset-4 hover:underline",
                hero:
                    "bg-white text-green-600 border-2 border-white/20 hover: border-white/40 shadow-glow hover:shadow-strong backdrop-blur-sm",
                eco:
                    "bg-[hsl(var(--eco-green))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--eco-leaf))] shadow-medium hover:shadow-glow",

                earth:
                    "bg-gradient-earth text-white hover: opacity-90 shadow-medium",
                success:
                    "bg-success text-success-foreground hover:bg-success/90 shadow-soft",
                warning:
                    "bg-warning text-warning-foreground hover:bg-warning/90 shadow-soft",
            },
            size: {
                default: "h-11 px-6 py-2",
                sm: "h-9 px-4 text-sm",
                lg: "h-14 px-10 text-lg font-semibold",
                xl: "h-16 px-12 text-xl font-bold",
                icon: "h-11 w-11",
                "icon-sm": "h-9 w-9",
                "icon-lg": "h-14 w-14",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = React.forwardRef(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants };