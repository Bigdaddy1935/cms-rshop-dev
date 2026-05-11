"use client";

import React from "react";
import Slider from "@/components/shared/Slider";
import ProductTemplate from "../ProductTemplate";
import SectionTemplateHeader from "./SectionTemplateHeader";
import RankedProductCard from "../RankedProductCard";

type SectionTemplateProps = {
  section: any;
  title?: string;
  children?: React.ReactNode;
};

const SectionTemplate: React.FC<SectionTemplateProps> = ({
  section,
  title: titleCustom,
  children,
}) => {
  const {
    title,
    display_style,
    products,
    show_view_all_button,
    view_all_link,
  } = section;

  return (
    <div className="hover-reveal-parent w-full flex flex-col gap-4">
      <SectionTemplateHeader
        title={title}
        titleCustom={titleCustom}
        showViewAll={show_view_all_button}
        viewAllLink={view_all_link}
      >
        {children}
      </SectionTemplateHeader>

      {display_style === "carousel" && (
        <Slider
          className={products.length >= 4 ? "!mx-auto" : "!mx-0"}
          items={products}
          itemsPerView={4}
          rows={1}
          rowHeight={250}
          renderItem={(product: any) => (
            <ProductTemplate key={product.id} product={product} />
          )}
        />
      )}

      {display_style === "grid" && (
        <div className="w-fit mx-auto grid grid-cols-4 gap-1">
          {products.map((product: any) => (
            <ProductTemplate
              key={product.id}
              product={product}
              className={`shadow !rounded-none w-[190px]`}
            />
          ))}
        </div>
      )}

      {display_style === "list" && (
        <Slider
          items={products}
          itemsPerView={3}
          rows={3}
          rowHeight={120}
          className="border rounded-2xl p-1"
          renderItem={(product: any, index: number) => (
            <RankedProductCard
              key={product.id}
              index={index + 1}
              image={product.image}
              title={product.name}
            />
          )}
        />
      )}
    </div>
  );
};

export default SectionTemplate;
