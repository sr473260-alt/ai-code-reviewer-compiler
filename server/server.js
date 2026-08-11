import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import reviewRoutes from "./routes/reviewRoutes.js";
import compilerRoutes from "./routes/compilerRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/review", reviewRoutes);
app.use("/api/compiler", compilerRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Code Reviewer Backend Running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});