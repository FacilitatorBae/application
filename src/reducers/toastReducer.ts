interface Toast {
  id?: number;
  message?: string;
  type?: string;
}
interface ToastState {
  toasts: {
    id?: number;
    message?: string;
    type?: string;
  }[];
}

type ToastAction =
  | { type: "ADD_TOAST"; payload: Toast }
  | { type: "DELETE_TOAST"; payload: number };

export const toastReducer = (state: ToastState, action: ToastAction) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    case "DELETE_TOAST":
      const updatedToasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
      return {
        ...state,
        toasts: updatedToasts,
      };
    default:
      return state;
  }
};
