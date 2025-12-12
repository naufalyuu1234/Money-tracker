import React, { useState } from "react";
import { Wallet, TrendingUp, Eye, EyeOff, Plus, Bell, Settings, ChevronDown } from "lucide-react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
} from "recharts";

// Header Component
const Header = () => {
    const [showBalance, setShowBalance] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState("Desember 2024");
    
    // Simulasi data
    const totalBalance = 15750000;
    const userName = "Budi Santoso";
    
    // Greeting berdasarkan waktu
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Selamat Pagi";
        if (hour < 15) return "Selamat Siang";
        if (hour < 18) return "Selamat Sore";
        return "Selamat Malam";
    };
    
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };
    
    return (
        <header className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl mb-8 overflow-hidden">
            {/* Top Section - Branding & User Info */}
            <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-6">
                    {/* Branding */}
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                            <Wallet className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Money Tracker</h1>
                            <p className="text-emerald-100 text-xs flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                Tidak harus menjadi kaya untuk menabung
                            </p>
                        </div>
                    </div>
                    
                    {/* User Info & Actions */}
                    <div className="flex items-center gap-3">
                        {/* Notifications */}
                        <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Bell className="w-5 h-5 text-white" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        
                        {/* Settings */}
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Settings className="w-5 h-5 text-white" />
                        </button>
                        
                        {/* User Profile */}
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 cursor-pointer hover:bg-white/20 transition-colors">
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                {userName.charAt(0)}
                            </div>
                            <div className="text-left">
                                <p className="text-white text-sm font-medium">{userName}</p>
                                <p className="text-emerald-100 text-xs">{getGreeting()}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Balance & Period Section */}
                <div className="flex items-end justify-between">
                    {/* Quick Balance Display */}
                    <div>
                        <p className="text-emerald-100 text-sm mb-1">Total Saldo Anda</p>
                        <div className="flex items-center gap-3">
                            <h2 className="text-4xl font-bold text-white">
                                {showBalance ? formatCurrency(totalBalance) : "Rp •••••••"}
                            </h2>
                            <button 
                                onClick={() => setShowBalance(!showBalance)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                {showBalance ? 
                                    <Eye className="w-5 h-5 text-white" /> : 
                                    <EyeOff className="w-5 h-5 text-white" />
                                }
                            </button>
                        </div>
                    </div>
                    
                    {/* Period Selector */}
                    <div className="flex items-center gap-2">
                        <select 
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-white/20 transition-colors appearance-none pr-8 font-medium"
                        >
                            <option value="Desember 2024">Desember 2024</option>
                            <option value="November 2024">November 2024</option>
                            <option value="Oktober 2024">Oktober 2024</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-white -ml-7 pointer-events-none" />
                    </div>
                </div>
            </div>
            
            {/* Bottom Section - Quick Actions */}
            <div className="bg-white/10 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
                <p className="text-emerald-50 text-sm">Kelola keuangan Anda dengan bijak</p>
                <button className="flex items-center gap-2 bg-white text-emerald-600 px-5 py-2.5 rounded-lg font-semibold hover:bg-emerald-50 transition-colors shadow-lg">
                    <Plus className="w-5 h-5" />
                    Tambah Transaksi
                </button>
            </div>
        </header>
    )
}

// Summary Overview Component
const SummaryCard = () =>{
    return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Card Pemasukan */}
                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-emerald-50 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-emerald-500" />
                        </div>
                        <span className="text-xs text-gray-500 bg-emerald-50 px-2 py-1 rounded-full">
                            Bulan Ini
                        </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">Total Pemasukan</p>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        Rp 8.500.000
                    </h3>
                    <div className="flex items-center gap-1 text-emerald-600 text-sm">
                        <TrendingUp className="w-4 h-4" />
                        <span>+12% dari bulan lalu</span>
                    </div>
                </div>

                {/* Card Pengeluaran */}
                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-red-50 rounded-lg">
                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                            </svg>
                        </div>
                        <span className="text-xs text-gray-500 bg-red-50 px-2 py-1 rounded-full">
                            Bulan Ini
                        </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">Total Pengeluaran</p>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        Rp 5.250.000
                    </h3>
                    <div className="flex items-center gap-1 text-red-600 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                        <span>+8% dari bulan lalu</span>
                    </div>
                </div>

                {/* Card Tabungan */}
                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <Wallet className="w-6 h-6 text-blue-500" />
                        </div>
                        <span className="text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded-full">
                            Bulan Ini
                        </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">Total Tabungan</p>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        Rp 3.250.000
                    </h3>
                    <div className="flex items-center gap-1 text-blue-600 text-sm">
                        <TrendingUp className="w-4 h-4" />
                        <span>38% dari pemasukan</span>
                    </div>
                </div>
            </div>
    )
}

// Chart Grafik Component (Placeholder)
const Chart = () => {
    return (
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Line Chart - Pemasukan vs Pengeluaran */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Tren Keuangan</h3>
                            <p className="text-sm text-gray-500">6 Bulan Terakhir</p>
                        </div>
                        <div className="flex gap-4 text-xs">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                                <span className="text-gray-600">Pemasukan</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span className="text-gray-600">Pengeluaran</span>
                            </div>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={[
                            { bulan: 'Jul', pemasukan: 7200000, pengeluaran: 5800000 },
                            { bulan: 'Agu', pemasukan: 7500000, pengeluaran: 6100000 },
                            { bulan: 'Sep', pemasukan: 7800000, pengeluaran: 5500000 },
                            { bulan: 'Okt', pemasukan: 8000000, pengeluaran: 5900000 },
                            { bulan: 'Nov', pemasukan: 7600000, pengeluaran: 4800000 },
                            { bulan: 'Des', pemasukan: 8500000, pengeluaran: 5250000 },
                        ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis 
                                dataKey="bulan" 
                                stroke="#9ca3af"
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis 
                                stroke="#9ca3af"
                                style={{ fontSize: '12px' }}
                                tickFormatter={(value) => `${value/1000000}jt`}
                            />
                            <Tooltip 
                                formatter={(value) => new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                    minimumFractionDigits: 0
                                }).format(value)}
                                contentStyle={{ 
                                    backgroundColor: 'white',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    fontSize: '12px'
                                }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="pemasukan" 
                                stroke="#10b981" 
                                strokeWidth={3}
                                dot={{ fill: '#10b981', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="pengeluaran" 
                                stroke="#ef4444" 
                                strokeWidth={3}
                                dot={{ fill: '#ef4444', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart - Kategori Pengeluaran */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-800">Kategori Pengeluaran</h3>
                        <p className="text-sm text-gray-500">Bulan Ini</p>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={[
                                    { name: 'Makanan', value: 1800000, color: '#f59e0b' },
                                    { name: 'Transport', value: 950000, color: '#3b82f6' },
                                    { name: 'Belanja', value: 1200000, color: '#ec4899' },
                                    { name: 'Tagihan', value: 800000, color: '#8b5cf6' },
                                    { name: 'Lainnya', value: 500000, color: '#6b7280' },
                                ]}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {[
                                    { name: 'Makanan', value: 1800000, color: '#f59e0b' },
                                    { name: 'Transport', value: 950000, color: '#3b82f6' },
                                    { name: 'Belanja', value: 1200000, color: '#ec4899' },
                                    { name: 'Tagihan', value: 800000, color: '#8b5cf6' },
                                    { name: 'Lainnya', value: 500000, color: '#6b7280' },
                                ].map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip 
                                formatter={(value) => new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                    minimumFractionDigits: 0
                                }).format(value)}
                                contentStyle={{ 
                                    backgroundColor: 'white',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    fontSize: '12px'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        {[
                            { name: 'Makanan', value: 1800000, color: '#f59e0b' },
                            { name: 'Transport', value: 950000, color: '#3b82f6' },
                            { name: 'Belanja', value: 1200000, color: '#ec4899' },
                            { name: 'Tagihan', value: 800000, color: '#8b5cf6' },
                            { name: 'Lainnya', value: 500000, color: '#6b7280' },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div 
                                    className="w-3 h-3 rounded-full" 
                                    style={{ backgroundColor: item.color }}
                                ></div>
                                <span className="text-xs text-gray-600">
                                    {item.name}: {new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(item.value)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    )
}

export default function Overview() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <Header />
            <SummaryCard />
            <Chart />
            
            {/* Placeholder untuk komponen lainnya */}
            <div className="text-center text-gray-400 py-12">
                <p>Dashboard content will go here...</p>
            </div>
        </div>
    );
}