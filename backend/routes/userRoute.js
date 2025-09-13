import express from "express";
import {
  addListingToWishList,
  getPropertyList,
  getReservationList,
  getTripList,
} from "../controller/userController.js";

const router = express.Router();

// Trips
router.get("/:userId/trips", getTripList);

// Wishlist (PATCH toggle)
router.patch("/:userId/:listingId", addListingToWishList);

// Property list
router.get("/:userId/properties", getPropertyList);

// Reservations
router.get("/:userId/reservations", getReservationList);

export default router;
