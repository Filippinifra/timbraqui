import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

export type ToastVariant = "error" | "success";

export interface Toast {
  message: string | ReactNode;
  id: string;
  variant: ToastVariant;
}

export type ShowToast = (
  variant: ToastVariant,
  message?: string | ReactNode
) => void;

export interface ToastInterface {
  toasts: Toast[];
  showToast: ShowToast;
}

export const ToastContext = createContext<ToastInterface>({
  toasts: [],
  showToast: () => {},
});

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (
      variant: ToastVariant,
      message?: string | ReactNode,
      fullScreen?: boolean
    ) => {
      const id = uuidv4();

      const defaultMessage = variant === "error" ? "Errore" : "Successo";
      const newToast = {
        message: message || defaultMessage,
        id,
        variant,
        fullScreen,
      };

      setToasts((state) => {
        return [...state, newToast];
      });

      setTimeout(() => {
        setToasts((state) => state.filter(({ id: toastId }) => toastId !== id));
      }, 4000);
    },
    []
  );

  useEffect(() => {
    if (toasts.length > 3) {
      setToasts((toasts) => toasts.slice(1, toasts.length));
    }
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ toasts, showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
