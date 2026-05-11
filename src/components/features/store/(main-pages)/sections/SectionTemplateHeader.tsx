"use client";

import React from "react";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";

type SectionTemplateHeaderProps = {
  title?: string;
  titleCustom?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
  children?: React.ReactNode;
};

const SectionTemplateHeader: React.FC<SectionTemplateHeaderProps> = ({
  title,
  titleCustom,
  showViewAll = false,
  viewAllLink,
  children,
}) => {
  const displayTitle = titleCustom ? titleCustom : title;

  return (
    <div className="flex justify-between items-center mb-2 px-2">
      <h3 className="text-lg font-medium text-gray-900">{displayTitle}</h3>

      <div className="flex items-center gap-6">
        {showViewAll && viewAllLink && (
          <Link
            href={viewAllLink}
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors"
          >
            <p>مشاهده همه</p>
            <MdArrowBack className="text-lg" />
          </Link>
        )}

        {children && (
          <div className="hover-reveal-child !top-0 bg-white w-24 flex items-center justify-end rounded-lg">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionTemplateHeader;
