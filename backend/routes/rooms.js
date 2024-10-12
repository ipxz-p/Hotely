import express from "express";
import { createRooms, getRoomById, getRooms } from "../controllers/rooms.js";

const router = express.Router()

router.post("/createRooms", createRooms)
router.get("/getRooms", getRooms)
router.get("/getRoomById/:id", getRoomById)

export default router