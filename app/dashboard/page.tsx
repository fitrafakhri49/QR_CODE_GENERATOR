import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link as LinkIcon, Globe, BarChart3, Plus } from "lucide-react";
import StatsGrid from "@/app/components/dashboard/StatsGrid";
import LinksTable from "@/app/components/dashboard/LinksTable";
import QuickActions from "@/app/components/dashboard/QuickActions";
import Header from "../components/dashboard/Header";

export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* Header dengan Create Link */}
      <Header />
      <div className=" rounded-xl p-6 text-black">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="w-full lg:w-auto"></div>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid />
      <LinksTable />
    </div>
  );
}
