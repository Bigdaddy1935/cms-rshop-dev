"use client";

import React, { useState } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Listbox,
  ListboxItem,
} from "@heroui/react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export type PopoverSelectItem = {
  key: string;
  title: string;
};

type PopoverSelectProps = {
  items: PopoverSelectItem[];
  initialKey?: string;
  onSelect?: (key: string) => void;
  buttonClassName?: string;
  popoverClassName?: string;
  isLoading?: boolean;
  buttonProps?: React.ComponentProps<typeof Button>;
};

const PopoverSelect: React.FC<PopoverSelectProps> = ({
  items,
  initialKey,
  onSelect,
  buttonClassName = "capitalize w-full xs:w-fit text-sm",
  popoverClassName = "w-[240px]",
  isLoading = false,
  buttonProps = {},
}) => {
  const defaultItem = items.find((i) => i.key === initialKey) ?? items[0];
  const [selectedItem, setSelectedItem] = useState(defaultItem);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (key: string) => {
    const next = items.find((i) => i.key === key) ?? selectedItem;
    setSelectedItem(next);
    setIsOpen(false);
    onSelect?.(next.key);
  };

  return (
    <Popover
      showArrow
      backdrop="opaque"
      offset={10}
      placement="bottom"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      onClick={(e) => {
        e.stopPropagation();
        e.stopPropagation();
      }}
    >
      <PopoverTrigger>
        <Button
          {...buttonProps}
          variant="bordered"
          size="sm"
          className={`border-1 border-slate-200 shadow ${buttonClassName}`}
          isLoading={isLoading}
          onClick={(e: any) => {
            e.preventDefault();
            e.stopPropagation(); // جلوی ریدایرکت کارت
          }}
        >
          <span className="truncate">{selectedItem.title}</span>
          <MdOutlineKeyboardArrowDown className="text-lg" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={popoverClassName}>
        <div className="px-1 py-2 w-full">
          <Listbox
            items={items}
            selectedKeys={[selectedItem.key]}
            onAction={(key) => handleSelect(String(key))}
          >
            {(item) => (
              <ListboxItem
                key={item.key}
                onClick={(e) => e.stopPropagation()} // جلوی bubble روی لیست آیتم
              >
                {item.title}
              </ListboxItem>
            )}
          </Listbox>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverSelect;
