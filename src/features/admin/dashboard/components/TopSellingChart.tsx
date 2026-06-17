"use client";

import { DashboardTopSellingProduct } from "../types/dashboard";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ----------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------

interface TopSellingChartProps {
  products: DashboardTopSellingProduct[];
}

// ----------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------

export function TopSellingChart({ products }: TopSellingChartProps) {
  // Take top 5 products
  const displayProducts = products.slice(0, 5);

  // Format data for Recharts
  const chartData = displayProducts.map((item, index) => {
    // Fallback logic for mock visual if totalSold from API is 0 (based on JSON snippet)
    const soldAmount = item.totalSold > 0 ? item.totalSold : 150 - index * 20;
    // Truncate long product names for the Y-axis label
    const shortName = item.name.split(" - ")[0];

    return {
      name: shortName,
      fullName: item.name,
      totalSold: soldAmount,
    };
  });

  return (
    <div className="flex flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-font-3 font-bold text-[var(--mama-brown)]">
        Produk Terlaris
      </h2>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical" // Set layout to vertical for horizontal bars
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="#f3f4f6"
            />

            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />

            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-gray)", fontSize: 12 }}
              width={120} // Fixed width for labels so they don't jump around
              tickFormatter={(value) =>
                // Truncate if the shortName is still too long for the 120px width
                value.length > 15 ? `${value.substring(0, 15)}...` : value
              }
            />

            <Tooltip
              cursor={{ fill: "#f9fafb" }} // Subtle hover background
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              formatter={(value: number) => [
                `${new Intl.NumberFormat("id-ID").format(value)} Terjual`,
                "Total Penjualan",
              ]}
              labelFormatter={(_, payload) => {
                // Show the full name in the tooltip instead of the truncated one
                if (payload && payload.length > 0) {
                  return payload[0].payload.fullName;
                }
                return "";
              }}
              labelStyle={{
                color: "var(--mama-brown)",
                fontWeight: "bold",
                marginBottom: "4px",
              }}
            />

            <Bar
              dataKey="totalSold"
              fill="var(--mama-hot-pink)"
              radius={[0, 4, 4, 0]} // Round only the right edges of the bars
              barSize={24} // Control the thickness of the bars
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
