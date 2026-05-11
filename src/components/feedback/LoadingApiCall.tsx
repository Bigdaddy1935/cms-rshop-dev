"use client";

import { Spinner } from "@heroui/react";

const LoadingApiCall: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 bg-slate-50 rounded-2xl text-gray-600 gap-2 !h-[458px]">
      <Spinner color="secondary" labelColor="secondary" variant="default" size="lg"/>
    </div>
  );
};

export default LoadingApiCall;
