import express from "express";
import {
  createListing,
  getListingDetails,
  getListings,
  getListingsBySearch,
} from "../controller/listingController.js";

import { upload } from "../utils/cloudinary.js";

const router = express.Router();

// Create listing with multiple images upload to Cloudinary
router.post("/create", upload.array("listingPhotos"), createListing);

// Get all listings (optionally by category)
router.get("/", getListings);

// Get single listing
router.get("/:listingId", getListingDetails);

// Search listings
router.get("/search/:search", getListingsBySearch);

export default router;
