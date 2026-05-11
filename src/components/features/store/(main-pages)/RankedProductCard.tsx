"use client";

import BaseCard from "@/components/ui/BaseCard";

type RankedProductCardProps = {
  image: string;
  title: string;
  index: number;
};

const RankedProductCard: React.FC<RankedProductCardProps> = ({
  image,
  title,
  index,
}) => {
  return (
    <BaseCard
      className="relative w-[245px] h-fit hover:scale-95 transition-transform !m-0 shadow-none border-none rounded-none"
      bodyClassName="flex flex-row items-center gap-4 p-3"
    >
      <img
        src={image || "/images/placeholder.png"}
        alt={"product image"}
        className="object-cover !w-[86px] !h-[86px] rounded-lg"
      />
      <div className={`w-full pb-6 pt-5 ${index % 3 !== 0 ? "border-b" : ""}`}>
        <div className="flex items-center gap-4">
          <div className="font-bold text-2xl text-sky-600">{index}</div>
          <p className="w-24 text-sm font-medium text-gray-800 truncate">
            {title}
          </p>
        </div>
      </div>
    </BaseCard>
  );
};

export default RankedProductCard;
