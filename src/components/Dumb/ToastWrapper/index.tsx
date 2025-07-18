import { useToast } from "@/context/ToastContext";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Spacer } from "../Spacer";
import { Toast } from "../Toast";
import { wrapperClass } from "./style.css";

export const ToastContainer = () => {
  const { toasts } = useToast();

  return (
    <div className={wrapperClass}>
      <AnimatePresence>
        {toasts?.map(({ id, message, variant }) => (
          <React.Fragment key={`toast-wrapper-${id}`}>
            <Spacer size={8} />
            <motion.div
              layout
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.5 }}
              id={`toast-${id}`}
            >
              <Toast variant={variant}>{message}</Toast>
            </motion.div>
          </React.Fragment>
        ))}
      </AnimatePresence>
    </div>
  );
};
