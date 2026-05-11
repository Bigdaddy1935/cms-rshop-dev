"use client";

import { Chip } from "@heroui/react";
import { RiImageAddLine } from "react-icons/ri";
import FieldErrorText from "../forms/FieldErrorText";
import { useImageUploader } from "@/core/hooks/common/useImageUploader";

type Props = {
  title?: string;
  textBtn?: string;
  onFile: (file: File) => void;
  changeStatusFile?: any;
  sizeText?: string;
  defaultImg?: File | string | null;
  errorMessage?: string;
};

const ImageBoxUploader: React.FC<Props> = ({
  textBtn = "+ افزودن تصویر",
  title,
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
    <div className="w-full">
      <p className="text-slate-700 mb-3.5">{title}</p>
      <div
        className={`w-full flex items-center gap-4 rounded-xl p-2 border-1.5 ${
          errorMessage?.length ? "border border-red-300" : "border-slate-300"
        }`}
      >
        {/* Upload Box */}
        <div
          className="w-[85px] h-[85px] border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-gray-400 transition"
          onClick={handleImageClick}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          <div className="w-full h-full flex items-center justify-center">
            {imageFile ? (
              <img
                src={
                  typeof imageFile === "object"
                    ? URL.createObjectURL(imageFile)
                    : imageFile
                }
                alt="preview"
                className="rounded-xl w-full h-full object-cover transition hover:scale-110"
              />
            ) : (
              <RiImageAddLine className="text-4xl text-gray-500" />
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-1 text-[12px] text-gray-600 leading-5">
          <div>
            فرمت تصویر:
            <Chip
              className="bg-primary-light text-primary mx-1"
              variant="flat"
              size="sm"
            >
              <small>JPEG</small>
            </Chip>
            <Chip color="success" variant="flat" size="sm" className="mx-1">
              <small>JPG</small>
            </Chip>
              
            <Chip color="warning" variant="flat" size="sm">
              <small>PNG</small>
            </Chip>
          </div>

          <p>{sizeText ? sizeText : "سایز تصویر: 160x160"}</p>
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

export default ImageBoxUploader;
