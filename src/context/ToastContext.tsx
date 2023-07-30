import { createContext, type PropsWithChildren, useReducer } from "react";
import { toastReducer } from "../reducers/toastReducer";
import ToastsContainer from "~/components/ToastContainer";

interface ContextState {
  toasts: {
    success: (message: string) => void;
    warning: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
    remove: (id: number) => void;
  };
}

const initialContext: ContextState = {
  toasts: {
    success: () => ({}),
    warning: () => ({}),
    error: () => ({}),
    info: () => ({}),
    remove: () => ({}),
  },
};

interface ToastState {
  toasts: {
    id?: number;
    message?: string;
    type?: string;
  }[];
}

const initialState: ToastState = { toasts: [] };

export const Context = createContext<ContextState>(initialContext);

const ToastContext: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const addToast = (type: string, message: string) => {
    const id = Math.floor(Math.random() * 10000000);
    dispatch({ type: "ADD_TOAST", payload: { id, message, type } });
  };

  const remove = (id: number) => {
    dispatch({ type: "DELETE_TOAST", payload: id });
  };

  const success = (message: string) => {
    addToast("success", message);
  };

  const warning = (message: string) => {
    addToast("warning", message);
  };

  const info = (message: string) => {
    addToast("info", message);
  };

  const error = (message: string) => {
    addToast("error", message);
  };

  const value = { success, warning, info, error, remove };

  return (
    <Context.Provider value={{ toasts: value }}>
      <ToastsContainer toasts={state.toasts} />
      {children}
    </Context.Provider>
  );
};

export default ToastContext;
