"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 z-30 w-full border-b bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 md:px-6">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold italic">QR</div>
          <span className="text-lg font-bold tracking-tight text-slate-900">Short Link & QR</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Masuk</Link>
          </Button>

          <Button asChild className="bg-[#0c3ebe] hover:bg-[#0a34a1]">
            <Link href="/auth/register">Mulai Gratis</Link>
          </Button>
        </nav>

        {/* MOBILE MENU */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[280px] pt-6">
              {/* Mobile Logo */}
              <div className="flex items-center gap-2 mb-6 p-2">
                <div className="h-8 w-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold italic">QR</div>
                <span className="text-lg font-bold">Short Link & QR</span>
              </div>

              {/* Mobile Actions */}
              <div className="flex flex-col gap-3">
                <Button variant="outline" asChild>
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                    Masuk
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
