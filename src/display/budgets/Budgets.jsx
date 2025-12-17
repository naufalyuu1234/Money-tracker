import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreVertical,
  Utensils,
  Bus,
  ShoppingBag,
  Zap,
  Wallet
} from "lucide-react";

// Komponen Header untuk halaman budgets
const BudgetHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      {/* 1. BAGIAN KIRI: Kontrol Tanggal */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
          <ChevronLeft size={20} className="text-gray-600" />
        </button>

        <div className="text-center">
          <h2 className="text-lg font-bold text-gray-800">Desember 2025</h2>
          <p className="text-xs text-gray-500">Total Budget: Rp 5.000.000</p>
        </div>

        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>

      {/* 2. BAGIAN KANAN: Action Buttons */}
      <div className="flex gap-3 w-full sm:w-auto">
        {/* Filter Button (Opsional) */}
        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex-1 sm:flex-none">
          <Filter size={16} />
          <span>Filter</span>
        </button>

        {/* Add Button (Utama) */}
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition shadow-md flex-1 sm:flex-none">
          <Plus size={16} />
          <span className="font-semibold">Buat Budget</span>
        </button>
      </div>
    </div>
  );
};

// Komponen budgets list
const BudgetsList = () => {
  // Dummy Data (Nanti ini dari database/state)
  const budgets = [
    {
      id: 1,
      category: "Makanan & Minuman",
      icon: <Utensils size={20} className="text-orange-500" />,
      limit: 2000000,
      spent: 1250000,
      color: "bg-orange-100",
    },
    {
      id: 2,
      category: "Transportasi",
      icon: <Bus size={20} className="text-blue-500" />,
      limit: 1000000,
      spent: 950000, // Hampir habis
      color: "bg-blue-100",
    },
    {
      id: 3,
      category: "Belanja",
      icon: <ShoppingBag size={20} className="text-pink-500" />,
      limit: 1500000,
      spent: 400000,
      color: "bg-pink-100",
    },
    {
      id: 4,
      category: "Listrik & Air",
      icon: <Zap size={20} className="text-yellow-500" />,
      limit: 500000,
      spent: 600000, // Over budget
      color: "bg-yellow-100",
    },
  ];

  // Helper untuk format Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  // Helper untuk menentukan warna progress bar
  const getProgressColor = (percent) => {
    if (percent >= 100) return "bg-red-500"; // Bahaya/Over
    if (percent >= 75) return "bg-yellow-500"; // Warning
    return "bg-emerald-500"; // Aman
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {budgets.map((item) => {
        // Hitung persentase
        const percentage = Math.min((item.spent / item.limit) * 100, 100);
        const isOver = item.spent > item.limit;

        return (
          <div
            key={item.id}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-200"
          >
            {/* Header Card: Icon & Nama */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${item.color}`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {item.category}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {isOver
                      ? "Over Budget!"
                      : `${100 - Math.round(percentage)}% Tersisa`}
                  </p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={18} />
              </button>
            </div>

            {/* Nominal */}
            <div className="flex justify-between items-end mb-2">
              <span className="text-2xl font-bold text-gray-800">
                {formatRupiah(item.spent)}
              </span>
              <span className="text-xs text-gray-500 mb-1">
                dari {formatRupiah(item.limit)}
              </span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2 overflow-hidden">
              <div
                className={`h-2.5 rounded-full ${getProgressColor(
                  (item.spent / item.limit) * 100
                )} transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>

            {/* Info Sisa Uang */}
            <div className="text-right">
              <span
                className={`text-xs font-medium ${
                  isOver ? "text-red-500" : "text-gray-500"
                }`}
              >
                {isOver
                  ? `Berlebih: ${formatRupiah(item.spent - item.limit)}`
                  : `Sisa: ${formatRupiah(item.limit - item.spent)}`}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Komponen Alokasi Kesimpulan budgets
const AllocationSummary = () => {
  // Anggap ini data dari Database/State utama
  const totalIncome = 10000000; // Pemasukan bulan ini
  const totalBudgeted = 8500000; // Total limit semua budget yang sudah dibuat
  const leftToBudget = totalIncome - totalBudgeted; // Sisa uang "bebas"

  // Hitung persentase alokasi
  const allocationPercent = (totalBudgeted / totalIncome) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* 1. Card Total Pemasukan */}
      <div className="bg-indigo-600 rounded-xl p-5 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-indigo-200 text-sm font-medium mb-1">
            Total Pemasukan
          </p>
          <h3 className="text-2xl font-bold">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(totalIncome)}
          </h3>
        </div>
        <Wallet
          className="absolute right-4 bottom-4 text-indigo-500 opacity-50"
          size={48}
        />
      </div>

      {/* 2. Card Status Alokasi (Progress) */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 md:col-span-2 flex flex-col justify-center">
        <div className="flex justify-between items-end mb-2">
          <div>
            <h4 className="text-gray-800 font-bold text-lg">
              Status Alokasi Budget
            </h4>
            <p className="text-sm text-gray-500">
              {leftToBudget >= 0
                ? "Kamu masih punya uang untuk dibudgetkan"
                : "Waduh! Budgetmu melebihi pemasukan"}
            </p>
          </div>
          <div className="text-right">
            <span
              className={`text-xl font-bold ${
                leftToBudget < 0 ? "text-red-500" : "text-emerald-600"
              }`}
            >
              {leftToBudget >= 0 ? "+" : ""}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(leftToBudget)}
            </span>
            <p className="text-xs text-gray-400">
              {leftToBudget >= 0 ? "Belum dialokasikan" : "Defisit"}
            </p>
          </div>
        </div>

        {/* Bar Alokasi */}
        <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden flex">
          {/* Bagian yang sudah dibudgetkan */}
          <div
            className="bg-indigo-500 h-full transition-all duration-500"
            style={{ width: `${Math.min(allocationPercent, 100)}%` }}
          ></div>
          {/* Bagian indikator jika over (merah) */}
          {allocationPercent > 100 && (
            <div className="bg-red-500 h-full flex-1 animate-pulse"></div>
          )}
        </div>

        <div className="mt-2 flex justify-between text-xs text-gray-400">
          <span>0%</span>
          <span>{Math.round(allocationPercent)}% Terpakai</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default function Budgets() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <BudgetHeader />
      <BudgetsList />
      <div className="pt-8">
        <AllocationSummary />
      </div>
    </div>
  );
}
