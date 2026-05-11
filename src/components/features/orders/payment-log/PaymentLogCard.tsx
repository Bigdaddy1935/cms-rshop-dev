"use client";

import {
  MdAccessTime,
  MdPerson,
  MdReceipt,
  MdCreditCard,
  MdExpandMore,
  MdExpandLess,
} from "react-icons/md";
import { useState } from "react";
import { formatDate } from "@/core/utils/date";
import InfoRow from "@/components/shared/InfoRow";
import DeviceInfo from "./DeviceInfo";
import {
  getCardToCardStatusText,
  getPaymentGatewayText,
  getPaymentLogStatusText,
} from "../OrderProccess/const/payment-constants-fa";
import { getOrderStatusText } from "../OrderProccess/const/order-constants-fa";
import {
  getPaymentLogStatusMap,
  getPaymentMethodMap,
  getPaymentStatusMap,
} from "../OrderProccess/const/status-map";
import Link from "next/link";

// Helper function to format currency
const formatCurrency = (amount: string | number) => {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("fa-IR").format(num) + " تومان";
};

// Payment Card Component (با ساختار جدید)
const PaymentCard = ({ payment }: { payment: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const statusConfig = getPaymentStatusMap(payment.status);
  const paymentMethodInfo = getPaymentMethodMap(payment.payment_method);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Card Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${statusConfig.color} border`}>
              {statusConfig.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">پرداخت #{payment.id}</h3>
              <p className="text-sm text-gray-600 mt-1">{payment.message}</p>
            </div>
          </div>
          <div
            className="flex flex-row-reverse items-center cursor-pointer select-none"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <button className="text-gray-500 hover:text-gray-700 transition-colors p-1">
              {isExpanded ? (
                <MdExpandLess size={24} />
              ) : (
                <MdExpandMore size={24} />
              )}
            </button>
            {!isExpanded ? (
              <span
                className={`flex items-center gap-1 text-[13px] text-gray-600 ${paymentMethodInfo.color}`}
              >
                {paymentMethodInfo.title}
                {paymentMethodInfo.icon}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* Quick Info Row */}
        {!isExpanded ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            <div className="flex items-center gap-2">
              <MdPerson className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">کاربر</p>
                <p className="text-sm font-medium">
                  {payment.user?.first_name} {payment.user?.last_name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MdReceipt className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">سفارش</p>
                <p className="text-sm font-medium">#{payment.order?.id}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MdCreditCard className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">مبلغ</p>
                <p className="text-sm font-medium">
                  {formatCurrency(payment.amount)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MdAccessTime className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">زمان</p>
                <p className="text-sm font-medium">
                  {formatDate(payment.created_at)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow label="کد رهگیری" value={payment.authority} hoverable />
              {payment.ref_id && (
                <InfoRow label="کد پیگیری" value={payment.ref_id} hoverable />
              )}
              {payment.card_to_card_status && (
                <InfoRow
                  label="وضعیت کارت به کارت"
                  value={getCardToCardStatusText(payment.card_to_card_status)}
                />
              )}
              {payment.tracking_code && (
                <InfoRow
                  label="کد رهگیری"
                  value={payment.tracking_code}
                  hoverable
                />
              )}
            </div>
            <div className="flex flex-row-reverse items-center justify-between mt-4 border-t border-gray-200 pt-4">
              {/* Order Status */}
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                سفارش: {getOrderStatusText(payment.order.status)}
              </span>
              {/* Status Badge */}
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
                >
                  {statusConfig.title}
                </span>
                <span
                  className={`flex items-center gap-1 text-[13px] text-gray-600 ${paymentMethodInfo.color}`}
                >
                  {paymentMethodInfo.icon}
                  {paymentMethodInfo.title}
                </span>
                {payment.gateway && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    درگاه: {getPaymentGatewayText(payment.gateway)}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="p-5 bg-gray-50 border-t border-gray-100">
          <div className="space-y-4">
            {/* Order Summary */}
            {payment.order && (
              <div className="relative bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between w-full">
                  <h4 className="font-bold text-gray-800 mb-3">خلاصه سفارش</h4>
                  <Link
                    href={`/admin/orders/order?id=${payment.order.id}`}
                    className="rounded-full cursor-pointer"
                  >
                    <img
                      src={payment?.receipt_image?.url ?? "/images/box.png"}
                      alt="receipt-image"
                      className="w-10 h-10 object-cover rounded-xl border border-gray-300 p-0.5"
                    />
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 pb-2">جمع جزء</p>
                    <p className="font-medium">
                      {formatCurrency(payment.order.subtotal)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 pb-2">تخفیف</p>
                    <p className="font-medium">
                      {formatCurrency(payment.order.discount_total)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 pb-2">هزینه ارسال</p>
                    <p className="font-medium">
                      {formatCurrency(payment.order.shipping_cost)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 pb-2">جمع کل</p>
                    <p className="font-[Dana-ExtraBold] text-green-700">
                      {formatCurrency(payment.order.total)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* User Information */}
            {payment.user && (
              <div className="bg-white p-4 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 pb-2">نام</p>
                    <p className="font-medium">
                      {payment.user.first_name} {payment.user.last_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 pb-2">تلفن</p>
                    <p className="font-medium">{payment.user.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 pb-2">ایمیل</p>
                    <p className="font-medium truncate">{payment.user.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Logs Section */}
            {payment.logs && payment.logs.length > 0 && (
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-4">
                  تاریخچه لاگ‌ها ({payment.logs.length})
                </h4>
                <div className="space-y-3">
                  {payment.logs.map((log: any) => {
                    const logStatus = getPaymentLogStatusMap(log.status);
                    return (
                      <div
                        key={log.id}
                        className="bg-white p-3 rounded-lg border"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <div
                              className={`relative p-1 rounded ${logStatus.color}`}
                            >
                              <div>{logStatus.icon}</div>
                              <div className="absolute top-0 right-0">
                                <span className="relative flex size-3">
                                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gray-400 opacity-75"></span>
                                  <span className="relative inline-flex size-3 rounded-full bg-gray-500"></span>
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {log.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatDate(log.created_at)}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-1 rounded text-xs ${logStatus.color}`}
                          >
                            {getPaymentLogStatusText(log.status)}
                          </span>
                        </div>
                        {log.ip && (
                          <div className="mt-2 pt-2 border-t border-gray-100 text-xs">
                            {log.payload &&
                              Object.keys(log.payload).length > 0 && (
                                <details className="mt-1">
                                  <summary className="cursor-pointer text-blue-600 select-none">
                                    نمایش جزئیات
                                  </summary>
                                  <pre
                                    style={{
                                      direction: "ltr",
                                      unicodeBidi: "plaintext",
                                    }}
                                    className="mt-2 p-4 bg-gray-900 text-gray-100 rounded-lg text-xs leading-relaxed overflow-x-auto border border-gray-700 text-left"
                                  >
                                    {JSON.stringify(log.payload, null, 2)}
                                  </pre>
                                </details>
                              )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Technical Details */}
            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center gap-6 justify-between">
                <h4 className="font-bold text-gray-800 mb-3">
                  اطلاعات دستگاه کاربر (آخرین فعالیت)
                </h4>
              </div>

              {payment.logs && payment.logs.length > 0 ? (
                <>
                  {(() => {
                    // فیلتر لاگ‌های دارای user_agent و مرتب‌سازی بر اساس تاریخ
                    const validLogs =
                      payment.logs
                        ?.filter((log: any) => log.user_agent)
                        ?.sort(
                          (a: any, b: any) =>
                            new Date(b.created_at).getTime() -
                            new Date(a.created_at).getTime(),
                        ) || [];

                    if (validLogs.length === 0) {
                      return (
                        <p className="text-gray-500 text-sm">
                          اطلاعات دستگاه در دسترس نیست
                        </p>
                      );
                    }

                    const latestLog = validLogs[0];

                    return (
                      <div className="space-y-4">
                        <DeviceInfo
                          key={latestLog.id}
                          userAgent={latestLog.user_agent}
                          ip={latestLog.ip}
                          timestamp={latestLog.created_at}
                        />

                        {/* نمایش تعداد لاگ‌های دیگر */}
                        {validLogs.length > 1 && (
                          <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded text-center">
                            <span className="inline-flex items-center gap-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {validLogs.length - 1} فعالیت دیگر در تاریخچه وجود
                              دارد
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </>
              ) : (
                <p className="text-gray-500 text-sm">
                  اطلاعات دستگاه در دسترس نیست
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentCard;
