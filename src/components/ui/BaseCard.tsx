"use client";

import React from "react";
import { Card, CardBody } from "@heroui/react";
import Link from "next/link";
import CardHeader, { CardHeaderProps } from "../common/Card/CardHeader";

type BaseCardProps = {
  CardHeaderProps?: CardHeaderProps;
  className?: string;
  bodyClassName?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  redirect?: string;
  children: React.ReactNode;
  wrapperContents?: boolean;
  isLoading?: boolean;
};

const BaseCard: React.FC<BaseCardProps> = ({
  className = "",
  bodyClassName = "",
  wrapperContents = false,
  redirect = "",
  onClick,
  children,
  CardHeaderProps,
  isLoading = false,
}) => {
  const CardContent = (
    <Card
      className={`relative overflow-visible shadow !transition-all border border-transparent hover:border-gray-200 duration-300 hover:shadow-none ${className}`}
    >
      {CardHeaderProps && <CardHeader {...CardHeaderProps} />}
      <CardBody
        className={`relative p-2 cursor-pointer overflow-visible text-right ${bodyClassName} ${
          wrapperContents ? "flex flex-col p-4 gap-6" : ""
        } ${isLoading ? "is-loading" : ""}`}
        onClick={(e) => {
          if (onClick) onClick(e);
        }}
      >
        {children}
      </CardBody>
    </Card>
  );

  return redirect ? <Link href={redirect}>{CardContent}</Link> : CardContent;
};

export default BaseCard;
