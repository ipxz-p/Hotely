import express from "express";
import { createReservation, deleteReservation, getReservations } from "../controllers/reservations.js";

const router = express.Router()

router.post("/createReservation", createReservation)
router.get("/getReservations", getReservations)
router.delete("/deleteReservation/:id", deleteReservation)

export default router