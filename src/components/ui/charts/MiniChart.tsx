"use client";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const MiniChart = ({ data, color = "#3b82f6" }: any) => {
  return (
    // ✅ عرض بیشتر برای خوانایی بهتر (مثلاً w-72 یا حتی full)
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 10, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          {/* ✅ محور X با همه ماه‌ها و فضای بیشتر بین تیک‌ها */}
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11 }}
            interval={0}
            angle={-25}
            textAnchor="end"
            height={50} // ارتفاع محور X برای فاصله از پایین
          />

          {/* ✅ Tooltip فارسی و زیبا */}
          <Tooltip
            formatter={(value) => [`${value.toLocaleString()}`, "مقدار"]}
            labelFormatter={(label) => `ماه: ${label}`}
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "12px",
              direction: "rtl",
            }}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MiniChart;
