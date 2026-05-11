"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import FieldErrorText from "../forms/FieldErrorText";

interface Props {
  value: string;
  onChange: (content: string) => void;
  label: string;
  errorMessage?: string;
}

export default function TextEditor({
  value,
  onChange,
  label,
  errorMessage,
}: Props) {
  const editorRef = useRef<any>(null);

  return (
    <div>
      <p className="mb-2.5">{label}</p>
      <div className={errorMessage?.length ? "border-1.5 border-red-300 rounded-xl" : ""}>
        <Editor
          value={value}
          onEditorChange={(content: any) => {
            onChange(content);
          }}
          tinymceScriptSrc="/tinymce/tinymce/tinymce.min.js"
          init={{
            language: "fa",
            height: 700,
            directionality: "rtl",
            content_style: `
            @font-face {
              font-family: IRANSans;
              src: url('/fonts/IRANSans/IRANSansWeb.woff');
            }
            body {
              direction: rtl;
              text-align: right;
              font-family: IRANSans;
              font-size: 16px;
              line-height: 2;
            }
          `,
            plugins: ["lists", "link", "image", "code", "table"],
            toolbar:
              "undo redo | formatselect | bold italic underline | " +
              "alignleft aligncenter alignright alignjustify | " +
              "bullist numlist outdent indent | link image | code",

            automatic_uploads: true,
            images_upload_handler: (blobInfo: any) =>
              new Promise((resolve) => {
                const base64 = blobInfo.base64();
                const mime = blobInfo.blob().type;
                const dataUrl = `data:${mime};base64,${base64}`;
                resolve(dataUrl);
              }),

            image_title: true,
            file_picker_types: "image",
            file_picker_callback: (cb: any) => {
              const input = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");

              input.onchange = () => {
                const file = input.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = () => {
                  const base64 = reader.result as string;
                  cb(base64, { title: file.name });
                };
                reader.readAsDataURL(file);
              };

              input.click();
            },
          }}
        />
      </div>
      <div className="mt-3">
        {errorMessage?.length ? <FieldErrorText error={errorMessage} /> : ""}
      </div>
    </div>
  );
}
