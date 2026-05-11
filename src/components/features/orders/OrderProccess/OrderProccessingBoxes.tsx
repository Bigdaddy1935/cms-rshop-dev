"use client";

import { OrderData } from "../order-types";
import GiftWrappingBoxInfos from "./OrderCardInfos/GiftWrappingCardInfos/GiftWrappingCardInfos";
import OrderBoxInfos from "./OrderCardInfos/OrderCardInfos";
import PaymentBoxInfos from "./OrderCardInfos/PaymentCardInfos";
import CustomerBoxInfos from "./OrderCardInfos/CustomerCardInfos";
import ShippingBoxInfos from "./OrderCardInfos/ShippingCardInfos";
import InvoiceBoxInfos from "./OrderCardInfos/InvoiceCardInfos/InvoiceCardInfos";
import DynamicBoxInfos from "./OrderCardInfos/DynamicCardInfos";

type OrderProcessProps = {
  order: OrderData;
  actionBox?: React.ReactNode;
};

const OrderProcess: React.FC<OrderProcessProps> = ({ order, actionBox }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="space-y-6">
        <DynamicBoxInfos order={order} actionBox={actionBox} />
        <OrderBoxInfos order={order} />
        <InvoiceBoxInfos order={order} />
      </div>

      <div className="space-y-6">
        <CustomerBoxInfos order={order} />
        <ShippingBoxInfos order={order} />
        <PaymentBoxInfos order={order} />
        <GiftWrappingBoxInfos order={order} />
      </div>
    </div>
  );
};

export default OrderProcess;
