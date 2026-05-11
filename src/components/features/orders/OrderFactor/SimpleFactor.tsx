"use client";

import { useRef, useMemo } from "react";

type SimpleFactorProps = {
  order: any;
};

const SimpleFactor: React.FC<SimpleFactorProps> = ({ order }) => {
  const componentRef = useRef<HTMLDivElement>(null);

  if (!order) return <div>فاکتور یافت نشد</div>;

  const {
    id,
    user,
    address,
    payment,
    items = [],
    subtotal = 0,
    discount_total = 0,
    shipping_cost = 0,
    total = 0,
    created_at,
    customer_note,
    manual_discount_value,
    promotions_discount_value,
    gift_wrapping_cost = 0,
  } = order;

  // پردازش آیتم‌ها برای نمایش صحیح
  const processedItems = useMemo(() => {
    if (!items || !Array.isArray(items)) return [];

    return items.map((item: any) => {
      const { product, variant, quantity, line_total, discount } = item;

      // محاسبه مبلغ واحد واقعی
      const unitPrice =
        item.price ||
        item.unit_price ||
        (line_total && quantity ? line_total / quantity : 0);

      // نام محصول با مشخصات واریانت
      let productName = product?.name || product?.title || "محصول";
      if (variant?.attributes && Array.isArray(variant.attributes)) {
        const variantDetails = variant.attributes
          .map((attr: any) => `${attr.value}`)
          .join("، ");
        if (variantDetails) {
          productName += ` (${variantDetails})`;
        }
      }

      return {
        name: productName,
        quantity: quantity || 1,
        unitPrice: Math.round(unitPrice),
        totalPrice: line_total || 0,
        discount: discount || 0,
        finalPrice: (line_total || 0) - (discount || 0),
      };
    });
  }, [items]);

  // اطلاعات ثابت فروشگاه
  const sellerInfo = {
    name: "آرشاپ",
    phone: "09126510603",
    postalCode: "۰۹۳۳۳۳۵۷۴۹۱",
    address: "خراسان رضوی، مشهد، بلوار وحدت",
    logo: "/images/logo.png",
  };

  // قالب‌بندی تاریخ
  const formatDate = (dateString: string) => {
    if (!dateString) return "1404/10/14 - 13:52";

    try {
      const date = new Date(dateString);
      const persianDate = date.toLocaleDateString("fa-IR");
      const time = date.toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `${persianDate} - ${time}`;
    } catch {
      return "1404/10/14 - 13:52";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* دکمه پرینت */}
      <div className="mb-4 print:hidden">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => window.print()}
        >
          چاپ فاکتور
        </button>
      </div>

      {/* محتوای فاکتور */}
      <div
        ref={componentRef}
        className="max-w-6xl mx-auto bg-white p-6 border border-gray-300"
      >
        {/* هدر فاکتور */}
        <div className="border-b border-black pb-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-4">فاکتور فروش</h1>
              <div className="mt-2 text-sm flex flex-col gap-3">
                <div>
                  <strong>فروشنده:</strong> {sellerInfo.name}
                </div>
                <div>
                  <strong>آدرس:</strong> {sellerInfo.address}
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <strong>کد پستی:</strong>
                    <span>{sellerInfo.postalCode}</span>
                  </div>
                  <div>
                    <strong>موبایل:</strong>
                    <span>{sellerInfo.phone}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-left">
              <img
                src={sellerInfo.logo}
                alt="لوگو"
                className="w-24 h-24 rounded-lg object-contain border"
              />
            </div>
          </div>
        </div>

        {/* اطلاعات خریدار */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">
            <strong>خریدار:</strong> {user?.first_name} {user?.last_name}
          </h3>
          <div className="text-sm flex flex-col gap-3">
            <div>
              <strong>آدرس:</strong> {address?.province}، {address?.city}،{" "}
              {address?.address_line}
              {address?.plaque && `، پلاک ${address.plaque}`}
              {address?.unit && `، واحد ${address.unit}`}
            </div>
            <div className="flex items-center gap-6">
              <div>
                <strong>کد پستی:</strong>
                <span>{address?.postal_code || "9952365214"}</span>
              </div>
              <div>
                <strong> موبایل:</strong>
                <span>{user?.phone || "09150553208"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* جدول محصولات */}
        <div className="mb-8">
          <table className="w-full border-collapse border border-black text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2 text-center w-12">
                  ردیف
                </th>
                <th className="border border-black p-2 text-right">
                  نام محصول
                </th>
                <th className="border border-black p-2 text-center w-20">
                  تعداد کالا
                </th>
                <th className="border border-black p-2 text-left w-32">
                  مبلغ واحد (تومان)
                </th>
                <th className="border border-black p-2 text-left w-32">
                  مبلغ کل (تومان)
                </th>
                <th className="border border-black p-2 text-left w-32">
                  تخفیف (تومان)
                </th>
                <th className="border border-black p-2 text-left w-32">
                  مبلغ کل پس از تخفیف (تومان)
                </th>
              </tr>
            </thead>
            <tbody>
              {processedItems.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="border border-black p-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-black p-2 text-right">
                    {item.name}
                  </td>
                  <td className="border border-black p-2 text-center">
                    {item.quantity}
                  </td>
                  <td className="border border-black p-2 text-left">
                    {item.unitPrice.toLocaleString("fa-IR")}
                  </td>
                  <td className="border border-black p-2 text-left">
                    {item.totalPrice.toLocaleString("fa-IR")}
                  </td>
                  <td className="border border-black p-2 text-left">
                    {item.discount.toLocaleString("fa-IR")}
                  </td>
                  <td className="border border-black p-2 text-left">
                    {item.finalPrice.toLocaleString("fa-IR")}
                  </td>
                </tr>
              ))}

              {/* ردیف جمع‌بندی */}
              <tr>
                <td className="border border-black p-2" colSpan={3}></td>
                <td className="border border-black p-2" colSpan={2}>
                  <div className=""></div>
                </td>
                <td className="border border-black p-2 font-bold">جمع کل</td>
                <td className="border text-left border-black p-2 font-bold">
                  {subtotal.toLocaleString("fa-IR")}
                </td>
              </tr>

              {/* تخفیف کد تخفیف */}
              {discount_total > 0 && (
                <tr>
                  <td className="border border-black p-2" colSpan={5}></td>
                  <td className="border border-black p-2 font-bold">
                    کد تخفیف
                  </td>
                  <td className="text-left border border-black p-2 text-red-600">
                    - {discount_total.toLocaleString("fa-IR")}
                  </td>
                </tr>
              )}

              {/* مبلغ قابل پرداخت */}
              <tr>
                <td className="border border-black p-2" colSpan={2}>
                  <div className="font-bold">مبلغ کل قابل پرداخت</div>
                </td>
                <td className="p-2 font-bold text-lg">
                  {total.toLocaleString("fa-IR")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* توضیحات */}
        {customer_note && (
          <div className="mb-6 p-2 border border-gray-300">
            <h3 className="font-bold mb-1">توضیحات:</h3>
            <p className="text-sm">{customer_note}</p>
          </div>
        )}

        {/* اطلاعات پایین فاکتور */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-sm">
          <div>
            <div className="font-bold mb-2">روش ارسال:</div>
            <div>پیک فروشگاه</div>
          </div>
          <div>
            <div className="font-bold mb-2">زمان ثبت:</div>
            <div>{formatDate(created_at)}</div>
          </div>
          <div>
            <div className="font-bold mb-2">روش پرداخت:</div>
            <div>
              {payment?.payment_method === "online" ? "آنلاین" : "کارت به کارت"}
            </div>
          </div>
          <div>
            <div className="font-bold mb-2">شناسه سفارش:</div>
            <div>#{id || 49}</div>
          </div>
          <div>
            <div className="font-bold mb-2">کد پیگیری:</div>
            <div>{payment?.tracking_code || "DF-696620"}</div>
          </div>
        </div>

        {/* بخش امضا */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-black">
          <div className="text-center">
            <div className="font-bold mb-4">مهر و امضا فروشنده</div>
            <img
              src={sellerInfo.logo}
              alt="مهر فروشنده"
              className="w-32 h-32 object-contain mx-auto border border-gray-300"
            />
          </div>

          <div className="text-center">
            <div className="font-bold mb-4">مهر و امضا خریدار</div>
            <div className="w-32 h-32 border border-dashed border-gray-400 mx-auto flex items-center justify-center text-gray-400">
              امضای خریدار
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleFactor;
