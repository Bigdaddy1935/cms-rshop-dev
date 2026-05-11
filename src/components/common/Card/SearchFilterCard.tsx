"use client";

import { Card, CardBody } from "@heroui/react";
import React from "react";
import DebouncedSearchURL from "@/components/forms/Inputs/DebouncedSearchInput";
import OptionButton from "@/components/ui/buttons/OptionButton";

type RelatedPage = {
  title: string;
  href: string;
};

export type SearchFilterCardProps = {
  relatedTitle?: string;
  relatedPages?: RelatedPage[];
  searchPlaceholder?: string;
  children?: React.ReactNode;
  showSearchBar?: boolean;
  disableWrapperStyle?: boolean;
};

const SearchFilterCard: React.FC<SearchFilterCardProps> = ({
  relatedTitle = "دسترسی سریع",
  relatedPages = [],
  searchPlaceholder = "جستجو...",
  children,
  showSearchBar = false,
  disableWrapperStyle,
}) => {
  return (
    <Card className={`shadow-md ${disableWrapperStyle ? "shadow-none bg-slate-50 rounded-md" : ""}`}>
      <CardBody className={`flex flex-col gap-4 ${disableWrapperStyle ? "p-0" : ""}`}>
        {relatedPages.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 gap-4 text-start rounded-xl p-2">
            <p className="pr-2 hidden md:flex">{relatedTitle}</p>
            <div className="flex flex-wrap xs:flex-nowrap w-full sm:w-fit">
              {relatedPages.map((page, index) => (
                <OptionButton
                  key={page.href}
                  title={page.title}
                  href={page.href}
                  className={`w-full sm:w-fit rounded-sm border-slate-300 text-gray-700 ${index === relatedPages.length - 1 ? "" : "border-l pl-4"}`}
                  variant="light"
                />
              ))}
            </div>
          </div>
        )}
        {showSearchBar || children ? (
          <div className="flex flex-col sm:flex-row items-center gap-2">
            {showSearchBar && (
              <DebouncedSearchURL placeholder={searchPlaceholder} />
            )}
            <div className="w-full sm:w-fit flex items-center gap-2">
              {children}
            </div>
          </div>
        ) : (
          ""
        )}
      </CardBody>
    </Card>
  );
};

export default SearchFilterCard;
