import Toast from "./Toast";

const ToastsContainer = ({ toasts }) => {
  return (
    <div className="fixed bottom-[16px] right-[16px] z-[9999] flex flex-col-reverse gap-y-[12px]">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastsContainer;
