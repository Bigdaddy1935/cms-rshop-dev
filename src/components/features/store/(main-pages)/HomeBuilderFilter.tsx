"use client";

import SearchFilterCard from "@/components/common/Card/SearchFilterCard";

const HomeBuilderFilter = () => {
  return (
    <SearchFilterCard
      relatedPages={[
        {
          title: "مجموعه ها",
          href: "/admin/store/home-builder/collections",
        },
      ]}
    />
  );
};

export default HomeBuilderFilter;
