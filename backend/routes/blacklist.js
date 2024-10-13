import express from "express";
import { createBlacklist, getBlacklistByCardBlacklist } from "../controllers/blacklist.js";

const router = express.Router()

router.post("/createBlacklist", createBlacklist)
router.get("/getBlacklistByCardBlacklist/:cardBlacklist", getBlacklistByCardBlacklist)

export default router