"use client";

import React, { useEffect } from "react";
import CollectionsModal from "./CollectionsModal";
import { useCollectionsSelection } from "./CollectionsSelectionContext";
import { TbPackages } from "react-icons/tb";
import { AiOutlineCloseCircle } from "react-icons/ai";
import CollectionCard from "../CollectionCard";
import EmptyStateContainer from "@/components/common/EmptyStateContainer";

const InnerCollectionVariantSelectionBox: React.FC<{
  onChange?: (data: any) => void;
  error?: boolean;
}> = ({ onChange, error }) => {
  const { selectedCollections, removeCollection } = useCollectionsSelection();
  const isFirstRender = React.useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const collections = selectedCollections.map((p: any) => ({
      collection_id: p.id,
      variant_ids: p.variants?.map((v: any) => v.id) ?? [],
    }));

    onChange?.(collections);
  }, [selectedCollections]);

  return (
    <EmptyStateContainer
      title="مجموعه های انتخاب‌شده"
      icon={TbPackages}
      initial={selectedCollections}
      modal={<CollectionsModal />}
      error={error}
    >
     {/*  <div className="flex flex-col gap-4">
        {selectedCollections.map((selectedCollection) => (
          <CollectionCard
            key={selectedCollection.id}
            collection={selectedCollection}
            contentCollection={
              <div className="deselect-icon !-mt-8 !-left-4">
                <AiOutlineCloseCircle
                  onClick={() => removeCollection(selectedCollection.id)}
                />
              </div>
            }
          />
        ))}
      </div> */}
    </EmptyStateContainer>
  );
};

type CollectionSelectionBoxProps = {
  onChange?: (data: any) => void;
  error?: boolean;
};

const CollectionSelectionBox: React.FC<CollectionSelectionBoxProps> = ({
  onChange,
  error,
}) => {
  return (
    <InnerCollectionVariantSelectionBox onChange={onChange} error={error} />
  );
};

export default CollectionSelectionBox;
