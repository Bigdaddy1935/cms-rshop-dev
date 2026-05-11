"use client";

import React from "react";

type Props = {
  title: string;
  selectedCount?: number;
};

const BulkModalHeader: React.FC<Props> = ({ title, selectedCount = 0 }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">{title}</span>
      <small className="text-default-500">
        {selectedCount > 0
          ? `(${selectedCount} مورد انتخاب شده)`
          : "(موردی انتخاب نشده)"}
      </small>
    </div>
  );
};

export default BulkModalHeader;
