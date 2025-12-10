// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tambahkan konfigurasi ini:
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "", // Kosongkan atau hapus jika tidak ada port spesifik
        pathname: "/dt6p8sohp/**", // Ini adalah cloud name Anda, sesuaikan jika perlu
        // Jika Anda ingin mengizinkan semua path di cloudinary, cukup gunakan:
        // pathname: '/**'
      },
      // Anda juga bisa menggunakan array domains yang lebih sederhana untuk versi Next.js lama:
      // domains: ['res.cloudinary.com'],
    ],
    // Untuk Next.js versi lama (<v13.0) gunakan domains:
    // domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
