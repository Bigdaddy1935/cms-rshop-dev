"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type Props = {
  title: string;
  routeName: string;
  icon: React.ReactNode;
  parentStyle: string;
  iconStyle: string;
  active: string;
};

const Item = ({ title, routeName, icon, iconStyle, parentStyle, active }: Props) => {
  const pathname = usePathname();
  const isActive = pathname.includes(routeName);

  return (
    <Link
      href={`/admin/${routeName}`}
      className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start text-md px-2 py-2 rounded-2xl lg:rounded-md transition ${parentStyle} ${isActive ? active : ""}`}
    >
      <motion.span
        className={`rounded-md p-1 ${iconStyle}`}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
      >
        {icon}
      </motion.span>
      <motion.span
        className="px-2 mt-2 sm:mt-0"
        initial={{ opacity: 0.85, x: 2 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
      >
        {title}
      </motion.span>
    </Link>
  );
};

export default Item;
