import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Globe, Users, BarChart3, Download, Settings } from "lucide-react";

const actions = [
  { icon: <QrCode className="h-5 w-5" />, label: "Create QR Code", color: "bg-purple-100 text-purple-600" },
  { icon: <Globe className="h-5 w-5" />, label: "Add Domain", color: "bg-blue-100 text-blue-600" },
  { icon: <Users className="h-5 w-5" />, label: "Invite Team", color: "bg-green-100 text-green-600" },
  { icon: <BarChart3 className="h-5 w-5" />, label: "View Reports", color: "bg-orange-100 text-orange-600" },
  { icon: <Download className="h-5 w-5" />, label: "Export Data", color: "bg-indigo-100 text-indigo-600" },
  { icon: <Settings className="h-5 w-5" />, label: "Settings", color: "bg-gray-100 text-gray-600" },
];

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <Button key={action.label} variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2 hover:shadow-md">
              <div className={`p-2 rounded-lg ${action.color}`}>{action.icon}</div>
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
