import React, { useState } from "react";
import {
  Calendar,
  Download,
  ChevronDown,
  PieChart as PieIcon,
  BarChart3,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// 1. Komponen Header Laporan (Filter & Kontrol)
const ReportHeader = ({ period, setPeriod, type, setType }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
      {/* Kiri: Judul & Periode */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
          <BarChart3 size={24} />
        </div>
        <div>
          <h2 className="font-bold text-gray-800 text-lg">Laporan Keuangan</h2>
          <p className="text-xs text-gray-500">
            Analisis pengeluaran & pemasukan
          </p>
        </div>
      </div>

      {/* Kanan: Filter Actions */}
      <div className="flex flex-wrap gap-2 w-full md:w-auto">
        {/* Dropdown Periode */}
        <div className="relative">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="appearance-none pl-10 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="this_month">Bulan Ini</option>
            <option value="last_month">Bulan Lalu</option>
            <option value="last_3_months">3 Bulan Terakhir</option>
            <option value="this_year">Tahun Ini</option>
          </select>
          <Calendar
            className="absolute left-3 top-2.5 text-gray-400"
            size={16}
          />
          <ChevronDown
            className="absolute right-3 top-2.5 text-gray-400"
            size={16}
          />
        </div>

        {/* Filter Tipe (Income/Expense) */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setType("ALL")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              type === "ALL"
                ? "bg-white shadow-sm text-gray-800"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setType("EXPENSE")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              type === "EXPENSE"
                ? "bg-white shadow-sm text-red-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Pengeluaran
          </button>
          <button
            onClick={() => setType("INCOME")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              type === "INCOME"
                ? "bg-white shadow-sm text-emerald-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Pemasukan
          </button>
        </div>

        {/* Tombol Export (Hiasan dulu) */}
        <button
          className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600"
          title="Export PDF"
        >
          <Download size={20} />
        </button>
      </div>
    </div>
  );
};

// 2. Komponen Chart Utama (Trend Analysis)
const TrendAnalysis = () => {
  // Dummy Data Tren
  const data = [
    { name: "Min 1", income: 2500000, expense: 1200000 },
    { name: "Min 2", income: 1000000, expense: 1500000 }, // Boros disini
    { name: "Min 3", income: 3000000, expense: 900000 },
    { name: "Min 4", income: 1500000, expense: 2000000 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center mb-6 ">
        <h3 className="font-bold text-gray-800 text-xs md:text-base whitespace-nowrap">Tren Arus Kas</h3>
        <div className="flex flex-col md:flex-row justify-start gap-2 text-sm mb-6 mt-2">
          <div className="flex items-center gap-2 md-gap-4 text-[10px] md:text-base">
            <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-emerald-500"></span>
            <span className="text-gray-600">Pemasukan</span>
          </div>
          <div className="flex items-center gap-2 md-gap-4 text-[10px] md:text-base">
            <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></span>
            <span className="text-gray-600">Pengeluaran</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f3f4f6"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              cursor={{ fill: "#f9fafb" }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Bar
              dataKey="income"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="expense"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// 3. Komponen Breakdown Kategori (Pie + List)
// 3. Komponen Breakdown Kategori (Updated: Compact & Responsive)
const CategoryBreakdown = () => {
  const data = [
    { name: "Makanan", value: 1500000, color: "#f59e0b" },
    { name: "Transport", value: 800000, color: "#3b82f6" },
    { name: "Belanja", value: 1200000, color: "#ec4899" },
    { name: "Tagihan", value: 2000000, color: "#8b5cf6" },
  ];

  const totalExpense = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chart Section - Tetap sama */}
      <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4">Proporsi Pengeluaran</h3>
        <div className="h-[250px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-xs text-gray-500">Total</p>
            <p className="font-bold text-gray-800">5.5jt</p>
          </div>
        </div>
      </div>

      {/* Detail List Section - Updated */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-800">Detail Kategori</h3>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            Lihat Semua
          </button>
        </div>

        <div className="space-y-4">
          {data.map((item, index) => {
            // Logic menghitung persentase
            const percentage = Math.round((item.value / totalExpense) * 100);

            // Logic pewarnaan (> 70% jadi merah tebal)
            const percentStyle =
              percentage > 70
                ? "text-red-500 font-bold"
                : "text-gray-400 font-normal";

            return (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border-b border-gray-50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  {/* Icon Kategori */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-opacity-10 shrink-0"
                    style={{
                      backgroundColor: `${item.color}20`,
                      color: item.color,
                    }}
                  >
                    <PieIcon size={18} />
                  </div>

                  {/* Nama & Persentase (Side by Side) */}
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800 text-sm md:text-base">
                      {item.name}
                    </span>
                    <span className={`text-xs ${percentStyle}`}>
                      {percentage}%
                    </span>
                  </div>
                </div>

                {/* Nominal Uang */}
                <div className="text-right">
                  <p className="font-bold text-gray-800 text-sm md:text-base">
                    Rp {item.value.toLocaleString("id-ID")}
                  </p>
                  <p className="text-[10px] md:text-xs text-gray-500">
                    12 Transaksi
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function Reports() {
  const [period, setPeriod] = useState("this_month");
  const [type, setType] = useState("ALL");

  return (
    <div className="p-6 md:p-8 min-h-screen bg-gray-50">
      <ReportHeader
        period={period}
        setPeriod={setPeriod}
        type={type}
        setType={setType}
      />

      {/* Konten Utama */}
      <div className="space-y-6">
        <TrendAnalysis />
        <CategoryBreakdown />
      </div>
    </div>
  );
}
