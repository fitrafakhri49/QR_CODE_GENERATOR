"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Link as LinkIcon, MousePointer2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
export default function StatsGrid() {
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalLinks, setTotalLinks] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:4000/api/v1/links", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;

        setTotalLinks(data.totalLinks || 0);
        const clicks = data.totalClicks?._sum?.clickCount !== null ? data.totalClicks._sum.clickCount : 0;

        setTotalClicks(clicks);
      } catch (error) {
        console.error("Gagal mengambil statistik:", error);
      }
    };

    fetchStats();
  }, []);

  // Stats dengan data nyata
  const stats = [
    {
      title: "Total Lifetime Clicks",
      value: totalClicks.toLocaleString(),
      icon: <MousePointer2 className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-50",
      trend: "up",
    },
    {
      title: "Total Links Created",
      value: totalLinks.toString(),
      icon: <LinkIcon className="h-5 w-5 text-green-600" />,
      color: "bg-green-50",
      trend: "up",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.trend === "up" ? "text-green-600" : stat.trend === "down" ? "text-red-600" : "text-gray-500"}`}>{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>{stat.icon}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
