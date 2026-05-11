"use client";

import Link from "next/link";

type Props = {
  title: string;
  routeName: string;
  icon: React.ReactNode;
  parentStyle?: string;
  titleStyle?: string;
  color?: string;
};

const BoxLink = ({
  title,
  routeName,
  icon,
  parentStyle,
  titleStyle,
  color,
}: Props) => {
  return (
    <div>
      <Link
        href={`/admin/${routeName}`}
        className={`w-24 h-24 flex flex-col gap-1.5 items-center mx-auto text-md px-2 py-3 hover:opacity-70 rounded-2xl transition ${color} ${parentStyle}`}
      >
        <div className="relative">
          <div
            className={`absolute top-3 -left-3 w-[40px] h-[40px] rounded-full bg-gray-400/10`}
          ></div>
        </div>
        {icon}
        <span
          className={`px-2 truncate pt-1 text-gray-600 ${color} ${titleStyle}`}
        >
          {title}
        </span>
      </Link>
    </div>
  );
};

export default BoxLink;
