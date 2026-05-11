"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SelectedAttributeProps = {
  attrGroupId: number | undefined;
  attrId: number | undefined;
  valueIds: number[];
};

type AttrsProps = {
  attrGroup: any[];
  attr: any[];
  values: any[];
};

type AttributeContextType = {
  attrInfos: any[];
  setAttrInfos: React.Dispatch<React.SetStateAction<any[]>>;
  selecteds: SelectedAttributeProps;
  setSelecteds: React.Dispatch<React.SetStateAction<SelectedAttributeProps>>;
  attrs: AttrsProps;
  setAttrs: React.Dispatch<React.SetStateAction<AttrsProps>>;
  setSelectedAttrEdit: React.Dispatch<React.SetStateAction<number | undefined>>;
  selectedAttrEdit: number | undefined;
};

const AttributeContext = createContext<AttributeContextType | undefined>(
  undefined,
);

const initialSelecteds = {
  attrGroupId: undefined,
  attrId: undefined,
  valueIds: [],
};

const initialAttrs: AttrsProps = {
  attrGroup: [],
  attr: [],
  values: [],
};

export const AttributeProvider = ({ children }: { children: ReactNode }) => {
  const [attrInfos, setAttrInfos] = useState<any[]>([]);
  const [selecteds, setSelecteds] =
    useState<SelectedAttributeProps>(initialSelecteds);
  const [attrs, setAttrs] = useState<AttrsProps>(initialAttrs);
  const [selectedAttrEdit, setSelectedAttrEdit] = useState<number | undefined>(
    undefined,
  );

  return (
    <AttributeContext.Provider
      value={{
        attrInfos,
        setAttrInfos,
        selecteds,
        setSelecteds,
        attrs,
        setAttrs,
        selectedAttrEdit,
        setSelectedAttrEdit,
      }}
    >
      {children}
    </AttributeContext.Provider>
  );
};

export const useAttributeContext = () => {
  const ctx = useContext(AttributeContext);
  if (!ctx)
    throw new Error(
      "useAttributeContext must be used within AttributeProvider",
    );
  return ctx;
};
