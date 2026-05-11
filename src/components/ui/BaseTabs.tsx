"use client";

import React, { useEffect } from "react";
import { Tabs, Tab } from "@heroui/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import EmptyStateCard from "../feedback/EmptyStateCard";

export type BaseTabItem = {
  key: string | number;
  title: React.ReactNode | string;
  content: React.ReactNode;
  showEmpty?: boolean;
};

export type BaseTabsProps = {
  items: BaseTabItem[];
  activeKey?: string | number;
  onTabChange?: (key: string | number) => void;
  variant?: "solid" | "light" | "underlined" | "bordered";
  fullWidth?: boolean;
  tabListClassName?: string;
  className?: string;
  disableTabs?: boolean;
  syncWithQuery?: boolean;
  queryKey?: string;
};

const BaseTabs: React.FC<BaseTabsProps> = ({
  items,
  activeKey="coupon",
  onTabChange,
  variant = "solid",
  fullWidth = true,
  tabListClassName = "",
  className = "",
  disableTabs = false,
  syncWithQuery = false,
  queryKey = "tab",
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return
    handleTabChange(searchParams.get(queryKey) ?? String(activeKey));
  }, [searchParams])

  const handleTabChange = (key: string | number) => {
    if (disableTabs) return;

    onTabChange?.(key);

    if (syncWithQuery && queryKey) {
      const params = new URLSearchParams(searchParams.toString());
      params.set(queryKey, String(key));      
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    }
  };

  return (
    <Tabs
      aria-label="base-tabs"
      variant={variant}
      fullWidth={fullWidth}
      classNames={{ tabList: tabListClassName }}
      selectedKey={activeKey}
      onSelectionChange={(key) => 
        handleTabChange(key)
      }
      className={className}
    >
      {items.map((tab) => (
        <Tab
          key={tab.key}
          title={tab.title}
          disabled={disableTabs}
        >
          {tab.showEmpty ? <EmptyStateCard /> : tab.content}
        </Tab>
      ))}
    </Tabs>
  );
};

export default BaseTabs;
