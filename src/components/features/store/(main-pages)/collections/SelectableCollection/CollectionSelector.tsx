"use client";

import React, { useMemo } from "react";
import SelectableCard from "@/components/ui/SelectableCard";
import { useCollectionsSelection } from "./CollectionsSelectionContext";
import CollectionCard from "../CollectionCard";

type Collection = Record<string, any>;

type Props = {
  collection: Collection;
  disableSelect?: boolean;
};

const CollectionSelector: React.FC<Props> = ({
  collection,
  disableSelect,
}) => {
  const { selectedCollections, addCollection, removeCollection } =
    useCollectionsSelection();

  const isCollectionSelected = useMemo(() => {
    return selectedCollections.some(
      (p: any) => p.id === collection.id && !p.variants?.length
    );
  }, [selectedCollections, collection.id]);

  const handleCollectionSelect = (selected: boolean) => {
    if (selected) {
      removeCollection(collection.id);
      addCollection(collection);
    } else {
      removeCollection(collection.id);
    }
  };

  const getSelectedCollectionIds = () => (isCollectionSelected ? [collection.id] : []);

  const collectionWrapper = (
    <SelectableCard
      id={collection.id}
      selectedIds={getSelectedCollectionIds()}
      onSelectionChange={(id, isSelected) => handleCollectionSelect(isSelected)}
      disabled={disableSelect}
    />
  );

  return (
    <CollectionCard
      collection={collection}
      wrapper={collectionWrapper}
      onEdit={() => {}}
    />
  );
};

export default CollectionSelector;