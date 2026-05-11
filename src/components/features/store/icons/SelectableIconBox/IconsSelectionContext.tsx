"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Icon } from "../icon-types";
import toast from "react-hot-toast";

type IconsSelectionContextType = {
  selectedIcons: Icon[];
  addIcon: (icon: Icon) => void;
  removeIcon: (iconId: number) => void;
  setIcons: (icons: Icon[]) => void;
};

const IconsSelectionContext = createContext<IconsSelectionContextType | null>(
  null,
);

export const useIconsSelection = () => {
  const context = useContext(IconsSelectionContext);
  if (!context)
    throw new Error(
      "useIconsSelection must be used within IconsSelectionProvider",
    );
  return context;
};

export const IconsSelectionProvider: React.FC<{
  initialIcons?: Icon[];
  children: React.ReactNode;
  singleSelect?: boolean;
}> = ({ initialIcons = [], children, singleSelect = false }) => {
  const [selectedIcons, setSelectedIcons] = useState<Icon[]>([]);

  useEffect(() => {
    if (initialIcons?.length) {
      setSelectedIcons(initialIcons);
    }
  }, [initialIcons]);

  const addIcon = (icon: Icon) => {
    setSelectedIcons((prev) => {
      if (singleSelect) {
        return [icon];
      }
      const filtered = prev.filter((u) => u.id !== icon.id);
      return [...filtered, icon];
    });
  };

  const removeIcon = (iconId: number) => {
    setSelectedIcons((prev) => prev.filter((u) => u.id !== iconId));
  };

  const setIcons = (icons: Icon[]) => {
    setSelectedIcons(icons);
  };

  return (
    <IconsSelectionContext.Provider
      value={{ selectedIcons, addIcon, removeIcon, setIcons }}
    >
      {children}
    </IconsSelectionContext.Provider>
  );
};
