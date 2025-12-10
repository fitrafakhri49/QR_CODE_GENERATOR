import { Card, CardContent } from "@/components/ui/card";
import { Activity, Link as LinkIcon, Globe, Users, TrendingUp, Clock } from "lucide-react";

const stats = [
  {
    title: "Total Clicks",
    value: "1,248",
    change: "+12.5%",
    icon: <Activity className="h-5 w-5 text-blue-600" />,
    color: "bg-blue-50",
    trend: "up",
  },
  {
    title: "Active Links",
    value: "24",
    change: "+2",
    icon: <LinkIcon className="h-5 w-5 text-green-600" />,
    color: "bg-green-50",
    trend: "up",
  },
];

export default function StatsGrid() {
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
