"use client";

import { Input } from "@heroui/react";
import { FiSearch } from "react-icons/fi";
import { useDebouncedUrlSearch } from "@/core/hooks/common/useDebouncedUrlSearch";

type Props = {
  placeholder: string;
};

const DebouncedSearchURL: React.FC<Props> = ({ placeholder }) => {
  const { value, setValue } = useDebouncedUrlSearch("search", 500);

  return (
    <Input
      dir="rtl"
      labelPlacement="outside"
      startContent={<FiSearch className="text-lg pointer-events-none text-slate-700" />}
      placeholder={placeholder}
      classNames={{
        inputWrapper: "bg-transparent !bg-transparent shadow-none !border-none",
        input: "placeholder:!text-[13px]"
      }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue("")}
    />
  );
};

export default DebouncedSearchURL;
