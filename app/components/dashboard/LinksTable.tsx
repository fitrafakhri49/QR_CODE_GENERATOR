// components/LinksTable.tsx
"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Copy, Eye, MoreVertical, QrCode, Loader2, RefreshCw } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState, useEffect, useCallback } from "react"; // Tambahkan hook ini
import axios from "axios";

import QrCodeModal from "./QrCodeModal";
import { Card, CardContent } from "@/components/ui/card";

// Definisikan Interface untuk Data Link dari Backend Anda
interface LinkItem {
  id: string; // Atau string, tergantung Prisma ID Anda
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
  const handleDelete = async (linkId: string) => {
    // Tampilkan konfirmasi (opsional tapi disarankan)
    if (!confirm("Apakah Anda yakin ingin menghapus link ini?")) {
      return;
    }

    setLoading(true); // Tampilkan loading saat menghapus
    try {
      // Panggil endpoint DELETE dengan ID link
      const API_URL_DELETE = `${API_URL}/links/${linkId}`;

      await axios.delete(API_URL_DELETE);

      // Setelah sukses, refresh data tabel
      await fetchLinks();
      // Tampilkan notifikasi sukses (jika pakai toast)
      alert("Link berhasil dihapus!");
    } catch (err: any) {
      console.error("Gagal menghapus link:", err);
      alert(err.response?.data?.message || "Gagal menghapus link.");
      setLoading(false); // Sembunyikan loading jika gagal
    }
  };

  // ----------------------------------------------------
  // LOGIC RENDERING
  // ----------------------------------------------------

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12 border rounded-md">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <p>Processing Data....</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-red-400 bg-red-50 rounded-md">
        <p className="text-red-700 font-medium">Error: {error}</p>
        <p className="text-sm text-red-600">Pastikan server Express Anda berjalan di {API_URL}</p>
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border rounded-md">
        <p className="text-lg font-medium mb-4">Belum ada tautan yang dibuat.</p>
        <p className="text-gray-500">Gunakan tombol "Buat Baru" untuk memulai.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={fetchLinks}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Short URL</TableHead>
                <TableHead>Long URL </TableHead>
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
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-blue-600">{link.shortUrl}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopy(link.shortUrl)}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      {/* Tampilkan link.name jika ada, jika tidak, gunakan ShortCode atau LongUrl */}
                      <p className="font-medium">{link.longUrl}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-gray-400" />
                      <span className="font-semibold">{link.clickCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {link.qrImageUrl ? (
                      <QrCodeModal qrImageUrl={link.qrImageUrl} shortCode={link.shortCode} />
                    ) : (
                      <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
                        <QrCode className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {/* --- EDIT (Langkah 3) --- */}
                          <DropdownMenuItem onClick={() => alert(`Akan mengedit Link ID: ${link.id}`)}>Edit</DropdownMenuItem>

                          {/* --- DELETE (Telah Aktif) --- */}
                          <DropdownMenuItem
                            className="text-red-600 cursor-pointer"
                            onClick={() => handleDelete(link.id)} // 👈 Panggil fungsi delete di sini
                          >
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
        </CardContent>
      </Card>
    </div>
  );
}
