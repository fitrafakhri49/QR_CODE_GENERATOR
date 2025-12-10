import express from "express";
import { createShortLinkWithQr, redirectShortLink, getAllLinks } from "../controllers/formLink";

const router = express.Router();

router.post("/links", createShortLinkWithQr);
router.get("/links", getAllLinks);
router.get("/:code", redirectShortLink);

export default router;
