// components/QrCodeModal.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Loader2, QrCode } from "lucide-react"; // Tambah Loader2

interface QrCodeModalProps {
  qrImageUrl: string;
  shortCode: string; // Digunakan untuk nama file download
}

export default function QrCodeModal({ qrImageUrl, shortCode }: QrCodeModalProps) {
  const [open, setOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false); // State untuk loading

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // 1. Ambil data gambar dari Cloudinary menggunakan Fetch API
      const response = await fetch(qrImageUrl);

      // 2. Konversi response menjadi Blob (data biner)
      const imageBlob = await response.blob();

      // 3. Buat URL lokal untuk Blob tersebut
      const blobUrl = URL.createObjectURL(imageBlob);

      // 4. Buat elemen anchor (<a>) secara programatik
      const link = document.createElement("a");

      // 5. Tentukan URL Blob dan nama file
      link.href = blobUrl;
      link.download = `${shortCode}_qrcode.png`;

      // 6. Simulasikan klik
      document.body.appendChild(link);
      link.click();

      // 7. Bersihkan: Hapus anchor dan cabut URL Blob (penting untuk memori)
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Gagal saat mengunduh QR Code:", error);
      alert("Gagal mengunduh file. Coba lagi.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <QrCode className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xs sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code untuk {shortCode}</DialogTitle>
          <DialogDescription>Pindai kode ini atau unduh gambarnya.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-48 h-48 border p-2 rounded-lg bg-white shadow-lg">
            <Image src={qrImageUrl} alt={`QR Code untuk ${shortCode}`} layout="fill" objectFit="contain" />
          </div>

          <Button onClick={handleDownload} className="w-full" disabled={isDownloading}>
            {isDownloading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sedang Mengunduh...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download PNG
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
