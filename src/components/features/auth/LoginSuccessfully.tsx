"use client";

import { motion, AnimatePresence } from "framer-motion";
import { successCheckMotion } from "@/core/motions/authPageVariants";

type LoginSuccessfullyProps = {
  success: boolean;
};

const LoginSuccessfully: React.FC<LoginSuccessfullyProps> = ({
  success = false,
}) => {
  return (
    <AnimatePresence>
      {success && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-white/90 backdrop-blur-xl z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            {...successCheckMotion}
            className="flex flex-col items-center"
          >
            <svg
              width="90"
              height="90"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" stroke="#22c55e" />
              <path d="M8 12l3 3 5-6" stroke="#22c55e" />
            </svg>
            <p className="mt-3 font-semibold text-green-600 text-lg">
              ورود موفقیت‌آمیز!
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginSuccessfully;
