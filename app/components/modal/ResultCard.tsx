// components/ResultCard.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, QrCode } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-label";

interface ResultCardProps {
  data: {
    shortUrl: string;
    qrImageUrl: string;
  };
  onClose: () => void;
}

export default function ResultCard({ data, onClose }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.shortUrl);
    setCopied(true);
    // Jika Anda menggunakan Sonner, aktifkan baris ini:
    // toast.success("Short URL berhasil disalin!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {/* Tampilan Short URL */}
        <Label htmlFor="shortUrl">Tautan Pendek Anda</Label>
        <div className="flex space-x-2">
          <Input id="shortUrl" readOnly value={data.shortUrl} className="flex-grow bg-gray-50" />
          <Button onClick={handleCopy} variant="secondary" className="min-w-[100px]">
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Disalin
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" /> Salin
              </>
            )}
          </Button>
        </div>
      </div>

      <Separator />

      {/* Tampilan QR Code */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <QrCode className="h-4 w-4" />
          <Label>QR Code</Label>
        </div>
        <div className="flex justify-center p-4 border rounded-lg bg-white">
          <div className="relative w-40 h-40">
            {/* Menggunakan Image dari Next/Image */}
            <Image src={data.qrImageUrl} alt="QR Code" layout="fill" objectFit="contain" />
          </div>
        </div>
      </div>

      <Button onClick={onClose} className="w-full">
        Selesai
      </Button>
    </div>
  );
}
