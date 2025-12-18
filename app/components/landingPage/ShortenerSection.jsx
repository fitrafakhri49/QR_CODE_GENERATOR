"use client";

import { Link as LinkIcon, QrCode, Check } from "lucide-react";
import Link from "next/link";

export default function ShortenerSection() {
  return (
    <section className="relative pt-10 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-40 left-40 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Bangun Koneksi Digital yang <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Lebih Kuat</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Gunakan pemendek URL dan QR Codes kami untuk melibatkan audiens dan menghubungkan mereka dengan informasi yang tepat. Buat, edit, dan lacak semuanya dalam <span className="font-semibold text-blue-600">Platform Ini</span>.
          </p>

          {/* URL Shortener Form */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-2 shadow-xl border border-gray-200">
              <form className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <input type="url" placeholder="Tempelkan tautan panjang Anda di sini..." className="w-full px-6 py-4 text-lg border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50" />
                </div>
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-lg whitespace-nowrap">
                  {" "}
                  <Link href="/auth/login">Persingkat Tautan</Link>{" "}
                </button>
              </form>
            </div>
            <p className="mt-4 text-gray-500">Tidak perlu kartu kredit</p>
          </div>

          {/* Features */}
          <div className="grid grid-cols- md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <LinkIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Pemendek URL</h3>
              <p className="text-gray-600">Ubah URL panjang menjadi shortlink yang mudah diingat</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <QrCode className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">QR Code</h3>
              <p className="text-gray-600">Buat QR code yang dapat disesuaikan dengan brand Anda</p>
            </div>
          </div>

          {/* Free Plan Features */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold mb-6">Daftar gratis. Paket gratis Anda termasuk:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-1">100 Shortlink</h4>
                  <p className="text-gray-600">Buat hingga 100 shortlink per bulan</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-1">50 QR Code</h4>
                  <p className="text-gray-600">Generate QR code dengan logo kustom</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-1">Analytics Dasar</h4>
                  <p className="text-gray-600">Pantau performa tautan Anda</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-lg shadow-lg">
              {" "}
              <Link href="/auth/login">Dapatkan Tautan Anda Gratis →</Link>{" "}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
