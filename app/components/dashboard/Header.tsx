"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import LogoutButton from "@/components/ui/LogoutButton";
import { Plus, Filter, Link, PieChart } from "lucide-react";
import ShortenModal from "../modal/ShortenModal";
export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 ml-4">
          <ShortenModal>
            {/* Tombol yang Anda inginkan sebagai pemicu (trigger) */}
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New
            </Button>
          </ShortenModal>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 rounded-full p-1 pl-3 pr-4 hover:bg-gray-100 dark:hover:bg-gray-800">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">{/* <span className="text-sm font-semibold text-white">{getUserInitial()}</span> */}</div>
              <div className="flex flex-col items-start">
                {/* <span className="text-sm font-medium text-gray-900 dark:text-white">{getUserDisplayName()}</span> */}
                {/* <span className="text-xs text-gray-500 dark:text-gray-400">{getUserEmail()}</span> */}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                {/* <p className="text-sm font-medium leading-none">{getUserDisplayName()}</p> */}
                {/* <p className="text-xs leading-none text-gray-500">{getUserEmail()}</p> */}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="cursor-pointer">
                <PieChart className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0">
              <LogoutButton variant="ghost" size="sm" className="w-full justify-start h-9 px-2 text-red-600 hover:text-red-700 hover:bg-red-50" showIcon={true} label="Log out" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
