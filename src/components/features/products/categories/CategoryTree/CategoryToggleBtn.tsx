"use client";

import { BiChevronDown, BiChevronRight } from "react-icons/bi";

type CategoryToggleBtnProps = {
  open: boolean;
  hasChildren: boolean;
  onClick: () => void;
};

const CategoryToggleBtn: React.FC<CategoryToggleBtnProps> = ({
  open,
  hasChildren,
  onClick,
}) => (
  <button
    className="bg-gray-100 rounded-md p-1 cursor-auto"
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    aria-label={open ? "بستن زیرشاخه‌ها" : "باز کردن زیرشاخه‌ها"}
    type="button"
  >
    {hasChildren ? (
      open ? (
        <BiChevronDown
          size={17}
          className="cursor-pointer hover:opacity-70 transition-all"
        />
      ) : (
        <BiChevronRight
          size={17}
          className="cursor-pointer hover:opacity-70 transition-all"
        />
      )
    ) : (
      <BiChevronRight size={17} className="opacity-30 pointer-events-none" />
    )}
  </button>
);

export default CategoryToggleBtn;
