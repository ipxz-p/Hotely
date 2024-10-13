import express from "express";
import { createRoomTypes, getRoomTypeById, getRoomTypesByRoomId } from "../controllers/roomTypes.js";

const router = express.Router()

router.post("/createRoomTypes", createRoomTypes)
router.get("/getRoomTypeById/:id", getRoomTypeById)
router.get("/getRoomTypesByRoomId/:roomId", getRoomTypesByRoomId)

export default router