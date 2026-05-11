"use client";
import Sidebar from "@/components/layout/Sidebar/Sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col-reverse items-center lg:items-start lg:flex-row w-full xs:px-2">
      <div className="fixed lg:relative w-3/12 z-50 flex justify-center shadow-none">
        <Sidebar />
      </div>
      <div className="w-full max-w-[828px] lg:w-9/12 lg:pr-3">
        <div className="min-h-[69vh] mt-8">
          <div className="mx-auto mb-32 lg:mb-6">{children}</div>
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
