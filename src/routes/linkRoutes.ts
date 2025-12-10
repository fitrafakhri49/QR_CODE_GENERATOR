import express from "express";
import { createShortLinkWithQr, redirectShortLink, getAllLinks, deleteLink } from "../controllers/formLink";
import { requireAuth } from "../middlewares/auth";
const router = express.Router();

router.post("/links", requireAuth, createShortLinkWithQr);
router.get("/links", requireAuth, getAllLinks);
router.get("/:code", redirectShortLink);
router.delete("/links/:id", deleteLink);

export default router;
