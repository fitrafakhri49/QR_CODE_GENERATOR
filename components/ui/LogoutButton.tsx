"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useState } from "react";

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showIcon?: boolean;
  label?: string;
}

export default function LogoutButton({ variant = "destructive", size = "default", className = "", showIcon = true, label = "Log out" }: LogoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      // 1. Sign out dari Supabase

      // 2. Clear localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("sb-access-token");
      localStorage.removeItem("sb-refresh-token");

      // 3. Hard redirect ke login page
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Logout error:", error);
      // Fallback: tetap redirect ke login
      window.location.href = "/";
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant={variant} size={size} onClick={handleLogout} disabled={loading} className={className}>
      {showIcon && <LogOut className="mr-2 h-4 w-4" />}
      {loading ? "Logging out..." : label}
    </Button>
  );
}
