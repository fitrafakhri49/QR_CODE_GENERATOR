"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Search, Filter, Calendar, Trash, Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const API_URL = "http://localhost:4000/api/v1";

export default function QrCodesPage() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLinks = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${API_URL}/links`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLinks(res.data.data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

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

  const handleDownload = async (qrUrl: string) => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "qr-code.png";
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Gagal download QR:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12 border rounded-md">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <p>Processing Data....</p>
      </div>
    );
  }

  return (
    <main className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">QR Codes</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search codes" className="pl-10 bg-white" />
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="bg-white flex-1 md:flex-none gap-2">
            <Calendar className="h-4 w-4" /> Filter by date
          </Button>
          <Button variant="outline" className="bg-white flex-1 md:flex-none gap-2">
            <Filter className="h-4 w-4" /> Add filters
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {links.map((link: any) => (
          <div key={link.id} className="bg-white border rounded-xl p-4 md:p-6 shadow-sm flex flex-col md:flex-row gap-4 md:gap-8">
            {/* QR Preview di Kiri */}
            <div className="relative w-20 h-20 md:w-28 md:h-28 border rounded-lg p-2 bg-white flex-shrink-0">{link.qrImageUrl && <Image src={link.qrImageUrl} alt="QR" fill className="object-contain p-1" />}</div>

            <div className="flex-1">
              <h3 className="font-bold text-lg md:text-xl text-slate-800 mb-1">QR {new Date(link.createdAt).toISOString().split("T")[0]}</h3>

              <p className="text-xs md:text-sm text-slate-500 font-medium mb-1 uppercase tracking-wider">Website</p>

              <p className="text-sm text-slate-600 flex items-start gap-2 mb-3 break-all">
                <span className="text-slate-400 mt-1">↳</span>
                {link.longUrl}
              </p>

              <div className="flex items-center gap-4 text-xs md:text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  {new Date(link.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Tombol Aksi Kanan */}
            <div className="flex justify-end md:justify-center gap-2">
              <Button onClick={() => handleDownload(link.id)} variant="outline" size="icon" className="h-9 w-9 border-slate-200">
                <Download className="h-4 w-4" />
              </Button>
              <Button onClick={() => handleDelete(link.id)} variant="outline" size="icon" className="h-9 w-9 border-slate-200">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
