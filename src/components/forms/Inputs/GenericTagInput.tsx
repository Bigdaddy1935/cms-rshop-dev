"use client";

import { Input, Chip } from "@heroui/react";
import { useId, useState } from "react";

type Props = {
  label?: string;
  placeholder?: string;
  defaultTags?: string[];
  maxTags?: number;
  clearOnAdd?: boolean;
  englishOnly?: boolean;
  onChange?: (tags: string[]) => void;
};

export default function GenericTagInput({
  label = "تگ‌ها",
  placeholder = "تگی بنویس و اینتر بزن",
  defaultTags = [],
  maxTags,
  clearOnAdd = true,
  englishOnly = true,
  onChange,
}: Props) {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState<string[]>(defaultTags);
  const [note, setNote] = useState<string | null>(null);
  const inputId = useId();

  const isEnglish = (str: string) => /^[a-zA-Z0-9]+$/.test(str);

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    if (englishOnly && !isEnglish(trimmed)) {
      setNote(`تگ "${trimmed}" فقط می‌تواند شامل حروف انگلیسی باشد`);
      return;
    }

    if (tags.includes(trimmed)) {
      setNote(`تگ "${trimmed}" قبلاً اضافه شده`);
      return;
    }

    if (maxTags && tags.length >= maxTags) {
      setNote(`حداکثر ${maxTags} تگ مجاز است`);
      return;
    }

    const updated = [...tags, trimmed];
    setTags(updated);
    setInputValue("");
    setNote(null);
    onChange?.(updated);
  };

  const removeTag = (tag: string) => {
    const updated = tags.filter((t) => t !== tag);
    setTags(updated);
    setNote(null);
    onChange?.(updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && inputValue === "" && tags.length) {
      e.preventDefault();
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div className="flex flex-col gap-2" role="list">
      {label && (
        <label htmlFor={inputId} className="text-sm text-gray-600">
          {label}
        </label>
      )}

      <Input
        id={inputId}
        value={inputValue}
        onValueChange={setInputValue}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full"
      />

      {note && <p className="text-xs text-red-500">{note}</p>}

      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <Chip
            key={tag}
            onClose={() => removeTag(tag)}
            variant="flat"
            color="default"
            className="bg-gray-200"
            role="listitem"
          >
            {tag}
          </Chip>
        ))}
      </div>

      {tags.length > 0 && (
        <p className="text-xs text-gray-500">
          می‌توانید با Backspace آخرین تگ را حذف کنید
        </p>
      )}
    </div>
  );
}
