import React, {useEffect, useState} from "react"

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

let count = 0;

function genID(){
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}

const actionTypes = {
    ADD_TOAST : "ADD_TOAST",
    UPDATE_TOAST : "UPDATE_TOAST",
    DISMISS_TOAST : "DISMISS_TOAST",
    REMOVE_TOAST : "REMOVE_TOAST",
};

const toastTimeouts = new Map();
let memoryState = {toast : []};
const listeners = [];

function dispatch(action){
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener) => listener(memoryState));
}

function addToRemoveQueue(toastId){
    if(toastTimeouts.has(toastId)) return;

    const timeOut = setTimeOut(() => {
        toastTimeouts.delete(toastId);
        dispatch({type: "REMOVE_TOAST", toastId});
    }, TOAST_REMOVE_DELAY);

    toastTimeouts.set(toastId, timeOut);
}

function reducer(state, action){
    switch(action.type){
        case "ADD_TOAST":
            return {...state, toasts: [action.toast, ...state.toasts].slice(0, TOTAL_LIMIT)};
        
        case "UPDATE_TOAST":
            return {...state, toasts: state.toasts.map((t) => (t.id === action.toast.id ? {...t, ...action.toast}: t)),};
        
        case "DISMISS_TOAST":
            if(action.toastId) addToRemoveQueue(action.toastId);
            else state.toasts.forEach((t) => addToRemoveQueue(t.id));
            return {...state, toasts: state.toasts.map((t) => t.id === action.toastId || action.toastId === undefined ? {...t, open:false}: t),};

        case "REMOVE_TOAST":
            if(action.toastId === undefined) return {...state, toasts: []};
            return {...state, toasts: state.toasts.filter((t) => t.id != action.toastId) };
        
        default:
            return state;
    }
}

export function toast(props) {
  const id = genId();
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

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}