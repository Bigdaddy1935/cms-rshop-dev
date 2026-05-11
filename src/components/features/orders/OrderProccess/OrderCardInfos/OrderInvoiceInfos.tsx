"use client";

import InfoRow from "@/components/shared/InfoRow";
import { price } from "@/core/utils/helper";
import { Divider } from "@heroui/react";

type OrderInvoiceInfosProps = {
  order: any;
};

const OrderInvoiceInfos: React.FC<OrderInvoiceInfosProps> = ({ order }) => {
  const {
    manual_discount_type,
    manual_discount_value,
    promotions_discount_type,
    promotions_discount_value,
    promotions_discount_applied,
    shipping_cost,
    manual_discount_applied,
    discount_total,
    subtotal,
    gift_wrapping_cost,
    total,
  } = order;

  return (
    <div className="flex flex-col gap-3">
      <div>
        <InfoRow
          label="هزینه ارسال"
          value={shipping_cost === 0 ? "رایگان" : String(price(shipping_cost))}
        />

        {gift_wrapping_cost ? (
          <InfoRow
            label="هزینه بسته بندی"
            value={
              gift_wrapping_cost === 0
                ? "رایگان"
                : String(price(gift_wrapping_cost))
            }
          />
        ) : (
          ""
        )}

        {manual_discount_value ? (
          <InfoRow
            label="تخفیف دستی فاکتور"
            value={
              manual_discount_value
                ? manual_discount_type === "percent"
                  ? `${manual_discount_value}%`
                  : price(manual_discount_value)
                : "—"
            }
          />
        ) : (
          ""
        )}

        {promotions_discount_value ? (
          <InfoRow
            label="تخفیف پروموشن"
            value={
              promotions_discount_value
                ? promotions_discount_type === "percent"
                  ? `${promotions_discount_value}%`
                  : price(promotions_discount_value)
                : "—"
            }
          />
        ) : (
          ""
        )}

        <InfoRow label="جمع کل" value={price(subtotal)} />

        {discount_total ? (
          <InfoRow
            label="مجموع تخفیفات"
            value={discount_total ? price(discount_total) : "—"}
          />
        ) : (
          ""
        )}
        {discount_total ? (
          <InfoRow
            label="قیمت پس از کسر تخفیفات"
            value={discount_total ? price(subtotal - discount_total) : "—"}
          />
        ) : (
          ""
        )}
      </div>
      <Divider className="-mb-2" />
      <InfoRow
        label="مبلغ قابل پرداخت"
        value={price(total)}
        valueStyle="text-green-700 text-lg"
      />
    </div>
  );
};

export default OrderInvoiceInfos;
