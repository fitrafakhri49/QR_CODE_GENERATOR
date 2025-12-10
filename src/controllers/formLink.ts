import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import QRCode from "qrcode";
import cloudinary from "../services/cloudinary";

import { nanoid } from "nanoid";

export async function createShortLinkWithQr(req: Request, res: Response) {
    const user = (req as any).user; // dari requireAuth

  try {
    const { longUrl } = req.body;
    if (!longUrl) {
      return res.status(400).json({ message: "pastikan upload url panjangnya" });
    }
    let shortCode = nanoid(6);
    let shortUrl = `${process.env.BASE_URL}/${shortCode}`;
    let exists = await prisma.linkItem.findUnique({
      where: { shortCode },
    });
    while (exists) {
      shortCode = nanoid(6);
      shortUrl = `${process.env.BASE_URL}/${shortCode}`;
      exists = await prisma.linkItem.findUnique({ where: { shortCode } });
    }
    const qrDataUrl = await QRCode.toDataURL(longUrl);
    const uploadResult = await cloudinary.uploader.upload(qrDataUrl, {
      folder: process.env.CLOUDINARY_FOLDER,
      public_id: shortCode,
    });

    const newLink = await prisma.linkItem.create({
      data: {
        longUrl,
        shortCode,
        shortUrl,
        qrCode: longUrl,
        qrImageUrl: uploadResult.secure_url,
        type: "SHORT",
        userId:user.id
      },
    });
    res.status(201).json({
      message: "Short Link & QR code created",
      data: newLink,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const redirectShortLink = async (req: Request, res: Response) => {
  try {
    const { code } = req.params; // ambil string dari params

    const link = await prisma.linkItem.findUnique({
      where: { shortCode: code },
    });
    console.log(link?.shortUrl);

    if (!link) return res.status(404).json({ message: "Short link not found" });
    await prisma.linkItem.update({
      where: { shortCode: code },
      data: { clickCount: link.clickCount + 1 },
    });

    return res.redirect(link.longUrl);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllLinks = async (req: Request, res: Response) => {
    const user = (req as any).user;

    try {
    const links = await prisma.linkItem.findMany({ 
        where:{userId:user.id},
        orderBy: { createdAt: "desc" } });
        const totalLinks = await prisma.linkItem.count({
            where: { userId: user.id }
          });
          const totalClicks = await prisma.linkItem.aggregate({
            _sum: { clickCount: true },
            where: { userId: user.id }
          });
    res.status(200).json({ data: links,totalLinks,totalClicks });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
