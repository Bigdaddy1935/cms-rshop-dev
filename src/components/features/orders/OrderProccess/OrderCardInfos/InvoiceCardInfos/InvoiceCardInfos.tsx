"use client";

import BaseCard from "@/components/ui/BaseCard";
import ProductCardInfos from "./ProductCardInfos";
import InfoRow from "@/components/shared/InfoRow";
import { price } from "@/core/utils/helper";
import { useEffect, useState } from "react";
import { InvoiceItemPayload } from "./invoice-card-infos-types";
import BaseModal from "@/components/ui/modals/BaseModal";
import { GoArrowUpRight } from "react-icons/go";
import OrderInvoiceInfos from "../OrderInvoiceInfos";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { IoReceiptOutline } from "react-icons/io5";

type InvoiceCardInfosProps = {
  order: any;
  factorOnly?: boolean;
};

const InvoiceCardInfos: React.FC<InvoiceCardInfosProps> = ({
  order,
  factorOnly = false,
}) => {
  const {
    shipping_cost,
    discount_total,
    total,
    items,
    gift_wrapping_cost,
    subtotal,
  } = order;

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!items) return;

    const equalItems: InvoiceItemPayload[] = [];
    const notEqualItems: InvoiceItemPayload[] = [];

    // مرحله ۱: دسته‌بندی آیتم‌های واریانت‌دار
    for (let index = 0; index < items.length; index++) {
      const element = items[index] as InvoiceItemPayload;

      if (element.variant) {
        // چک کن ببین محصول مشابه دیگه‌ای هست
        const hasSimilarProduct = items.some(
          (item: any, idx: any) =>
            idx !== index &&
            item.product.id === element.product.id &&
            item.variant
        );

        if (hasSimilarProduct) {
          equalItems.push(element);
        } else {
          notEqualItems.push(element);
        }
      }
    }

    // مرحله ۲: محصولات ساده
    const simpleItems = items.filter(
      (item: InvoiceItemPayload) => !item.variant
    );

    // مرحله ۳: ساخت محصولات نهایی
    const finalProducts = [];

    // الف) محصولات ساده
    const simpleProducts = simpleItems.map((p: InvoiceItemPayload) => ({
      line_total: p.line_total,
      quantity: p.quantity,
      discount: p.discount,
      product: p.product,
      variants: [],
    }));
    finalProducts.push(...simpleProducts);

    // ب) محصولات گروهی (equalItems)
    if (equalItems.length) {
      // گروه‌بندی بر اساس product.id
      const grouped: { [key: number]: InvoiceItemPayload[] } = {};

      equalItems.forEach((item) => {
        const productId = item.product.id;
        if (!grouped[productId]) grouped[productId] = [];
        grouped[productId].push(item);
      });

      // برای هر گروه یک محصول ایجاد کن
      Object.values(grouped).forEach((group) => {
        if (group.length > 0) {
          const firstItem = group[0];
          const totalLineTotal = group.reduce(
            (sum, item) => sum + item.line_total,
            0
          );
          const totalQuantity = group.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          const totalDiscount = group.reduce(
            (sum, item) => sum + item.discount,
            0
          );

          const variantsList = group.map((item) => ({
            line_total: item.line_total,
            quantity: item.quantity,
            discount: item.discount,
            variant: item.variant,
          }));

          finalProducts.push({
            line_total: totalLineTotal,
            quantity: totalQuantity,
            discount: totalDiscount,
            product: firstItem.product,
            variants: variantsList,
          });
        }
      });
    }

    // ج) محصولات تکی واریانت‌دار
    notEqualItems.forEach((item) => {
      // چک کن که قبلاً در گروه نیومده باشه
      const alreadyInGroup = equalItems.some(
        (eq) => eq.product.id === item.product.id
      );
      if (!alreadyInGroup) {
        finalProducts.push({
          line_total: item.line_total,
          quantity: item.quantity,
          discount: item.discount,
          product: item.product,
          variants: [
            {
              line_total: item.line_total,
              quantity: item.quantity,
              discount: item.discount,
              variant: item.variant,
            },
          ],
        });
      }
    });

    setProducts(finalProducts);
  }, [items]);

  return (
    <BaseCard
      CardHeaderProps={{
        title: "سفارشات",
        icon: <TfiShoppingCartFull className="text-gray-700" />,
        showIconInActionSlot: factorOnly,
        ...(factorOnly
          ? {}
          : {
              children: (
                <BaseModal
                  triggerProps={{
                    icon: <GoArrowUpRight />,
                    title: "بیشتر",
                  }}
                  title={"اطلاعات کامل فاکتور"}
                  size="lg"
                  icon={<IoReceiptOutline />}
                  isActiveFooter={false}
                >
                  <OrderInvoiceInfos order={order} />
                </BaseModal>
              ),
            }),
      }}
    >
      <div className="mb-4">
        {products?.map((item: any, index: number) => (
          <ProductCardInfos key={index} item={item} />
        ))}
      </div>
      {!factorOnly ? (
        <>
          <InfoRow label="جمع کل" value={price(subtotal)} />

          <InfoRow
            label="تخفیف محصولات"
            value={discount_total ? price(discount_total) : "—"}
          />

          <InfoRow
            label="هزینه ارسال"
            value={
              shipping_cost === 0 ? "رایگان" : String(price(shipping_cost))
            }
          />
          <InfoRow
            label="هزینه بسته بندی"
            value={
              gift_wrapping_cost === 0
                ? "رایگان"
                : String(price(gift_wrapping_cost))
            }
          />
          <InfoRow
            label="مبلغ قابل پرداخت"
            value={price(total)}
            valueStyle="text-green-700 text-lg"
          />
        </>
      ) : (
        ""
      )}
    </BaseCard>
  );
};

export default InvoiceCardInfos;
