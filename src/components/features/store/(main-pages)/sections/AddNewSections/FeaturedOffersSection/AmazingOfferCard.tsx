"use client";

import { IoIosArrowBack } from "react-icons/io";

type AmazingOfferCardProps = {
  children?: React.ReactNode;
};

const AmazingOfferCard: React.FC<AmazingOfferCardProps> = ({ children }) => {
  return (
    <div className="h-[254px] w-[160px] flex flex-col items-center justify-center ml-6 pr-6">
      <img
        src="/images/AmazingText.png"
        alt="AmazingText"
        className="w-[88px]"
      />
      {children}
      <img src="/images/Amazing.png" alt="AmazingText" className="w-[80px]" />
      <div className="flex items-center gap-1 mt-4 text-white">
        <p>مشاهده همه</p>
        <IoIosArrowBack />
      </div>
    </div>
  );
};

export default AmazingOfferCard;
