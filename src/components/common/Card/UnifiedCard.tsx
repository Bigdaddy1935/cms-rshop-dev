"use client";

import React from "react";
import { Card, CardBody, CardFooter } from "@heroui/react";
import CardHeader, { CardHeaderProps } from "./CardHeader";
import LoadingApiCall from "@/components/feedback/LoadingApiCall";
import BasePagination from "@/components/ui/BasePagination";
import { BiSearchAlt } from "react-icons/bi";
import EmptyStateCard from "@/components/feedback/EmptyStateCard";

export type UnifiedCardProps = {
  headerProps: CardHeaderProps;
  searchFilter?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  isLoading?: boolean;
  meta?: any;
  isExistItems?: boolean;
  searchInp?: boolean;
  childrenClassName?: string;
  disableWrapperStyle?: boolean;
};

const UnifiedCard: React.FC<UnifiedCardProps> = ({
  headerProps,
  searchFilter,
  children,
  footer,
  className = "",
  bodyClassName = "",
  isLoading = false,
  meta,
  isExistItems = true,
  searchInp = false,
  childrenClassName = "",
  disableWrapperStyle = false,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Search / Filter */}
      {searchFilter && searchFilter}

      <Card
        className={`w-full shadow-md ${disableWrapperStyle ? "shadow-none rounded-none" : ""} ${className}`}
      >
        {/* Header */}
        <CardHeader
          {...headerProps}
          className={disableWrapperStyle ? "!p-0 !pb-4 !rounded-none" : ""}
        />

        {/* Body */}
        <CardBody
          dir="rtl"
          className={`flex flex-col gap-6 text-start ${disableWrapperStyle ? "!p-0" : ""} ${bodyClassName}`}
        >
          {/* محتوا یا حالت لودینگ / خالی */}
          {isLoading ? (
            <LoadingApiCall />
          ) : isExistItems ? (
            <div
              className={`flex flex-col justify-center items-center sm:items-stretch gap-4 ${childrenClassName}`}
            >
              {children}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl text-gray-600 gap-2">
              {searchInp ? (
                <EmptyStateCard
                  message="جستجو شما نتیجه ای نداشت!!"
                  icon={BiSearchAlt}
                />
              ) : (
                <EmptyStateCard />
              )}
            </div>
          )}
        </CardBody>

        {/* Footer */}
        {footer && <CardFooter className="pt-4">{footer}</CardFooter>}
      </Card>

      {/* Pagination */}
      {meta && <BasePagination meta={meta} />}
    </div>
  );
};

export default UnifiedCard;
