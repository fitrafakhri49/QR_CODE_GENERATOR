"use client";

import { Home, Link, BarChart3, Settings, Users, Globe, Zap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const navItems = [
  { icon: <Home className="h-5 w-5" />, label: "Dashboard", active: true },
  { icon: <Link className="h-5 w-5" />, label: "Links", count: 24 },
  { icon: <BarChart3 className="h-5 w-5" />, label: "Analytics" },
  { icon: <Globe className="h-5 w-5" />, label: "Domains" },
  { icon: <Users className="h-5 w-5" />, label: "Team" },
  { icon: <Settings className="h-5 w-5" />, label: "Settings" },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button variant="ghost" size="icon" className="lg:hidden fixed top-4 left-4 z-50" onClick={() => setIsCollapsed(!isCollapsed)}>
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar */}
      <aside
        className={`
        ${isCollapsed ? "-translate-x-full" : "translate-x-0"}
        lg:translate-x-0
        fixed lg:static
        top-0 left-0
        w-64 h-screen
        bg-white border-r
        transition-transform duration-300
        z-40
        flex flex-col
      `}
      >
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Short.ly</h1>
          </div>

          {/* Close Button Mobile */}
          <Button variant="ghost" size="icon" className="lg:hidden absolute top-6 right-4" onClick={() => setIsCollapsed(true)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="p-6 border-b">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Total Clicks</p>
              <p className="text-2xl font-bold">1,248</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Links Active</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <Button variant={item.active ? "secondary" : "ghost"} className="w-full justify-start">
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                  {item.count && <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{item.count}</span>}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        <Separator />

        {/* User Profile */}
        <div className="p-4">
          <Button variant="ghost" className="w-full justify-start">
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center mr-3">
              <span className="text-sm font-medium">AK</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium">Ahmad Kurniawan</p>
              <p className="text-xs text-gray-500">Free Plan</p>
            </div>
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {!isCollapsed && <div className="fixed inset-0 bg-black/50 lg:hidden z-30" onClick={() => setIsCollapsed(true)} />}
    </>
  );
}
