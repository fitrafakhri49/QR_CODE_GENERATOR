"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import LogoutButton from "@/components/ui/LogoutButton";
import { Menu, Plus } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Home, Link as LinkIcon, QrCode, BarChart2, Settings } from "lucide-react";
import ShortenModal from "../modal/ShortenModal";

interface JwtPayload {
  email: string;
  user_metadata: {
    full_name?: string;
    name?: string;
  };
  // Supabase JWT juga memiliki properti aud, sub, exp, dll.
}

interface UserMetadata {
  email: string;
  displayName: string;
}
export default function Header() {
  const [userData, setUserData] = useState<UserMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const fetchUserDataFromToken = useCallback(() => {
    setLoading(true);
    setUserData(null);

    // 1. Ambil token dari Local Storage
    const token = localStorage.getItem("authToken");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // 2. Dekode token
      const decoded = jwtDecode<JwtPayload>(token);

      // 3. Ekstrak data
      const email = decoded.email || "N/A";

      // Ambil nama dari user_metadata (jika ada) atau gunakan bagian pertama email
      const rawDisplayName = decoded.user_metadata?.full_name || decoded.user_metadata?.name || email.split("@")[0];

      setUserData({
        email: email,
        displayName: rawDisplayName,
      });
    } catch (error) {
      // Ini akan menangani jika token tidak valid atau kadaluarsa
      console.error("Gagal mendekode token:", error);
      localStorage.removeItem("authToken"); // Hapus token yang rusak
    } finally {
      setLoading(false);
    }
  }, []);

  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: "Home", href: "/dashboard" },
    { icon: <LinkIcon className="w-5 h-5" />, label: "Links", href: "/dashboard/links" },
    { icon: <QrCode className="w-5 h-5" />, label: "QR Codes", href: "/dashboard/qr" },
    { icon: <BarChart2 className="w-5 h-5" />, label: "Analytics", href: "/dashboard/analytics" },
  ];

  useEffect(() => {
    fetchUserDataFromToken();
    // Karena kita hanya membaca Local Storage, kita tidak perlu listener realtime seperti pada supabase.auth.onAuthStateChange
  }, [fetchUserDataFromToken]);

  // Fungsi helper untuk menampilkan data atau placeholder
  const getUserDisplayName = () => userData?.displayName || "Pengguna";
  const getUserEmail = () => userData?.email || "N/A";
  const getUserInitial = () => {
    const name = getUserDisplayName();
    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b h-16 flex items-center px-4 md:px-8">
      {/* MOBILE: LOGO */}
      <div className="md:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold text-sm">QR</div>
          <span className="font-bold text-slate-900 text-sm">Short Link & QR</span>
        </Link>
      </div>

      {/* SPACER */}
      <div className="flex-1" />

      {/* MOBILE: HAMBURGER */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[280px] pt-6">
            {/* USER INFO */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                <span className="text-sm font-semibold text-white">{getUserInitial()}</span>
              </div>
              <div>
                <p className="text-sm font-medium">{getUserDisplayName()}</p>
                <p className="text-xs text-slate-500">{getUserEmail()}</p>
              </div>
            </div>

            <ShortenModal>
              <Button className="w-full mb-6 bg-[#0c3ebe] hover:bg-[#0a34a1]">
                <Plus className="mr-2 h-4 w-4" /> Create new
              </Button>
            </ShortenModal>

            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100">
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-6 border-t pt-4">
              <LogoutButton variant="ghost" size="sm" className="w-full justify-start text-red-600" showIcon label="Log out" />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* DESKTOP: USER DROPDOWN (INI YANG TADI HILANG) */}
      <div className="hidden md:flex ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 rounded-full p-1 pl-3 pr-4 hover:bg-gray-100">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                <span className="text-sm font-semibold text-white">{getUserInitial()}</span>
              </div>

              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-gray-900">{getUserDisplayName()}</span>
                <span className="text-xs text-gray-500">{getUserEmail()}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="p-0">
              <LogoutButton variant="ghost" size="sm" className="w-full justify-start text-red-600" showIcon label="Log out" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
