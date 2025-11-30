//Author - Pratham Khare


import { useState, useEffect } from "react";

// Maximum number of toasts allowed to show at once
const TOAST_LIMIT = 3;

// Delay before a toast is permanently removed, after being dismissed (in ms)
const TOAST_REMOVE_DELAY = 5000; // 5 seconds

// Simple incremental ID generator for toasts
let count = 0;
function genID() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

// Stores timeout references for scheduled toast removal
const toastTimeouts = new Map();

// Central shared toast state held in memory
let memoryState = { toasts: [] };

// List of subscribed UI listeners (components using useToast)
const listeners = [];

function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

/*
 -> Adds a toast to a timed removal queue.
 -> Ensures toast disappears after TOAST_REMOVE_DELAY.
 */
function addToRemoveQueue(toastId) {
  if (toastTimeouts.has(toastId)) return;

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: "REMOVE_TOAST", toastId });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
}


function reducer(state, action) {
  switch (action.type) {
    case "ADD_TOAST":
      // Adds new toast at the beginning and enforces maximum limit
      return { ...state, toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT) };
    case "UPDATE_TOAST":
      // Updates toast with matching ID
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };
    case "DISMISS_TOAST":
      // Schedule toast for removal (but allow fade-out)
      if (action.toastId) addToRemoveQueue(action.toastId);
      else state.toasts.forEach((t) => addToRemoveQueue(t.id));
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          action.toastId === undefined || t.id === action.toastId ? { ...t, open: false } : t
        ),
      };
    case "REMOVE_TOAST":
      // Immediately remove toast from state
      if (action.toastId === undefined) return { ...state, toasts: [] };
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.toastId) };
    default:
      return state;
  }
}


// createToast() : Creates a new toast, returns controls for dismissing/updating it.
export function createToast(props) {
  const id = genID();
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  const update = (props) => dispatch({ type: "UPDATE_TOAST", toast: { ...props, id } });

  dispatch({
    type: "ADD_TOAST",
    toast: { ...props, id, open: true, onOpenChange: (open) => !open && dismiss() },
  });

  return { id, dismiss, update };
}

export function useToast() {
  const [state, setState] = useState(memoryState);

  // Subscribe component to global toast state
  useEffect(() => {
    listeners.push(setState);

    // Cleanup when component unmounts
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return {
    ...state,
    toast: createToast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}
