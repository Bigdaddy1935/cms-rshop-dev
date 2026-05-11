"use client";

import AddNewAttributeModal from "./AddNewAttributeModal";
import { useDeleteAttribute } from "@/core/hooks/api/attributes/useAttribute";
import AttributeBox from "../AttributeBox";
import { useAttributeContext } from "../../context/AttributeContext";

type Props = {
  isDisabledEdit: boolean;
};

const AddNewAttribute: React.FC<Props> = ({ isDisabledEdit }) => {
  const { setSelecteds, attrs } = useAttributeContext();
  const { mutate: deleteAttribute } = useDeleteAttribute();

  const handleDelete = (id: number) => {
    deleteAttribute(id, {
      onSuccess: () => setSelectedAttrId(undefined),
    });
  };

  const setSelectedAttrId = (id: number | undefined) => {
    setSelecteds((prev) => ({ ...prev, attrId: id, valueIds: [] }));
  };

  return (
    <AttributeBox
      attr={attrs.attr}
      deleteAttr={handleDelete}
      onChoose={setSelectedAttrId}
      addBtn={<AddNewAttributeModal />}
      placeholderInput="جستجو ویژگی..."
    >
      <AddNewAttributeModal type="edit" />
    </AttributeBox>
  );
};

export default AddNewAttribute;
