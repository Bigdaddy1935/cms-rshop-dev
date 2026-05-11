"use client";

import { useMemo } from "react";
import BoxLink from "@/components/shared/BoxLink";
import MiniChart from "@/components/ui/charts/MiniChart";
import { useGetDashboardStats } from "@/core/hooks/api/useDashboard";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoReceiptOutline } from "react-icons/io5";
import { GoCommentDiscussion } from "react-icons/go";
import { TbMoneybag } from "react-icons/tb";

const ReportsList = () => {
  const { data: stats } = useGetDashboardStats();

  const commentsData = useMemo(() => {
    return (
      stats?.data?.comments?.map((item: any) => ({
        name: item.month,
        value: item.value,
      })) ?? []
    );
  }, [stats?.data?.comments]);

  const salesData = useMemo(() => {
    return (
      stats?.data?.total_sales?.map((item: any) => ({
        name: item.month,
        value: item.value,
      })) ?? []
    );
  }, [stats?.data?.total_sales]);

  const ordersData = useMemo(() => {
    return (
      stats?.data?.orders?.map((item: any) => ({
        name: item.month,
        value: item.value,
      })) ?? []
    );
  }, [stats?.data?.orders]);

  const usersData = useMemo(() => {
    return (
      stats?.data?.new_customers?.map((item: any) => ({
        name: item.month,
        value: item.value,
      })) ?? []
    );
  }, [stats?.data?.new_customers]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
      <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-3 hover:bg-gray-100 transition">
        <BoxLink
          title="فروش کل"
          icon={<TbMoneybag className="text-2xl" />}
          routeName={"dashboard/#"}
          parentStyle="text-gray-700 flex flex-col items-center"
          titleStyle="text-gray-600 -mt-1"
        />
        <MiniChart data={salesData} color="#16a34a" />
      </div>

      <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-3 hover:bg-gray-100 transition">
        <BoxLink
          title="سفارش‌ها"
          icon={<IoReceiptOutline className="text-2xl" />}
          routeName={"dashboard/#"}
          parentStyle="text-gray-700 flex flex-col items-center"
          titleStyle="text-gray-600"
        />
        <MiniChart data={ordersData} color="#f59e0b" />
      </div>

      <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-3 hover:bg-gray-100 transition">
        <BoxLink
          title="کاربر جدید"
          icon={<HiOutlineUserGroup className="text-2xl" />}
          routeName={"dashboard/#"}
          parentStyle="text-gray-700 flex flex-col items-center"
          titleStyle="text-gray-600"
        />
        <MiniChart data={usersData} color="#ef4444" />
      </div>

      <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-3 hover:bg-gray-100 transition">
        <BoxLink
          title="نظرات کاربران"
          icon={<GoCommentDiscussion className="text-2xl" />}
          routeName={"dashboard/#"}
          parentStyle="text-gray-700 flex flex-col items-center"
          titleStyle="text-gray-600"
        />
        <MiniChart data={commentsData} color="#3b82f6" />
      </div>
    </div>
  );
};

export default ReportsList;
