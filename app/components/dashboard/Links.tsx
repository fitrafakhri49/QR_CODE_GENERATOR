"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Search,
  Filter,
  Calendar,
  Tag,
  BarChart2,
  Pencil,
  Share2,
  MoreHorizontal,
  Copy,
  Link as LinkIcon,
  Trash,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Header from "@/app/components/dashboard/Header";

const API_URL = "http://localhost:4000/api/v1";

export default function LinksPage() {
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
    } catch (err: any) {
      console.error("Gagal menghapus link:", err);
      alert(err.response?.data?.message || "Gagal menghapus link.");
      setLoading(false); // Sembunyikan loading jika gagal
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Tambahkan notifikasi toast di sini
    alert("URL berhasil disalin!");
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
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Short Link
        </h1>
      </div>

      {/* Toolbar ala Bitly */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search links" className="pl-10 bg-white" />
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 md:flex-none bg-white gap-2 text-slate-600"
          >
            <Calendar className="h-4 w-4" /> Filter by date
          </Button>
          <Button
            variant="outline"
            className="flex-1 md:flex-none bg-white gap-2 text-slate-600"
          >
            <Filter className="h-4 w-4" /> Add filters
          </Button>
        </div>
      </div>

      {/* Link Cards List */}
      <div className="space-y-4">
        {links.map((link: any) => (
          <div
            key={link.id}
            className="bg-white border rounded-xl p-4 md:p-6 hover:border-blue-300 transition-all shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="p-2 bg-blue-50 rounded-full flex-shrink-0">
                <LinkIcon className="h-5 w-5 text-blue-600" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base md:text-lg text-slate-800 truncate mb-1">
                  {link.longUrl.replace("https://", "").split("/")[0]} —
                  untitled
                </h3>

                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <a
                    href={link.shortUrl}
                    target="_blank"
                    className="text-[#0c3ebe] font-semibold hover:underline break-all"
                  >
                    {link.shortUrl.replace("http://", "")}
                  </a>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleCopy(link.shortUrl)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>

                <p className="text-sm text-slate-500 mb-4 flex items-start gap-2 break-all">
                  <span className="text-slate-400 mt-1">↳</span>
                  {link.longUrl}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-slate-500 border-t pt-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    {new Date(link.createdAt).toLocaleDateString("id-ID", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>

                  <div className="flex items-center gap-2">
                    <Tag className="h-3 w-3" /> No tags
                  </div>
                </div>
              </div>

              <div className="flex gap-2 md:ml-auto">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-slate-200"
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button
                  onClick={() => handleDelete(link.id)}
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-slate-200"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
