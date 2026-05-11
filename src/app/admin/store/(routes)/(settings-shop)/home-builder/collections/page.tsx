"use client";

import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { ProductsSelectionProvider } from "@/components/features/products/SelectableProduct/ProductsSelectionContext";
import CollectionCard from "@/components/features/store/(main-pages)/collections/CollectionCard";
import SpecialSectionModal from "@/components/features/store/(main-pages)/sections/AddNewSections/SpecialSection/SpecialSectionModal";
import { useGetHome } from "@/core/hooks/api/adminHome/useHome";
import { useState } from "react";
import { HiOutlineCollection } from "react-icons/hi";

const Collections = () => {
  const { data, isLoading: isLoading } = useGetHome();
  const [isOpen, setIsOpen] = useState(false);
  const [editSection, setEditSection] = useState<any>(null);

  const sections = data?.data?.sections?.filter(
    (coll: any) => coll.section_type !== "promotion_based",
  );

  return (
    <>
      {editSection ? (
        <ProductsSelectionProvider
          initialProducts={editSection?.products ?? undefined}
        >
          <SpecialSectionModal
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            defaultValues={editSection}
          />
        </ProductsSelectionProvider>
      ) : (
        ""
      )}
      <UnifiedCard
        headerProps={{
          title: "مدیریت مجموعه ها",
          icon: <HiOutlineCollection className="text-2xl" />,
          children: (
            <ProductsSelectionProvider initialProducts={[]}>
              <SpecialSectionModal />
            </ProductsSelectionProvider>
          ),
        }}
        isLoading={isLoading}
        isExistItems={sections?.length}
        searchInp={false}
        childrenClassName="grid grid-cols-1 sm:grid-cols-2"
      >
        {sections?.map((coll: any, index: number) => (
          <CollectionCard
            key={index}
            collection={coll}
            onEdit={() => {
              console.log("VVVVVVVVVV", coll);
              setEditSection(coll)
              setIsOpen(true)
            }}
          />
        ))}
      </UnifiedCard>
    </>
  );
};

export default Collections;
