/*
  Warnings:

  - You are about to drop the `QRCode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShortLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "LinkType" AS ENUM ('SHORT', 'QR');

-- DropTable
DROP TABLE "QRCode";

-- DropTable
DROP TABLE "ShortLink";

-- CreateTable
CREATE TABLE "LinkItem" (
    "id" TEXT NOT NULL,
    "type" "LinkType" NOT NULL DEFAULT 'SHORT',
    "longUrl" TEXT NOT NULL,
    "shortCode" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "qrImageUrl" TEXT,
    "qrCode" TEXT,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LinkItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LinkItem_shortCode_key" ON "LinkItem"("shortCode");

-- CreateIndex
CREATE UNIQUE INDEX "LinkItem_shortUrl_key" ON "LinkItem"("shortUrl");
