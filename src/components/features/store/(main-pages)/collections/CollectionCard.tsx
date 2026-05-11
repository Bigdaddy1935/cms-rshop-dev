"use client";

import React from "react";
import DeleteButton from "@/components/shared/DeleteButton";
import { Image } from "@heroui/react";
import BaseCard from "@/components/ui/BaseCard";
import StatusBadge from "@/components/shared/StatusBadge";
import CountdownTimer from "@/components/shared/CountdownTimer";
import { useDeleteHomeSection } from "@/core/hooks/api/adminHome/useHomeSections";

type CollectionCardProps = {
  collection: any;
  wrapper?: React.ReactNode;
  contentCollection?: React.ReactNode;
  onEdit: () => void;
};

const CollectionCard: React.FC<CollectionCardProps> = ({
  collection,
  wrapper,
  contentCollection,
  onEdit,
}) => {
  const { mutate: deleteHomeSection } = useDeleteHomeSection();

  // بررسی آیا تاریخ پایان در آینده است یا خیر
  const isActive = collection.is_active;
  const isEndDateFuture = new Date(collection.end_date) > new Date();

  const content = (
    <BaseCard
      bodyClassName="p-0 rounded-xl hover-reveal-parent group overflow-hidden"
      onClick={() => !contentCollection && onEdit()}
    >
      {contentCollection}

      {!contentCollection ? (
        <div className="hover-reveal-child">
          <DeleteButton onDelete={() => deleteHomeSection(collection.id)} />
        </div>
      ) : (
        ""
      )}

      <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-2 flex-wrap">
        <StatusBadge isActive={isActive && isEndDateFuture} />
        <p className="text-white bg-slate-600 p-0.5 px-2 rounded-md text-xs">
          محصولات: {collection?.product_ids?.length || "ندارد"}
        </p>
      </div>

      <Image
        alt={collection.slug}
        className="w-full group-hover:scale-105 h-[200px] object-cover rounded-xl select-none"
        draggable={false}
        radius="lg"
        width={"100%"}
        src={collection.image}
      />

      {/* نام و اسلاگ */}
      <div className="absolute text-white inset-0 bg-black/50 z-10 flex flex-col justify-center gap-2">
        <div className="leading-9 pr-6">
          <p className="text-2xl truncate">{collection.title}</p>
          <p className="text-md truncate text-gray-300">
            {collection.description}
          </p>
        </div>
      </div>
      <CountdownTimer
        endDate={collection.end_date}
        className="absolute z-10 bottom-2.5 left-2.5"
      />
    </BaseCard>
  );

  return wrapper
    ? React.cloneElement(wrapper as React.ReactElement, {
        children: content,
      })
    : content;
};

export default CollectionCard;
