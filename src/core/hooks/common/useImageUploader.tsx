"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { compressImageFile } from "@/utils/compressImageFile";

type UseImageUploaderProps = {
  onFile: (file: File) => void;
  changeStatusFile?: any;
  defaultImg?: File | string | null;
};

export const useImageUploader = ({
  onFile,
  changeStatusFile,
  defaultImg,
}: UseImageUploaderProps) => {
  const [imageFile, setImageFile] = useState<File | string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (changeStatusFile) setImageFile(changeStatusFile);
    else if (defaultImg) setImageFile(defaultImg);
    else setImageFile(null);
  }, [changeStatusFile, defaultImg]);

  // Materialize blob URL once per File; revoke on cleanup to avoid leaking
  // every preview into the browser's blob store.
  const previewUrl = useMemo(() => {
    if (imageFile && typeof imageFile === "object") {
      return URL.createObjectURL(imageFile);
    }
    return typeof imageFile === "string" ? imageFile : null;
  }, [imageFile]);

  useEffect(() => {
    if (previewUrl && previewUrl.startsWith("blob:")) {
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [previewUrl]);

  const handleImageClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleImageChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const processedFile = await compressImageFile(file);

      setImageFile(processedFile);
      onFile(processedFile);
    },
    [onFile]
  );

  return {
    imageFile,
    previewUrl,
    inputRef,
    handleImageClick,
    handleImageChange,
  };
};