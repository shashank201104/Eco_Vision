//Author - Pratham Khare
import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

//Label Component
const Label = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    />
  );
});

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
