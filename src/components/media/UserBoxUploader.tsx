"use client";

import { Chip } from "@heroui/react";
import { RiImageAddLine } from "react-icons/ri";
import FieldErrorText from "../forms/FieldErrorText";
import { useImageUploader } from "@/core/hooks/common/useImageUploader";
import { HiOutlineUser } from "react-icons/hi2";

type Props = {
  onFile: (file: File) => void;
  changeStatusFile?: any;
  sizeText?: string;
  defaultImg?: File | string | null;
  errorMessage?: string;
};

const UserBoxUploader: React.FC<Props> = ({
  onFile,
  changeStatusFile,
  sizeText,
  defaultImg,
  errorMessage,
}) => {
  const { imageFile, inputRef, handleImageClick, handleImageChange } =
    useImageUploader({
      onFile,
      changeStatusFile,
      defaultImg,
    });

  return (
    <div>
      {/* Upload Box */}
      <div
        className="w-[145px] h-[145px] group border-2 border-dashed overflow-hidden border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:border-gray-400 transition"
        onClick={handleImageClick}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        <div className="w-full h-full flex items-center justify-center rounded-full">
          {imageFile ? (
            <img
              src={
                typeof imageFile === "object"
                  ? URL.createObjectURL(imageFile)
                  : imageFile
              }
              alt="preview"
              className="w-full h-full object-cover group-hover:scale-125 transition-all"
            />
          ) : (
            <HiOutlineUser className="text-4xl text-gray-500" />
          )}
        </div>
      </div>

      {errorMessage?.length ? (
        <div className="mt-2">
          <FieldErrorText error={errorMessage} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserBoxUploader;
