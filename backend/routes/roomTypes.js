import express from "express";
import { createRoomTypes, getRoomTypesByRoomId } from "../controllers/roomTypes.js";

const router = express.Router()

router.post("/createRoomTypes", createRoomTypes)
router.get("/getRoomTypesByRoomId/:roomId", getRoomTypesByRoomId)

export default router