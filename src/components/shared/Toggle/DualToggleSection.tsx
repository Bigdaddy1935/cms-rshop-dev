"use client";

import { FC } from "react";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";

type Props = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  mode2Title: string;
  mode2Subtitle?: string;
  mode2Children?: React.ReactNode;
  value: boolean;
  onChange: (val: boolean) => void;
};

const DualToggleSection: FC<Props> = ({
  value,
  onChange,

  title,
  subtitle,
  children,

  mode2Title,
  mode2Subtitle,
  mode2Children,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <ToggleSection
        title={title}
        subtitle={subtitle}
        initialMode={value === true}
        hideChildrenWhenEnabled={false}
        onChange={(newVal: any) => {
          onChange(newVal);
        }}
      >
        {children}
      </ToggleSection>

      <ToggleSection
        title={mode2Title}
        subtitle={mode2Subtitle}
        initialMode={value === false}
        hideChildrenWhenEnabled={false}
        onChange={(newVal: any) => {
          onChange(!newVal);
        }}
      >
        {mode2Children}
      </ToggleSection>
    </div>
  );
};

export default DualToggleSection;