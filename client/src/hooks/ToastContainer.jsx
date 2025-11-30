import React from "react";
import { useToast } from "../hooks/use-toast.js";

export function ToastContainer() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`max-w-sm w-full p-4 rounded shadow-md text-white flex justify-between items-start
            ${toast.variant === "destructive" ? "bg-red-600" : "bg-green-600"}
            transition-transform transform ${toast.open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <div>
            <strong className="block">{toast.title}</strong>
            {toast.description && <p className="text-sm">{toast.description}</p>}
          </div>
          <button onClick={() => dismiss(toast.id)} className="ml-4 font-bold">✕</button>
        </div>
      ))}
    </div>
  );
}
