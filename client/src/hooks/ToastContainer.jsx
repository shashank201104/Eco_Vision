//Author - Pratham Khare


import React from "react";
import { useToast } from "../hooks/use-toast.js";

/*
  -> This component listens to the global toast state from the `useToast` hook and renders toast notifications on the screen.
  -> Each toast has:
    - id (unique identifier)
    - title (main message)
    - description (optional detailed message)
    - variant (styling: e.g., "destructive" for errors)
    - open (controls animation visibility)
  -> The dismiss() function removes a toast by ID.
 */

export function ToastContainer() {
  // Retrieve active toasts and dismiss handler from custom hook
  const { toasts, dismiss } = useToast();

  return (
    // Container placed at bottom-right of screen
    <div className="fixed bottom-4 right-4 space-y-2 z-50">

      {/* Loop through all active toasts */}
      {toasts.map((toast) => (

        //Toast Content
        <div
          key={toast.id}
          className={`max-w-sm w-full p-4 rounded shadow-md text-white flex justify-between items-start
            ${toast.variant === "destructive" ? "bg-red-600" : "bg-green-600"}
            transition-transform transform ${toast.open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <div>
            <strong className="block">{toast.title}</strong>
            {/* Description shown only if provided */}
            {toast.description && <p className="text-sm">{toast.description}</p>}
          </div>
          <button onClick={() => dismiss(toast.id)} className="ml-4 font-bold">✕</button>
        </div>
      ))}
    </div>
  );
}
