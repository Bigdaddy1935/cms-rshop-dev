"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Collection = Record<string, any>;

type CollectionsSelectionContextType = {
  selectedCollections: Collection[];
  addCollection: (collection: Collection) => void;
  removeCollection: (collectionId: number) => void;
  setSelectedCollections: React.Dispatch<React.SetStateAction<Collection[]>>;
};

const CollectionsSelectionContext =
  createContext<CollectionsSelectionContextType | null>(null);

export const useCollectionsSelection = () => {
  const ctx = useContext(CollectionsSelectionContext);
  if (!ctx)
    throw new Error(
      "useCollectionsSelection must be used within CollectionsSelectionProvider"
    );
  return ctx;
};

export const CollectionsSelectionProvider: React.FC<{
  initialCollections?: Collection[];
  children: React.ReactNode;
}> = ({ initialCollections = [], children }) => {
  const [selectedCollections, setSelectedCollections] = useState<Collection[]>([]);

  useEffect(() => {
    initialCollections.length && setSelectedCollections(initialCollections);
  }, [initialCollections]);

  const addCollection = (collection: Collection) => {
    setSelectedCollections((prev) => {
      const filtered = prev.filter((p: any) => p.id !== collection.id);
      return [...filtered, collection];
    });
  };

  const removeCollection = (collectionId: number) => {
    setSelectedCollections((prev) =>
      prev.filter((p: any) => p.id !== collectionId)
    );
  };

  return (
    <CollectionsSelectionContext.Provider
      value={{
        selectedCollections,
        addCollection,
        removeCollection,
        setSelectedCollections,
      }}
    >
      {children}
    </CollectionsSelectionContext.Provider>
  );
};
