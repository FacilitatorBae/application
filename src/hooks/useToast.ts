import { useContext } from "react";
import { Context } from "../context/ToastContext";

export const useToast = () => {
  const { toasts } = useContext(Context);

  return toasts;
};
