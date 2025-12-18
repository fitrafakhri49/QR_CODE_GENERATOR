"use client";
import StatsGrid from "../components/dashboard/StatsGrid";
import LinksTable from "../components/dashboard/LinksTable";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ResultCard from "../components/modal/ResultCard";

const API_URL = "http://localhost:4000/api/v1";

interface LinkData {
  shortUrl: string;
  qrImageUrl: string;
}

export default function DashboardPage() {
  const [longUrl, setLongUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LinkData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal hasil

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!longUrl) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(`${API_URL}/links`, { longUrl }, { headers: { Authorization: `Bearer ${token}` } });

      const data = response.data.data;
      setResult({
        shortUrl: data.shortUrl,
        qrImageUrl: data.qrImageUrl,
      });

      setIsModalOpen(true); // Buka modal secara otomatis setelah sukses
      setLongUrl(""); // Bersihkan input setelah sukses
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Terjadi kesalahan.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa]">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="md:ml-64 ">
        <Header />

        <main className="md:p-8 space-y-6 md:space-y-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Your Connections Platform</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg md:text-xl font-bold text-slate-800">Quick create</h2>
              </div>

              {/* Form Input Langsung di Page */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">Enter your destination URL</label>
                  <div className="flex gap-2">
                    <Input placeholder="https://example.com/my-long-url" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} className="flex-1 py-5 md:py-6 border-slate-300 focus:ring-blue-500" required type="url" />
                  </div>
                </div>

                {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

                <Button type="submit" className=" bg-[#0c3ebe] hover:bg-[#0a34a1] w-full py-5 md:py-6 text-sm md:text-base" disabled={loading}>
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
            </div>

            {/* Inspiration Card */}
            <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col items-center text-center">
              <div className="w-full h-32 bg-blue-50 rounded-lg mb-4 flex items-center justify-center font-bold text-blue-200">PREVIEW IMAGE</div>
              <h3 className="font-bold text-slate-800 mb-2">Pages that inspire action</h3>
              <p className="text-xs text-slate-500 mb-4">Customize your page with ease and track engagement.</p>
              <Button variant="outline" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50">
                Get started
              </Button>
            </div>
          </div>

          {/* Modal Preview Hasil */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Link Created Successfully!</DialogTitle>
              </DialogHeader>
              {result && <ResultCard data={result} onClose={() => setIsModalOpen(false)} />}
            </DialogContent>
          </Dialog>

          {/* Stats & Table */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800">Performance Overview</h2>
            <StatsGrid />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Recent Links</h2>
              <Button variant="link" className="text-blue-600 font-bold">
                View all
              </Button>
            </div>
            <LinksTable />
          </div>
        </main>
      </div>
    </div>
  );
}
