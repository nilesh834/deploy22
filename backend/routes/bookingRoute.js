import express from "express";
import { createBooking } from "../controller/bookingController.js";

const router = express.Router();

// Create booking
router.post("/create", createBooking);

export default router;
