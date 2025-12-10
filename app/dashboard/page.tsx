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

      {/* Tabs untuk Konten */}
      <Tabs defaultValue="links" className="space-y-4">
        <TabsContent value="links" className="space-y-4">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Links</CardTitle>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center border-2 border-dashed rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Analytics charts will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
