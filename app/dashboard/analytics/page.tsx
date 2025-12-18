// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
// import { Calendar, Download, TrendingUp, MousePointer2, Link as LinkIcon } from "lucide-react";
// import Sidebar from "@/app/components/dashboard/Sidebar";
// import Header from "@/app/components/dashboard/Header";
// import { Button } from "@/components/ui/button";

// const API_URL = "http://localhost:4000/api/v1";
// const COLORS = ["#0c3ebe", "#36a2eb", "#ffcd56"];

// export default function AnalyticsPage() {
//   const [chartData, setChartData] = useState([]);
//   const [stats, setStats] = useState({ totalClicks: 0, totalLinks: 0 });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       const token = localStorage.getItem("authToken");
//       try {
//         // Ambil data statistik ringkasan
//         const resStats = await axios.get(`${API_URL}/links`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const data = resStats.data;
//         const totalClicks = data.totalClicks?._sum?.clickCount ?? 0;
//         setStats({ totalClicks, totalLinks: data.totalLinks || 0 });

//         // Simulasi/Ambil data untuk Chart (Sesuaikan dengan endpoint backend kamu nanti)
//         // Jika backend belum ada data chart, kita buat mapping sederhana dari data links
//         const mockChartData = [
//           { date: "12 Dec", clicks: Math.floor(totalClicks * 0.1) },
//           { date: "13 Dec", clicks: Math.floor(totalClicks * 0.15) },
//           { date: "14 Dec", clicks: Math.floor(totalClicks * 0.05) },
//           { date: "15 Dec", clicks: Math.floor(totalClicks * 0.2) },
//           { date: "16 Dec", clicks: Math.floor(totalClicks * 0.25) },
//           { date: "17 Dec", clicks: Math.floor(totalClicks * 0.1) },
//           { date: "18 Dec", clicks: Math.floor(totalClicks * 0.15) },
//         ];
//         setChartData(mockChartData);
//       } catch (err) {
//         console.error("Error fetch analytics:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAnalytics();
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#f4f6fa]">
//       <Sidebar />
//       <div className="md:ml-64">
//         <Header />
//         <main className="p-8">
//           <div className="flex justify-between items-center mb-8">
//             <h1 className="text-3xl font-bold text-slate-800">Analytics</h1>
//           </div>

//           {/* Stat Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <StatCard title="Total Clicks" value={stats.totalClicks} icon={<MousePointer2 />} color="text-blue-600" />
//             <StatCard title="Links Dibuat" value={stats.totalLinks} icon={<LinkIcon />} color="text-green-600" />
//             <StatCard title="Avg. CTR" value="4.2%" icon={<TrendingUp />} color="text-purple-600" />
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Chart Utama */}
//             <div className="lg:col-span-2 bg-white p-6 rounded-xl border shadow-sm">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="font-bold text-slate-800">Click Performance</h3>
//                 <div className="text-sm text-slate-500 flex items-center gap-2">
//                   <Calendar className="h-4 w-4" /> Last 7 Days
//                 </div>
//               </div>
//               <div className="h-72 w-full">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={chartData}>
//                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//                     <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
//                     <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
//                     <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
//                     <Line type="monotone" dataKey="clicks" stroke="#0c3ebe" strokeWidth={3} dot={{ r: 4, fill: "#0c3ebe" }} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* Device Distribution (DUMMY) */}
//             <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col">
//               <h3 className="font-bold text-slate-800 mb-6">Devices</h3>
//               <div className="flex-1 min-h-[200px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={[
//                         { name: "Desktop", value: 70 },
//                         { name: "Mobile", value: 30 },
//                       ]}
//                       innerRadius={60}
//                       outerRadius={80}
//                       dataKey="value"
//                     >
//                       <Cell fill="#0c3ebe" />
//                       <Cell fill="#36a2eb" />
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//               <div className="mt-4 space-y-2">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-slate-500">Desktop</span>
//                   <span className="font-bold">70%</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-slate-500">Mobile</span>
//                   <span className="font-bold">30%</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// function StatCard({ title, value, icon, color }: any) {
//   return (
//     <div className="bg-white p-6 rounded-xl border shadow-sm">
//       <div className="flex items-center gap-4">
//         <div className={`p-3 rounded-lg bg-slate-50 ${color}`}>{icon}</div>
//         <div>
//           <p className="text-sm font-medium text-slate-500">{title}</p>
//           <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { MousePointer2, Link as LinkIcon, Download, BarChart3 } from "lucide-react";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Header from "@/app/components/dashboard/Header";
import { Button } from "@/components/ui/button";

const API_URL = "http://localhost:4000/api/v1";
const COLORS = ["#0c3ebe", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];

export default function AnalyticsPage() {
  const [linksData, setLinksData] = useState([]);
  const [stats, setStats] = useState({ totalClicks: 0, totalLinks: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const res = await axios.get(`${API_URL}/links`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;
        const clicks = data.totalClicks?._sum?.clickCount ?? 0;

        setStats({
          totalLinks: data.totalLinks || 0,
          totalClicks: clicks,
        });

        // Mengambil 5 link teratas berdasarkan jumlah klik untuk grafik
        const topLinks = (data.data || [])
          .sort((a: any, b: any) => b.clickCount - a.clickCount)
          .slice(0, 5)
          .map((item: any) => ({
            name: item.shortUrl.split("/").pop(), // Ambil kode uniknya saja
            clicks: item.clickCount,
          }));

        setLinksData(topLinks);
      } catch (error) {
        console.error("Gagal mengambil statistik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f6fa]">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Analytics Overview</h1>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
              <div className="p-4 bg-blue-50 rounded-lg text-blue-600">
                <MousePointer2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Lifetime Clicks</p>
                <h3 className="text-3xl font-bold text-slate-800">{stats.totalClicks.toLocaleString()}</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
              <div className="p-4 bg-green-50 rounded-lg text-green-600">
                <LinkIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Links Created</p>
                <h3 className="text-3xl font-bold text-slate-800">{stats.totalLinks}</h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bar Chart: Top Links */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" /> Top 5 Performing Links
              </h3>
              <div className="h-80 w-full">
                {linksData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={linksData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} />
                      <Tooltip cursor={{ fill: "#f8fafc" }} />
                      <Bar dataKey="clicks" fill="#0c3ebe" radius={[0, 4, 4, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400">Belum ada data klik</div>
                )}
              </div>
            </div>

            {/* Pie Chart: Click Share */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6">Click Distribution</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={linksData} dataKey="clicks" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80}>
                      {linksData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
