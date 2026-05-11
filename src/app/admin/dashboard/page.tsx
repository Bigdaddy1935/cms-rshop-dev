import dynamic from "next/dynamic";
import ShopInfosCard from "@/components/layout/ArshopCard/ShopInfosCard";
import StoreOnboarding from "@/components/features/Shared/StoreOnboarding";
const LatestOrders = dynamic(() => import('@/components/features/dashboard/LatestOrders'));
const ProductListMostViewed = dynamic(() => import('@/components/features/dashboard/ProductListMostViewed'));
const ReportsList = dynamic(() => import("@/components/features/dashboard/ReportsList"));

const Dashboard = () => {
  return (
    <div>
      <ShopInfosCard />
      <section className="w-full flex flex-col gap-6">
        <StoreOnboarding className="!mb-0"/>
        <ReportsList />
        <LatestOrders />
        <ProductListMostViewed />
      </section>
    </div>
  );
};

export default Dashboard;
