"use client";

import React, { useState, useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { FiSearch } from "react-icons/fi";
import { useDebouncedUrlSearch } from "@/core/hooks/common/useDebouncedUrlSearch";
import FieldErrorText from "@/components/forms/FieldErrorText";

export type Option = {
  id: string | number;
  title: string;
};

type AutocompleteInputProps = {
  label?: string;
  placeholder?: string;
  options: Option[];
  selectedId?: string | number;
  onChange: (id: string | null) => void;
  isRequired?: boolean;
  className?: string;
  syncSearchToUrl?: boolean;
  searchKey?: string;
  errorMessage?: string;
};

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  label = "",
  placeholder = "انتخاب کنید",
  options,
  selectedId,
  onChange,
  isRequired = false,
  className = "",
  syncSearchToUrl = false,
  searchKey = "search",
  errorMessage = "",
}) => {
  const debounced = useDebouncedUrlSearch(
    syncSearchToUrl ? searchKey : undefined,
    500,
  );

  const [localSearch, setLocalSearch] = useState<string>(debounced.value ?? "");  

  useEffect(() => {
    if (!syncSearchToUrl) return;
    if (!selectedId) setLocalSearch(debounced.value ?? "");
  }, [debounced.value, syncSearchToUrl, selectedId]);

  useEffect(() => {
    if (!selectedId) return;
    const sel = options.find((o) => String(o.id) === String(selectedId));
    if (sel) setLocalSearch(sel.title);
  }, [selectedId, options]);

  const handleInputChange = (val: string) => {
    setLocalSearch(val);

    if (selectedId) {
      onChange(null);
    }

    if (!syncSearchToUrl) return;

    if (!val.trim()) {
      debounced.setValue("");
      return;
    }

    const hasLocalMatch = options.some((o) =>
      o.title.toLowerCase().includes(val.toLowerCase()),
    );

    if (!hasLocalMatch) {
      debounced.setValue(val);
    }
  };

  const handleSelectionChange = (key: React.Key | null) => {
    if (!key) return;
    if (key.toString() === String(selectedId)) return;
    onChange(key.toString());
    const sel = options.find((o) => String(o.id) === String(key));
    if (sel) setLocalSearch(sel.title);
  };

  return (
    <Autocomplete
      label={label}
      placeholder={placeholder}
      variant="flat"
      labelPlacement="outside"
      isRequired={isRequired}
      startContent={<FiSearch className="text-lg pointer-events-none" />}
      className={`w-full ${className} autocomplete-inp`}
      selectedKey={selectedId ? String(selectedId) : undefined}
      onSelectionChange={handleSelectionChange}
      inputValue={localSearch}
      onInputChange={handleInputChange}
      isInvalid={!!errorMessage?.length}
      errorMessage={
        errorMessage?.length ? (
          <FieldErrorText error={errorMessage} />
        ) : undefined
      }
    >
      {options.length ? (
        options.map((opt: any) => (
          <AutocompleteItem key={opt.id} textValue={opt.title}>
            {opt.title}
          </AutocompleteItem>
        ))
      ) : (
        <AutocompleteItem key="empty" isDisabled>
          آیتمی موجود نیست
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default AutocompleteInput;
