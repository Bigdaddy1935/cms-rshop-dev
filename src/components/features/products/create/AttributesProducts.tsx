"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetOneProduct } from "@/core/hooks/api/products/useProduct";
import { useAttributeContext } from "./context/AttributeContext";
import SortableAttributeNodes from "./SortableAttributeNodes/SortableAttributeNodes";
import { useEffect, useState, useMemo } from "react";
import SpecTree from "./helpers/SpecTree";
import BaseTabs, { BaseTabItem } from "@/components/ui/BaseTabs";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import AttributesModal from "./AttributesProduct/AttributesModal";
import SearchFilterCard from "@/components/common/Card/SearchFilterCard";
import VaraintsForm from "./variant/VaraintsForm";
import { MdOutlineCategory } from "react-icons/md";

const AttributesProducts = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const sp = useSearchParams();
  const page = +(sp.get("edit_id") ?? 1);
  const { setAttrInfos } = useAttributeContext();

  const { data: productData, isPending } = useGetOneProduct(page);

  // active tab + mounted for lazy render
  const [activeTab, setActiveTab] = useState<string | undefined>("variants");
  const [mounted, setMounted] = useState<Record<string, boolean>>({
    variants: true, // default
    "sort-variants": false,
    attributes: false,
    "sort-attributes": false,
  });

  useEffect(() => {
    const t = searchParams.get("tab") ?? "variants";
    setActiveTab(t);
    setMounted((m) => ({ ...m, [t]: true }));
  }, [searchParams]);

  useEffect(() => {
    if (!productData?.data?.category_id) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("category_id", String(productData.data.category_id));
    router.replace(`${pathname}?${params.toString()}`);
  }, [productData?.data, router, pathname, searchParams]);

  useEffect(() => {
    let attrValues: any[] = [];

    if (productData?.data?.attribute_nodes) {
      const nodeValues = productData.data.attribute_nodes.flatMap(
        (group: any) =>
          group.attributes.flatMap((attr: any) => attr.values ?? []),
      );
      attrValues = [...attrValues, ...nodeValues];
    }

    if (productData?.data?.specifications) {
      const specValues = productData.data.specifications.flatMap((group: any) =>
        group.attributes.flatMap((attr: any) => attr.values ?? []),
      );
      attrValues = [...attrValues, ...specValues];
    }

    setAttrInfos(attrValues);
  }, [productData?.data]);

  const handleTabChange = (key: string | number) => {
    const k = String(key);
    setActiveTab(k);
    setMounted((m) => ({ ...m, [k]: true }));
  };

  const tabItems: BaseTabItem[] = useMemo(
    () => [
      {
        key: "variants",
        title: "تنوع محصول‌",
        showEmpty: !productData?.data?.variants?.length,
        content: mounted["variants"] ? (
          <VaraintsForm initialVariants={productData?.data?.variants} />
        ) : null,
      },
      {
        key: "sort-variants",
        title: "مرتب سازی تنوع محصول‌",
        showEmpty: !productData?.data?.variants?.length,
        content:
          mounted["sort-variants"] &&
          productData?.data?.attribute_nodes?.length ? (
            <SortableAttributeNodes
              attributeNodes={productData.data.attribute_nodes}
            />
          ) : null,
      },
      {
        key: "attributes",
        title: "لیست ویژگی ها",
        showEmpty: !productData?.data?.specifications?.length,
        content: mounted["attributes"] ? (
          <SpecTree specs={productData?.data?.specifications} />
        ) : null,
      },
      {
        key: "sort-attributes",
        title: "مرتب سازی ویژگی ها",
        showEmpty: !productData?.data?.specifications?.length,
        content:
          mounted["sort-attributes"] &&
          productData?.data?.specifications?.length ? (
            <SortableAttributeNodes
              attributeNodes={productData.data.specifications}
            />
          ) : null,
      },
    ],
    [mounted, productData],
  );

  return (
    <UnifiedCard
      searchFilter={
        <SearchFilterCard
          relatedPages={[
            {
              title: "اطلاعات محصول",
              href: `/admin/products/create?edit_id=${page}&type=infos`,
            },
            {
              title: "تنوع محصولات",
              href: "/admin/products/variants/",
            },
          ]}
        />
      }
      isLoading={isPending}
      headerProps={{
        icon: <MdOutlineCategory className="text-xl" />,
        title: "ویژگی ها و تنوع محصولات",
        children: <AttributesModal />,
      }}
    >
      <BaseTabs
        items={tabItems}
        activeKey={activeTab}
        variant="light"
        onTabChange={(key) => handleTabChange(String(key))}
        tabListClassName="flex-wrap md:flex-nowrap mb-4"
        syncWithQuery
      />
    </UnifiedCard>
  );
};

export default AttributesProducts;
