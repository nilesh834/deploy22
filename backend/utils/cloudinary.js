import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "rentNest", // All images will be stored under this folder
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    resource_type: "image", // optional, but good to be explicit
  },
});

// Middleware for uploads
const upload = multer({ storage });

export { cloudinary, upload };
