"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Link as LinkIcon, QrCode, BarChart2, Settings, Plus, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShortenModal from "../modal/ShortenModal";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: "Home", href: "/dashboard" },
    { icon: <LinkIcon className="w-5 h-5" />, label: "Links", href: "/dashboard/links" },
    { icon: <QrCode className="w-5 h-5" />, label: "QR Codes", href: "/dashboard/qr" },
    { icon: <BarChart2 className="w-5 h-5" />, label: "Analytics", href: "/dashboard/analytics" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r flex flex-col z-40 hidden md:flex">
      {/* Logo Area */}
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold italic">QR</div>
          <span className="text-xl font-bold tracking-tight text-slate-900">Short Link & QR</span>
        </Link>

        <ShortenModal>
          <Button className="w-full bg-[#0c3ebe] hover:bg-[#0a34a1] text-white font-semibold py-6 rounded-md shadow-sm">
            <Plus className="mr-2 h-5 w-5" /> Create new
          </Button>
        </ShortenModal>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${pathname === item.href ? "bg-[#e8ebf4] text-[#0c3ebe]" : "text-slate-600 hover:bg-slate-100"}`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t">
        <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium">
          <Settings className="w-5 h-5" /> Settings
        </Link>
      </div>
    </aside>
  );
}
