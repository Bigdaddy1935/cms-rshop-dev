"use client";

import { useEffect, useRef } from "react";
import IconCard from "../IconCard";
import IconsSelectionModal from "./IconsSelectionModal";
import { useIconsSelection } from "./IconsSelectionContext";
import { TbIcons } from "react-icons/tb";
import EmptyStateContainer from "@/components/common/EmptyStateContainer";

type Props = {
  onChange?: (iconIds: number[]) => void;
  initialIcons?: any[];
  error?: boolean;
  classNameIconsWrapper?: string;
};

const InnerSelectableIconsBox: React.FC<{
  onChange?: (ids: number[]) => void;
  error?: boolean;
  classNameIconsWrapper?: string;
}> = ({ onChange, error, classNameIconsWrapper }) => {
  const { selectedIcons, removeIcon } = useIconsSelection();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    onChange?.(selectedIcons.map((u) => u.id));
  }, [selectedIcons]);

  return (
    <EmptyStateContainer
      title="آیکون های انتخاب شده"
      icon={TbIcons}
      initial={selectedIcons}
      modal={<IconsSelectionModal />}
      error={error}
    >
      <div
        className={`grid grid-cols-1 phone:grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-2 ${classNameIconsWrapper}`}
      >
        {selectedIcons?.map((icon: any) => (
          <IconCard
            key={icon?.id}
            showDeselectIcon
            disableAction
            icon={icon}
            onDelete={removeIcon}
          />
        ))}
      </div>
    </EmptyStateContainer>
  );
};

const SelectableIconsBox: React.FC<Props> = ({
  onChange,
  error,
  classNameIconsWrapper,
}) => {
  return (
    <InnerSelectableIconsBox
      onChange={onChange}
      error={error}
      classNameIconsWrapper={classNameIconsWrapper}
    />
  );
};

export default SelectableIconsBox;
