"use client";

import AddNewAttributeGroupModal from "./AddNewAttributeGroupModal";
import { useDeleteAttributeGroup } from "@/core/hooks/api/attributes/useAttributeGroup";
import AttributeBox from "../AttributeBox";
import { useAttributeContext } from "../../context/AttributeContext";

type Props = {
  isDisabledEdit: boolean;
};

const AddNewAttrGroup: React.FC<Props> = ({ isDisabledEdit }) => {
  const { setSelecteds, attrs } = useAttributeContext();
  const { mutate: deleteAttributeGroup } = useDeleteAttributeGroup();

  const handleDeleteAttrGroup = (id: number) => {
    deleteAttributeGroup(+id, {
      onSuccess: () => setSelectedAttrGroupId(undefined),
    });
  };

  const setSelectedAttrGroupId = (id: number | undefined) => {
    setSelecteds({
      attrGroupId: id,
      attrId: undefined,
      valueIds: [],
    });
  };

  return (
    <AttributeBox
      attr={attrs.attrGroup}
      addBtn={<AddNewAttributeGroupModal />}
      onChoose={setSelectedAttrGroupId}
      deleteAttr={handleDeleteAttrGroup}
      placeholderInput="جستجو گروه ویژگی..."
    >
      <AddNewAttributeGroupModal type="edit" />
    </AttributeBox>
  );
};

export default AddNewAttrGroup;
