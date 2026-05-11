"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

// کامپوننت‌های UI اصلی پروژه
import BaseCard from "@/components/ui/BaseCard";
import CardHeader from "@/components/common/Card/CardHeader";

// جدول HeroUI
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/react";

// فقط LineChart (اگر نداری، پایین جایگزین SVG داره)
const LineChart = dynamic(() => import("@/components/ui/charts/MiniChart"), { ssr: false });

// آیکون‌ها
import { FiDownload, FiTrendingUp, FiDollarSign, FiShoppingBag, FiGlobe, FiMapPin, FiPercent, FiRefreshCcw, FiCreditCard } from "react-icons/fi";
import { GiReceiveMoney, GiPayMoney, GiProfit } from "react-icons/gi";
import { PiMoneyWavyBold } from "react-icons/pi";
import { MdOutlineShoppingCart } from "react-icons/md";

// ---------- هِلپرها ----------
const monthsFa = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];

const formatCurrency = (v: number) => v.toLocaleString("fa-IR") + " ریال";
const formatNumber = (n: number) => n.toLocaleString("fa-IR");

function exportToCSV(filename: string, rows: any[], columns: string[]) {
  if (!rows?.length) return;
  const header = columns.join(",") + "\n";
  const csv = rows.map(row => columns.map(col => `"${(row[col] ?? "").toString().replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + header + csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

// ---------- داده‌های ماک کامل ----------
const revenueSeries = monthsFa.map((_, i) => ({
  name: monthsFa[i],
  value: [62e6, 52e6, 58e6, 61e6, 54e6, 59e6, 65e6, 68e6, 70e6, 63e6, 66e6, 66.5e6][i],
}));

const funnelData = [
  { name: "بازدیدکننده", value: 185_000, percent: 100 },
  { name: "افزودن به سبد", value: 28_500, percent: 15.4 },
  { name: "شروع پرداخت", value: 9_200, percent: 32.3 },
  { name: "سفارش موفق", value: 5_700, percent: 62 },
];

const trafficSources = [
  { name: "جستجوی مستقیم", value: 38, color: "fill-blue-500" },
  { name: "گوگل ارگانیک", value: 28, color: "fill-green-500" },
  { name: "اینستاگرام", value: 15, color: "fill-pink-500" },
  { name: "تبلیغات کلیکی", value: 12, color: "fill-purple-500" },
  { name: "ایمیل", value: 7, color: "fill-yellow-500" },
];

const topCities = [
  { city: "تهران", orders: 2150, revenue: 28500000 },
  { city: "اصفهان", orders: 890, revenue: 11200000 },
  { city: "مشهد", orders: 720, revenue: 9800000 },
  { city: "شیراز", orders: 580, revenue: 7600000 },
  { city: "تبریز", orders: 410, revenue: 5300000 },
];

const productPerformance = [
  { sku: "P-100", title: "کتاب آموزش ری‌اکت", sold: 420, revenue: 12000000, profit: 8400000, returns: 6 },
  { sku: "P-200", title: "هدفون بی‌سیم مدل X", sold: 210, revenue: 8500000, profit: 5100000, returns: 4 },
  { sku: "P-300", title: "کیف دستی چرم", sold: 150, revenue: 5600000, profit: 3900000, returns: 2 },
];

const paymentMethods = [
  { method: "درگاه بانکی", success: 4200, failed: 120, volume: 52000000, percent: 78 },
  { method: "کیف پول", success: 800, failed: 20, volume: 6200000, percent: 12 },
  { method: "پرداخت در محل", success: 500, failed: 40, volume: 8400000, percent: 10 },
];

const orders = Array.from({ length: 20 }, (_, i) => ({
  id: `O-2025${String(i + 1).padStart(4, "0")}`,
  date: `۱۴۰۴-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
  revenue: Math.floor(Math.random() * 3_000_000) + 300_000,
  discount: Math.floor(Math.random() * 200_000),
  shipping: Math.floor(Math.random() * 100_000) + 20_000,
  fees: Math.floor(Math.random() * 50_000) + 5_000,
  status: ["تکمیل‌شده", "در حال پردازش", "لغوشده", "در انتظار پرداخت"][i % 4],
})).map(o => ({ ...o, profit: o.revenue - o.discount - o.shipping - o.fees }));

const refunds = [
  { id: "R-001", order: "O-20250012", amount: 507723, reason: "محصول معیوب" },
  { id: "R-002", order: "O-20250045", amount: 88915, reason: "عدم رضایت کاربر" },
  { id: "R-003", order: "O-20250123", amount: 401503, reason: "ارسال اشتباه" },
];

const coupons = [
  { code: "WELCOME20", uses: 312, impact: 18500000 },
  { code: "SUMMER50", uses: 98, impact: 12300000 },
  { code: "FREESHIP", uses: 567, impact: 8900000 },
];

const settlements = [
  { id: "S-1404-08", date: "۱۴۰۴/۰۸/۲۸", amount: 148500000, status: "پرداخت‌شده" },
  { id: "S-1404-07", date: "۱۴۰۴/۰۷/۲۸", amount: 132000000, status: "پرداخت‌شده" },
  { id: "S-1404-09", date: "۱۴۰۴/۰۹/۲۸", amount: 155000000, status: "در انتظار" },
];

const taxSummary = { period: "فروردین ۱۴۰۴ — اسفند ۱۴۰۴", vat: 12500000, incomeTax: 6250000, total: 18750000 };

const KPI = {
  totalRevenue: 666_505_580,
  grossProfit: 398_000_000,
  totalOrders: 5700,
  aov: 116_930,
  conversionRate: 3.08,
  refundRate: 1.8,
  ltv: 1_850_000,
  cac: 185_000,
  roas: 5.8,
  repeatRate: 32,
};

// ---------- چارت‌های SVG دستی ----------
const FunnelChart = () => (
  <div className="space-y-6 py-8">
    {funnelData.map((item, i) => (
      <div key={i} className="flex items-center gap-6">
        <div className="w-40 text-right font-medium text-gray-700">{item.name}</div>
        <div className="flex-1 relative">
          <div
            className="h-14 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-r-full shadow-lg transition-all duration-700"
            style={{ width: `${item.percent}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-end pr-6 text-white font-bold text-lg">
            {formatNumber(item.value)}
          </div>
        </div>
        <div className="w-20 text-left text-sm font-semibold text-indigo-600">%{item.percent.toFixed(1)}</div>
      </div>
    ))}
  </div>
);

const PieChartTraffic = () => {
  let startAngle = 0;
  const slices = trafficSources.map(s => {
    const angle = (s.value / 100) * 360;
    const endAngle = startAngle + angle;
    const largeArc = angle > 180 ? 1 : 0;
    const x1 = 100 + 85 * Math.cos((startAngle * Math.PI) / 180);
    const y1 = 100 + 85 * Math.sin((startAngle * Math.PI) / 180);
    const x2 = 100 + 85 * Math.cos((endAngle * Math.PI) / 180);
    const y2 = 100 + 85 * Math.sin((endAngle * Math.PI) / 180);
    const path = `M100,100 L${x1},${y1} A85,85 0 ${largeArc},1 ${x2},${y2} Z`;
    startAngle = endAngle;
    return { path, ...s };
  });

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 200" className="w-80 h-80">
        {slices.map((s, i) => (
          <path key={i} d={s.path} className={s.color} opacity="0.85" />
        ))}
        <circle cx="100" cy="100" r="60" fill="white" />
        <text x="100" y="105" textAnchor="middle" className="text-3xl font-bold fill-gray-800">100%</text>
      </svg>
      <div className="mt-8 grid grid-cols-2 gap-4 w-full">
        {trafficSources.map((s) => (
          <div key={s.name} className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded ${s.color.replace("fill-", "bg-")}`} />
            <span className="text-sm">{s.name} — {s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------- کامپوننت اصلی ----------
export default function FinanceProComplete() {
  const [showAdvanced, setShowAdvanced] = useState(true);

  const ordersCsv = orders.map(o => ({
    id: o.id, date: o.date, revenue: o.revenue, discount: o.discount,
    shipping: o.shipping, fees: o.fees, profit: o.profit, status: o.status
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 md:p-8">
      <div className="max-w-screen-2xl mx-auto space-y-10">

        {/* هدر */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 bg-white rounded-3xl shadow-xl p-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">داشبورد مالی پیشرفته فروشگاه</h1>
            <p className="text-lg text-gray-600 mt-2">تحلیل جامع فروش، سود، تسویه، مالیات و رفتار کاربر</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => exportToCSV("سفارشات_کامل.csv", ordersCsv, Object.keys(ordersCsv[0]))}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl flex items-center gap-3 hover:bg-indigo-700 transition shadow-lg"
            >
              <FiDownload className="text-xl" /> خروجی اکسل
            </button>
            <button
              onClick={() => setShowAdvanced(s => !s)}
              className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition"
            >
              {showAdvanced ? "مخفی پیشرفته" : "نمایش پیشرفته"}
            </button>
          </div>
        </div>

        {/* KPI اصلی */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "درآمد کل", value: formatCurrency(KPI.totalRevenue), icon: <PiMoneyWavyBold className="text-4xl text-emerald-600" />, color: "bg-emerald-100" },
            { label: "سود ناخالص", value: formatCurrency(KPI.grossProfit), sub: `حاشیه: ${((KPI.grossProfit / KPI.totalRevenue) * 100).toFixed(1)}%`, icon: <GiProfit className="text-4xl text-green-600" />, color: "bg-green-100" },
            { label: "تعداد سفارش", value: formatNumber(KPI.totalOrders), sub: `AOV: ${formatCurrency(KPI.aov)}`, icon: <MdOutlineShoppingCart className="text-4xl text-blue-600" />, color: "bg-blue-100" },
            { label: "نرخ تبدیل", value: `%${KPI.conversionRate}`, sub: `مرجوعی: %${KPI.refundRate}`, icon: <FiTrendingUp className="text-4xl text-purple-600" />, color: "bg-purple-100" },
          ].map((k, i) => (
            <BaseCard key={i} className="p-6 hover:shadow-2xl transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{k.label}</p>
                  <p className="text-3xl font-bold mt-2">{k.value}</p>
                  {k.sub && <p className="text-xs text-gray-500 mt-2">{k.sub}</p>}
                </div>
                <div className={`p-4 rounded-2xl ${k.color}`}>{k.icon}</div>
              </div>
            </BaseCard>
          ))}
        </div>

        {/* روند فروش + قیف تبدیل */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <BaseCard className="xl:col-span-2">
            <CardHeader title="روند درآمد ماهانه (۱۲ ماه)" icon={<FiTrendingUp />} />
            <div className="h-96 mt-4"><LineChart data={revenueSeries} /></div>
          </BaseCard>
          <BaseCard>
            <CardHeader title="قیف تبدیل فروش" icon={<FiTrendingUp />} />
            <FunnelChart />
          </BaseCard>
        </div>

        {/* ترافیک + شهرها */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BaseCard>
            <CardHeader title="منابع ترافیک" icon={<FiGlobe />} />
            <div className="py-8"><PieChartTraffic /></div>
          </BaseCard>
          <BaseCard>
            <CardHeader title="شهرهای برتر" icon={<FiMapPin />} />
            <Table isStriped removeWrapper>
              <TableHeader>
                <TableColumn>شهر</TableColumn>
                <TableColumn>سفارش</TableColumn>
                <TableColumn>درآمد</TableColumn>
              </TableHeader>
              <TableBody items={topCities}>
                {(c) => (
                  <TableRow key={c.city}>
                    <TableCell className="font-medium">{c.city}</TableCell>
                    <TableCell>{formatNumber(c.orders)}</TableCell>
                    <TableCell>{formatCurrency(c.revenue)}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </BaseCard>
        </div>

        {/* جداول کلیدی */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BaseCard>
            <CardHeader title="پرفروش‌ترین محصولات" icon={<FiShoppingBag />} />
            <Table isStriped removeWrapper>
              <TableHeader>
                <TableColumn>محصول</TableColumn>
                <TableColumn>فروش</TableColumn>
                <TableColumn>درآمد</TableColumn>
                <TableColumn>سود</TableColumn>
                <TableColumn>مرجوعی</TableColumn>
              </TableHeader>
              <TableBody items={productPerformance}>
                {(p) => (
                  <TableRow key={p.sku}>
                    <TableCell>{p.title}</TableCell>
                    <TableCell>{formatNumber(p.sold)}</TableCell>
                    <TableCell>{formatCurrency(p.revenue)}</TableCell>
                    <TableCell className="text-green-600 font-medium">{formatCurrency(p.profit)}</TableCell>
                    <TableCell>{p.returns}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </BaseCard>

          <BaseCard>
            <CardHeader title="روش‌های پرداخت" icon={<FiCreditCard />} />
            <Table isStriped removeWrapper>
              <TableHeader>
                <TableColumn>روش</TableColumn>
                <TableColumn>موفق</TableColumn>
                <TableColumn>ناموفق</TableColumn>
                <TableColumn>حجم</TableColumn>
                <TableColumn>درصد</TableColumn>
              </TableHeader>
              <TableBody items={paymentMethods}>
                {(pm) => (
                  <TableRow key={pm.method}>
                    <TableCell>{pm.method}</TableCell>
                    <TableCell>{formatNumber(pm.success)}</TableCell>
                    <TableCell className="text-red-600">{formatNumber(pm.failed)}</TableCell>
                    <TableCell>{formatCurrency(pm.volume)}</TableCell>
                    <TableCell>%{pm.percent}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </BaseCard>

          <BaseCard>
            <CardHeader title="مرجوعی‌ها" icon={<FiRefreshCcw />} />
            <Table isStriped removeWrapper>
              <TableHeader>
                <TableColumn>شناسه</TableColumn>
                <TableColumn>سفارش</TableColumn>
                <TableColumn>مبلغ</TableColumn>
                <TableColumn>دلیل</TableColumn>
              </TableHeader>
              <TableBody items={refunds}>
                {(r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.id}</TableCell>
                    <TableCell>{r.order}</TableCell>
                    <TableCell>{formatCurrency(r.amount)}</TableCell>
                    <TableCell>{r.reason}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="p-4 text-red-600 font-medium">نرخ مرجوعی کلی: %{KPI.refundRate}</div>
          </BaseCard>

          <BaseCard>
            <CardHeader title="کوپن‌ها و تخفیف‌ها" icon={<FiPercent />} />
            <Table isStriped removeWrapper>
              <TableHeader>
                <TableColumn>کد</TableColumn>
                <TableColumn>تعداد استفاده</TableColumn>
                <TableColumn>تاثیر مالی</TableColumn>
              </TableHeader>
              <TableBody items={coupons}>
                {(c) => (
                  <TableRow key={c.code}>
                    <TableCell className="font-mono">{c.code}</TableCell>
                    <TableCell>{formatNumber(c.uses)}</TableCell>
                    <TableCell>{formatCurrency(c.impact)}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </BaseCard>
        </div>

        {/* تسویه و مالیات */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BaseCard>
            <CardHeader title="تسویه حساب‌ها" icon={<GiReceiveMoney />} />
            <Table isStriped removeWrapper>
              <TableHeader>
                <TableColumn>شناسه</TableColumn>
                <TableColumn>تاریخ</TableColumn>
                <TableColumn>مبلغ</TableColumn>
                <TableColumn>وضعیت</TableColumn>
              </TableHeader>
              <TableBody items={settlements}>
                {(s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.id}</TableCell>
                    <TableCell>{s.date}</TableCell>
                    <TableCell>{formatCurrency(s.amount)}</TableCell>
                    <TableCell>
                      <span className={`px-4 py-1 rounded-full text-sm ${s.status === "پرداخت‌شده" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {s.status}
                      </span>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </BaseCard>

          <BaseCard>
            <CardHeader title="خلاصه مالیات" icon={<GiPayMoney />} />
            <div className="p-8 space-y-6">
              <div className="text-center">
                <p className="text-gray-600">دوره مالیاتی</p>
                <p className="text-xl font-bold">{taxSummary.period}</p>
              </div>
              <div className="space-y-4 text-lg">
                <div className="flex justify-between"><span>مالیات ارزش افزوده</span><span className="font-bold">{formatCurrency(taxSummary.vat)}</span></div>
                <div className="flex justify-between"><span>مالیات بر درآمد</span><span className="font-bold">{formatCurrency(taxSummary.incomeTax)}</span></div>
                <div className="border-t-2 pt-4 flex justify-between text-xl font-bold text-red-600">
                  <span>جمع کل</span><span>{formatCurrency(taxSummary.total)}</span>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>

        {/* جدول سفارشات کامل */}
        <BaseCard>
          <CardHeader title={`جزئیات سفارشات — ${orders.length} سفارش اخیر`} icon={<FiTrendingUp />} />
          <div className="overflow-x-auto">
            <Table isStriped removeWrapper>
              <TableHeader>
                <TableColumn>سفارش</TableColumn>
                <TableColumn>تاریخ</TableColumn>
                <TableColumn>درآمد</TableColumn>
                <TableColumn>تخفیف</TableColumn>
                <TableColumn>ارسال</TableColumn>
                <TableColumn>کارمزد</TableColumn>
                <TableColumn>سود خالص</TableColumn>
                <TableColumn>وضعیت</TableColumn>
              </TableHeader>
              <TableBody items={orders}>
                {(o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-mono">{o.id}</TableCell>
                    <TableCell>{o.date}</TableCell>
                    <TableCell>{formatCurrency(o.revenue)}</TableCell>
                    <TableCell className="text-orange-600">-{formatCurrency(o.discount)}</TableCell>
                    <TableCell className="text-purple-600">-{formatCurrency(o.shipping)}</TableCell>
                    <TableCell className="text-red-600">-{formatCurrency(o.fees)}</TableCell>
                    <TableCell className={`font-bold ${o.profit > 0 ? "text-green-600" : "text-red-600"}`}>
                      {formatCurrency(o.profit)}
                    </TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        o.status === "تکمیل‌شده" ? "bg-green-100 text-green-700" :
                        o.status === "در حال پردازش" ? "bg-blue-100 text-blue-700" :
                        o.status === "در انتظار پرداخت" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>{o.status}</span>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </BaseCard>

        {/* بخش پیشرفته */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BaseCard className="p-8 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              <p className="text-lg opacity-90">CAC</p>
              <p className="text-4xl font-bold mt-2">{formatCurrency(KPI.cac)}</p>
            </BaseCard>
            <BaseCard className="p-8 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
              <p className="text-lg opacity-90">LTV</p>
              <p className="text-4xl font-bold mt-2">{formatCurrency(KPI.ltv)}</p>
              <p className="text-sm mt-2">LTV/CAC = {(KPI.ltv / KPI.cac).toFixed(1)}x</p>
            </BaseCard>
            <BaseCard className="p-8 bg-gradient-to-br from-amber-500 to-orange-600 text-white">
              <p className="text-lg opacity-90">ROAS</p>
              <p className="text-5xl font-bold mt-2">{KPI.roas}x</p>
            </BaseCard>
            <BaseCard className="p-8 bg-gradient-to-br from-pink-500 to-rose-600 text-white">
              <p className="text-lg opacity-90">خرید مجدد</p>
              <p className="text-5xl font-bold mt-2">%{KPI.repeatRate}</p>
            </BaseCard>
          </div>
        )}

        <div className="text-center py-10 text-gray-600 border-t">
          داشبورد مالی کامل eCommerce فارسی | ۱۰۰٪ بدون وابستگی به چارت خارجی | آماده اتصال به API
        </div>
      </div>
    </div>
  );
}