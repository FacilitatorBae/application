import { BsGift, BsTruck, BsMegaphone } from "react-icons/bs";

const toastTypes = {
  success: {
    icon: <BsGift />,
    iconClass: "success-icon",
    progressBarClass: "success",
  },
  warning: {
    icon: <BsTruck />,
    iconClass: "warning-icon",
    progressBarClass: "warning",
  },
  info: {
    icon: <BsMegaphone />,
    iconClass: "info-icon",
    progressBarClass: "info",
  },
  error: {
    icon: <BsMegaphone />,
    iconClass: "error-icon",
    progressBarClass: "error",
  },
};

const Toast = ({ message, type, id }) => {
  const { icon, iconClass, progressBarClass } = toastTypes[type];

  return (
    <div className="toast">
      <span className={iconClass}>{icon}</span>
      <p className="toast-message">{message}</p>
      <button className="dismiss-btn">
        <BsMegaphone size={18} color="#aeb0d7" />
      </button>
    </div>
  );
};

export default Toast;
