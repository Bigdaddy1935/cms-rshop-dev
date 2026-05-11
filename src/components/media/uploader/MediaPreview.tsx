import React, { useEffect, useState } from "react";
import { LuPin } from "react-icons/lu";

interface Props {
  items: any[];
  onItemPinned: (id: number) => void;
  onRemove: (id: number) => void;
  pinnedId?: number | null;
}

const MediaPreview: React.FC<Props> = ({
  items,
  pinnedId,
  onRemove,
  onItemPinned,
}) => {
  const [imgs, setImgs] = useState<any[]>(items);

  useEffect(() => {
    setImgs(items);
  }, [items]);

  const handlePin = (id: number) => {
    onItemPinned(id);
  };

  const handleRemove = (idx: number) => {
    const updated = imgs.filter((_, i) => i !== idx);
    setImgs(updated);
    onRemove(idx);
  };

  return (
    <div className="w-full grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-4">
      {imgs?.map((item, idx) => {
        const { url, type } = item;

        return (
          <div
            key={idx}
            className="relative mx-auto group w-28 h-28 border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            onClick={() => type === "image" && handlePin(item.id)}
          >
            {type === "image" ? (
              <img
                src={url}
                alt="image-preview"
                className="object-cover w-full h-full cursor-pointer"
              />
            ) : (
              <video
                src={url}
                className="object-cover w-full h-full"
                muted
                controls
              />
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(item.id);
              }}
              className="absolute top-1 right-1 bg-white rounded-full px-1.5 hover:bg-red-200 text-red-500 opacity-0 group-hover:opacity-100 transition"
            >
              ×
            </button>
            {pinnedId === item.id ? (
              <LuPin className="absolute top-1 left-1 -rotate-45 bg-white rounded-md border text-2xl py-0.5" />
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MediaPreview;
