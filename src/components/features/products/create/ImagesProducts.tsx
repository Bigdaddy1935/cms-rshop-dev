"use client";

import { Button, Card, CardBody } from "@heroui/react";
import React, { useEffect, useState } from "react"; // useRef رو اضافه کن
import { useProductUpload } from "@/core/hooks/api/products/useProduct";
import MediaPicker from "@/components/media/uploader/MediaPicker";
import MediaPreview from "@/components/media/uploader/MediaPreview";
import FieldErrorText from "@/components/forms/FieldErrorText";

type Props = {
  onMedia_ids: (medias: number[]) => void;
  onMedia_pinned_id: (id: number | null) => void;
  initialMedias?: any[];
  initialPinnedId?: number | null;
  errorMessage?: string;
};

const ImagesProducts = ({
  onMedia_ids,
  onMedia_pinned_id,
  initialMedias = [],
  initialPinnedId = null,
  errorMessage,
}: Props) => {
  const [medias, setMedias] = useState<File[]>([]);
  const [mediasUrl, setMediasUrl] = useState<any[]>([]);
  const [pinnedId, setPinnedId] = useState<number | null>(null);
  const { mutate: uploadMedias, isPending } = useProductUpload();

  useEffect(() => {
    setPinnedId(initialPinnedId);
  }, [initialPinnedId]);

  useEffect(() => {
    initialMedias.length && setMediasUrl(initialMedias);
  }, [initialMedias]);

  useEffect(() => {
    medias.length > 0 && handleUpload();
  }, [medias]);

  const handleUpload = () => {
    const formData = new FormData();
    medias.forEach((file) => formData.append("files", file));

    uploadMedias(formData, {
      onSuccess: (response) => {
        if (response.data) {
          const newMedias = response.data;
          const updatedMedias = [...mediasUrl, ...newMedias];
          setMediasUrl(updatedMedias);

          // فقط اینجا خبر بده (کاربر آپلود کرده)
          onMedia_ids(updatedMedias.map((m) => m.id));

          // اگر هنوز پین نشده، اولین عکس جدید رو پین کن
          if (!pinnedId && newMedias.some((m: any) => m.type === "image")) {
            const firstImageId = newMedias.find(
              (m: any) => m.type === "image"
            )?.id;
            if (firstImageId) {
              setPinnedId(firstImageId);
              onMedia_pinned_id(firstImageId);
            }
          }
        }
        setMedias([]); // پاک کن بعد آپلود
      },
    });
  };

  const handleRemove = (id: number) => {
    const updated = mediasUrl.filter((m) => m.id !== id);
    setMediasUrl(updated);

    // فقط وقتی کاربر حذف کرد، خبر بده
    onMedia_ids(updated.map((m) => m.id));

    if (id === pinnedId) {
      const firstImage = updated.find((m) => m.type === "image");
      const newPinnedId = firstImage ? firstImage.id : null;
      setPinnedId(newPinnedId);
      onMedia_pinned_id(newPinnedId);
    }
  };

  const handlePin = (id: number) => {
    setPinnedId(id);
    // فقط وقتی کاربر پین کرد، خبر بده
    onMedia_pinned_id(id);
  };

  return (
    <Card className="w-full shadow-none rounded-none">
      <CardBody className="px-0 py-1">
        <div
          className={`p-4 rounded-lg ${
            errorMessage
              ? "border-1.5 border-red-300"
              : "border border-slate-200"
          }`}
        >
          {mediasUrl.length > 0 && (
            <MediaPreview
              items={mediasUrl}
              pinnedId={pinnedId}
              onItemPinned={handlePin}
              onRemove={handleRemove}
            />
          )}

          <MediaPicker onSelect={(files) => setMedias(files)} />

          {isPending && (
            <Button
              isLoading
              variant="flat"
              color="secondary"
              className="w-full mt-4"
            >
              در حال بارگذاری...
            </Button>
          )}
        </div>

        {errorMessage && (
          <div className="text-right mt-2">
            <FieldErrorText error={errorMessage} />
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default ImagesProducts;
