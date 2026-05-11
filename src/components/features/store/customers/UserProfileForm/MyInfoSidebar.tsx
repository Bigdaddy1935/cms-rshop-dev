"use client";

import { formatDate } from "@/core/utils/date";
import { FaCheckCircle } from "react-icons/fa";

type MyInfoSidebarProps = {
  info: any;
  disableExtraData: boolean;
  disableShowPermissions?: boolean;
};

const MyInfoSidebar: React.FC<MyInfoSidebarProps> = ({
  info,
  disableExtraData,
  disableShowPermissions = false,
}) => {
  return (
    <div className="w-full lg:w-2/6 border-r pr-6 flex flex-col justify-between gap-10 pt-5">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <p className="text-[13px] text-gray-800">شناسه کاربری</p>
          <p className="text-[13px] text-gray-600">#{info?.id}</p>
        </div>
        {!disableExtraData ? (
          <div className="flex items-center justify-between">
            <p className="text-[13px] text-gray-800">عضویت</p>
            <p className="text-[13px] text-gray-600">
              {info?.created_at ? formatDate(info?.created_at) : "-"}
            </p>
          </div>
        ) : (
          ""
        )}

        <div className="flex items-center justify-between">
          <p className="text-[13px] text-gray-800">
            حساب {info?.is_active ? "فعال" : "غیرفعال"}
          </p>
          <span className="relative flex size-3">
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full ${info?.is_active ? "bg-green-400" : "bg-red-400"} opacity-75`}
            ></span>
            <span
              className={`relative inline-flex size-3 rounded-full ${info?.is_active ? "bg-green-500" : "bg-red-500"}`}
            ></span>
          </span>
        </div>
      </div>
      {!disableShowPermissions ? (
        info?.permissions ? (
          <div className="flex flex-col gap-2">
            <p className="text-[13px] text-gray-800">مجوزها</p>
            <ul className="space-y-1.5 bg-green-50 rounded-md p-3">
              {info?.permissions?.map((perm: string, idx: number) => (
                <li key={idx} className="flex items-center gap-2 text-gray-600">
                  <FaCheckCircle className="text-green-500" />
                  <span className="text-[13px] truncate">{perm}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default MyInfoSidebar;
