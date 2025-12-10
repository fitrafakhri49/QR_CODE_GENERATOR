// components/LinksTable.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Copy, Eye, Share2, MoreVertical, QrCode, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect, useCallback } from "react"; // Tambahkan hook ini
import axios from "axios";
import { supabase } from "@/lib/supabase.client";

// Definisikan Interface untuk Data Link dari Backend Anda
interface LinkItem {
  id: number; // Atau string, tergantung Prisma ID Anda
  name: string | null; // Asumsi name bisa null
  shortCode: string;
  shortUrl: string;
  longUrl: string;
  clickCount: number;
  qrImageUrl: string | null;
  createdAt: string; // Tanggal dibuat
  // tambahkan properti lain yang ada di model Prisma Anda jika perlu (misal: status, type)
}

// Ganti dengan Base URL API Express Anda!
const API_URL = "http://localhost:4000/api/v1";

export default function LinksTable() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mengambil data dari backend
  const fetchLinks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Panggil endpoint router.get("/links", getAllLinks)
      const token = localStorage.getItem("authToken"); // ambil token
      if (!token) throw new Error("User belum login");
      if (!token) {
        setError("User belum login");
        setLinks([]);
        return;
      }
      const response = await axios.get(`${API_URL}/links`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Data link ada di response.data.data
      setLinks(response.data.data);
    } catch (err: any) {
      console.error("Gagal mengambil data link:", err);
      setError(err.message || "Gagal memuat data dari server.");
      setLinks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Lakukan fetching saat komponen dimuat
  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Tambahkan notifikasi toast di sini
    alert("URL berhasil disalin!");
  };

  // ----------------------------------------------------
  // LOGIC RENDERING
  // ----------------------------------------------------

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12 border rounded-md">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <p>Memuat data tautan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-red-400 bg-red-50 rounded-md">
        <p className="text-red-700 font-medium">Error: {error}</p>
        <p className="text-sm text-red-600">
          Pastikan server Express Anda berjalan di {API_URL}
        </p>
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border rounded-md">
        <p className="text-lg font-medium mb-4">
          Belum ada tautan yang dibuat.
        </p>
        <p className="text-gray-500">
          Gunakan tombol "Create New" untuk memulai.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name / Long URL</TableHead>
            <TableHead>Short URL</TableHead>
            <TableHead>Clicks</TableHead>
            <TableHead>QR</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.map((link) => (
            // Gunakan link.id (dari DB) sebagai key
            <TableRow key={link.id}>
              <TableCell>
                <div>
                  {/* Tampilkan link.name jika ada, jika tidak, gunakan ShortCode atau LongUrl */}
                  <p className="font-medium">{link.name || link.shortCode}</p>
                  <p className="text-sm text-gray-500 truncate max-w-xs">
                    {link.longUrl}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-blue-600">
                    {link.shortUrl}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleCopy(link.shortUrl)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-gray-400" />
                  <span className="font-semibold">{link.clickCount}</span>
                </div>
              </TableCell>
              <TableCell>
                {/* Asumsi Anda ingin menampilkan tombol/ikon QR */}
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <QrCode className="h-4 w-4" />
                </Button>

                {/* Anda mungkin perlu membuat modal untuk menampilkan QR code-nya (menggunakan link.qrImageUrl) */}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
