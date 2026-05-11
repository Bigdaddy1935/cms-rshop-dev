"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type FieldErrorTextProps = {
  error?: string | null;
  className?: string;
};

const FieldErrorText: React.FC<FieldErrorTextProps> = ({
  error,
  className,
}) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {error && (
        <motion.p
          key={error}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`text-xs font-medium text-red-500 mt-1 px-1 animate-pulse ${
            className ?? ""
          }`}
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  );
};

export default FieldErrorText;
