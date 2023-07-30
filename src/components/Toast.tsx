import {
  BsFillCheckCircleFill,
  BsFillExclamationCircleFill,
  BsFillXCircleFill,
  BsFillInfoCircleFill,
  BsX,
} from "react-icons/bs";
import { useEffect, useRef, useCallback } from "react";
import { useToast } from "~/hooks/useToast ";
import { type ReactNode } from "react";

interface ToastType {
  icon: ReactNode;
  iconClass: string;
  progressBarClass: string;
}

interface ToastTypes {
  [key: string]: ToastType;
}

const toastTypes: ToastTypes = {
  success: {
    icon: <BsFillCheckCircleFill />,
    iconClass: "text-green-700",
    progressBarClass: "bg-green-700",
  },
  warning: {
    icon: <BsFillExclamationCircleFill />,
    iconClass: "text-yellow-700",
    progressBarClass: "bg-yellow-700",
  },
  info: {
    icon: <BsFillInfoCircleFill />,
    iconClass: "text-blue-700",
    progressBarClass: "bg-blue-700",
  },
  error: {
    icon: <BsFillXCircleFill />,
    iconClass: "text-red-700",
    progressBarClass: "bg-red-700",
  },
};

interface ToastProps {
  message: string;
  type: string;
  id: number;
}

const Toast: React.FC<ToastProps> = ({ message, type, id }) => {
  const toast = useToast();
  const timerID = useRef();

  const toastTypeCase = toastTypes[type];

  const handleDismiss = useCallback(() => {
    toast.remove(id);
  }, [toast, id]);

  useEffect(() => {
    timerID.current = setTimeout(() => {
      handleDismiss();
    }, 4000);

    return () => {
      clearTimeout(timerID.current);
    };
  }, [handleDismiss]);

  if (!toastTypeCase) {
    return null;
  }

  const { icon, iconClass, progressBarClass } = toastTypeCase;

  return (
    <div className="relative flex w-[320px] items-center overflow-hidden rounded-sm bg-white	p-[16px]">
      <span className={iconClass}>{icon}</span>
      <p className="ml-[12px]">{message}</p>
      <button
        className="ml-auto cursor-pointer	border-0	bg-none"
        onClick={handleDismiss}
      >
        <BsX size={18} color="#aeb0d7" />
      </button>
      <div className="absolute bottom-0 left-0 h-[4px] w-full bg-white/10">
        <div className={`h-full animate-progressBar ${progressBarClass}`}></div>
      </div>
    </div>
  );
};

export default Toast;
