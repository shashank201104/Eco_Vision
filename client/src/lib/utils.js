//Author - Pratham Khare

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";


//Combines class names using `clsx`, then merges conflicting Tailwind classes using `twMerge`.
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
