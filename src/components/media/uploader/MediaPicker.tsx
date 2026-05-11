"use client";

import React, { useRef } from "react";
import { LuImagePlus } from "react-icons/lu";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import toast from "react-hot-toast";
import OptionButton from "@/components/ui/buttons/OptionButton";
import { compressImageFile } from "@/utils/compressImageFile";

interface Props {
  onSelect: (files: File[]) => void;
}

const MediaPicker: React.FC<Props> = ({ onSelect }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const currentType = useRef<"image" | "video">("image");

  const handlePick = (type: "image" | "video") => {
    if (!inputRef.current) return;

    currentType.current = type;
    inputRef.current.accept =
      type === "image" ? ".jpg,.jpeg,.png,.webp" : ".mp4";
    inputRef.current.multiple = type === "image";
    inputRef.current.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const type = currentType.current;
    const maxFiles = type === "image" ? 10 : 5;
    const maxSize = type === "image" ? 100 * 1024 : 50 * 1024 * 1024;

    if (files.length > maxFiles) {
      toast.error(
        `حداکثر ${maxFiles} ${type === "image" ? "تصویر" : "ویدیو"} میتوانید همزمان انتخاب کنید`
      );
      e.target.value = "";
      return;
    }

    if (type === "video") {
      const validVideos = files.filter((file) => {
        if (file.size > maxSize) {
          toast.error(`حجم فایل "${file.name}" بیشتر از حد مجاز است`);
          return false;
        }
        return true;
      });

      if (validVideos.length) onSelect(validVideos);
      e.target.value = "";
      return;
    }

    // image mode: compress all images
    const processedImages = await Promise.all(
      files.map(async (file) => {
        if (file.size > maxSize || file.type !== "image/webp") {
          return await compressImageFile(file);
        }
        return file;
      })
    );

    const validImages = processedImages.filter((file) => {
      if (file.size > maxSize) {
        toast.error(`حجم فایل "${file.name}" بعد از فشرده‌سازی هنوز زیاد است`);
        return false;
      }
      return true;
    });

    if (validImages.length) onSelect(validImages);
    e.target.value = "";
  };

  return (
    <>
      <input ref={inputRef} type="file" hidden onChange={handleChange} />
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-0 items-center justify-between">
        <div className="text-right">
          <p className="text-gray-600">افزودن تصویر و ویدیو</p>
          <div className="w-full flex items-center mt-2">
            <p className="text-[11px] text-orange-700 animate-pulse">
              حداکثر حجم فایل تصویر 100KB و ویدئو 50MB است. برای هر محصول 20 تصویر
              و 5 ویدئو میتوانید بارگذاری کنید.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-fit flex gap-2">
          <OptionButton
            size="sm"
            className="w-full"
            icon={<LuImagePlus className="text-xl" />}
            title=""
            onClick={() => handlePick("image")}
          />

          <OptionButton
            size="sm"
            className="w-full"
            icon={<AiOutlineVideoCameraAdd className="text-xl" />}
            title=""
            onClick={() => handlePick("video")}
          />
        </div>
      </div>
    </>
  );
};

export default MediaPicker;