import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // multer + cloudinary automatically upload
    if (!req.file) {
      return res.status(400).send("No profile image uploaded");
    }

    const profileImagePath = req.file.path; // Cloudinary URL

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(409, "User already exist!"));
    }

    // Hash password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath,
    });

    await newUser.save();

    // Only return a message, NOT a token
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, "Wrong Credentials"));
    }

    // Add expiration (example: 1 hour i.e 3600 seconds)
    const expiresIn = 3600;

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn,
    });

    const { password: pass, ...rest } = validUser._doc;

    res.status(200).json({ token, expiresIn, rest });
  } catch (error) {
    next(error);
  }
};
