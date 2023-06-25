import React from "react";
import useEscapeKey from "../useEscapeKey/useEscapeKey";

export const ToastContext = React.createContext();
const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastProvider({ children }) {
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  const [message, setMessage] = React.useState("");
  const [toasts, setToasts] = React.useState([]);

  const createToast = React.useCallback(
    (message, variant) => {
      const newToast = { id: crypto.randomUUID(), message, variant };
      const nextToasts = [...toasts, newToast];
      setToasts(nextToasts);
    },
    [toasts]
  );

  const handleDeleteToast = React.useCallback(
    (id) => {
      const nextToasts = toasts.filter((t) => t.id !== id);
      setToasts(nextToasts);
    },
    [toasts]
  );

  const value = React.useMemo(() => {
    return {
      variant,
      setVariant,
      message,
      setMessage,
      toasts,
      setToasts,
      createToast,
      handleDeleteToast,
    };
  }, [variant, message, toasts, createToast, handleDeleteToast]);

  useEscapeKey(() => {
    setToasts([]);
  });

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
