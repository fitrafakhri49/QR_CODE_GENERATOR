// components/ShortenModal.tsx
"use client";

import React, { useState } from "react";
import axios from "axios";
import { Link as LinkIcon, Loader2, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ResultCard from "./ResultCard";

// Ganti dengan Base URL API Express Anda!
const API_URL = "http://localhost:4000/api/v1";

interface LinkData {
  shortUrl: string;
  qrImageUrl: string;
}
interface ShortenModalProps {
  children: React.ReactNode;
}

export default function ShortenModal({ children }: ShortenModalProps) {
  const [open, setOpen] = useState(false);
  const [longUrl, setLongUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LinkData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null); // Reset hasil sebelumnya

    try {
      // Panggil endpoint router.post("/links", ...)
      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        `${API_URL}/links`,
        {
          longUrl,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Data yang dikembalikan sesuai dengan controller Express Anda (response.data.data)
      const data = response.data.data;

      setResult({
        shortUrl: data.shortUrl,
        qrImageUrl: data.qrImageUrl,
      });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Terjadi kesalahan saat membuat tautan.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Reset state saat modal ditutup
    setOpen(false);
    setLongUrl("");
    setResult(null);
    setError(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DialogTrigger asChild>{children}</DialogTrigger>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()} className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{result ? "Link Created Successfully" : "Create New Short Link"}</DialogTitle>
          <DialogDescription>{result ? "Short URL and QR Code are ready to use." : "Enter the long URL you want to shorten."}</DialogDescription>
        </DialogHeader>

        {/* Bagian Hasil (Jika Berhasil) */}
        {result ? (
          <ResultCard data={result} onClose={handleClose} />
        ) : (
          /* Bagian Form (Jika Belum Berhasil) */
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <X className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="longUrl">Long URL </Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="longUrl" type="url" placeholder="https://your-long-url.com/..." value={longUrl} onChange={(e) => setLongUrl(e.target.value)} className="pl-10" required disabled={loading} />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Create"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
