import express from "express";
import { reviewCode } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", (req, res, next) => {
  console.log("📩 POST /api/review reached");
  next();
}, reviewCode);

export default router;