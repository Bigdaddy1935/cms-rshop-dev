"use client";

import { useEffect, useState } from "react";
import SpecialSectionModal from "./SpecialSectionModal";
import AddNewSpecialSection from "./AddNewSpecialSection";
import SectionTemplate from "../../SectionTemplate";
import { ProductsSelectionProvider } from "@/components/features/products/SelectableProduct/ProductsSelectionContext";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { TbEdit } from "react-icons/tb";
import DeleteButton from "@/components/shared/DeleteButton";
import {
  useDeleteHomeSection,
  useUpdateSectionOrder,
} from "@/core/hooks/api/adminHome/useHomeSections";
import { handleDropHelper } from "@/core/utils/handleDropHelper";

type PopularSectionContainerProps = {
  specialProducts: any;
};

const SpecialSectionContainer: React.FC<PopularSectionContainerProps> = ({
  specialProducts,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editSection, setEditSection] = useState<any>(null);
  const { mutate: deleteHomeSection } = useDeleteHomeSection();
  //
  const [items, setItems] = useState(specialProducts);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const reorder = useUpdateSectionOrder();

  useEffect(() => {
    setItems(specialProducts);
  }, [specialProducts]);

  const handleDragStart = (id: number) => setDraggingId(id);

  const handleDrop = async (overId: number) => {
    handleDropHelper(
      items,
      draggingId,
      overId,
      (payload) => reorder.mutateAsync(payload),
      setItems,
      setDraggingId,
    );
  };

  return (
    <>
      {editSection && (
        <ProductsSelectionProvider
          initialProducts={
            editSection?.products ?? undefined
          }
        >
          <SpecialSectionModal
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            defaultValues={editSection}
          />
        </ProductsSelectionProvider>
      )}
      {specialProducts ? (
        <>
          {specialProducts
            .slice()
            .sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
            .map((section: any) => (
              <div
                key={section.id}
                draggable
                onDragStart={() => handleDragStart(section.id ?? 1)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(section.id ?? 1)}
                className={`relative rounded-xl hover:p-4 select-none cursor-grab border-3 border-transparent border-gray-200 hover:border-sky-300 transition-all`}
              >
                <SectionTemplate
                  section={section}
                  children={
                    <div className="flex items-center gap-2">
                      <ActionButton
                        icon={<TbEdit className="text-gray-700" size={18} />}
                        onClick={() => {
                          setEditSection(section);
                          setIsOpen(true);
                        }}
                      />
                      <DeleteButton
                        onDelete={() => deleteHomeSection(section.id)}
                      />
                    </div>
                  }
                />
              </div>
            ))}
          <AddNewSpecialSection />
        </>
      ) : (
        <AddNewSpecialSection />
      )}
    </>
  );
};

export default SpecialSectionContainer;
