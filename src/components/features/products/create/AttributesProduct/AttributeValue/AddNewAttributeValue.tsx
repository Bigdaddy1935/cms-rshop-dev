"use client";

import AddNewAttributeValueModal from "./AddNewAttributeValueModal";
import { useDeleteAttributeValue } from "@/core/hooks/api/attributes/useAttributeValue";
import { useAttributeContext } from "../../context/AttributeContext";
import AttributeBox from "../AttributeBox";

type Props = {
  isDisabledEdit: boolean;
};

const AddNewAttributeValue: React.FC<Props> = ({ isDisabledEdit }) => {
  const { mutate: deleteAttributeValue } = useDeleteAttributeValue();
  const { attrInfos, selecteds, setSelecteds, attrs } = useAttributeContext(); // این خط رو اضافه کردیم
  //
  const handleDelete = (id: number) => {
    deleteAttributeValue(+id, {
      onSuccess: () => {
        setSelecteds((prev) => ({
          ...prev,
          valueIds: prev.valueIds.filter((v) => v !== id),
        }));
      },
    });
  };

  const filteredAttrValues = () => {
    if (!attrInfos.length || !attrs.values?.length) return attrs.values;

    return attrs.values.filter((val: any) => {
      const existVal = attrInfos.find((v: any) => v.id === val.id);
      return !existVal;
    });
  };

  return (
    <>
      {isDisabledEdit ? (
        <AttributeBox
          attr={filteredAttrValues()?.map((v: any) => ({
            id: v.id,
            value: v.value,
            color: v.display_color,
          }))}
          multiSelect
          selectedIds={selecteds.valueIds}
          onChoose={(id) => {
            if (selecteds.valueIds.includes(id)) {
              setSelecteds((prev) => ({
                ...prev,
                valueIds: prev.valueIds.filter((v) => v !== id),
              }));
            } else {
              setSelecteds((prev) => ({
                ...prev,
                valueIds: [...prev.valueIds, id],
              }));
            }
          }}
          deleteAttr={handleDelete}
          addBtn={<AddNewAttributeValueModal />}
          placeholderInput="جستجو مقدار ویژگی..."
        >
          <AddNewAttributeValueModal type="edit" />
        </AttributeBox>
      ) : (
        <AttributeBox
          attr={attrs.values}
          deleteAttr={handleDelete}
          addBtn={<AddNewAttributeValueModal />}
          placeholderInput="جستجو مقدار ویژگی..."
          selectedNone
        >
          <AddNewAttributeValueModal type="edit" />
        </AttributeBox>
      )}
    </>
  );
};

export default AddNewAttributeValue;
