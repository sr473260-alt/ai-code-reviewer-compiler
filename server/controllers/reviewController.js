import { reviewWithAI } from "../services/aiService.js";

export const reviewCode = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code || typeof code !== "string" || code.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Code is required and must be a non-empty string",
      });
    }

    const MAX_CODE_LENGTH = 20000; // adjust to taste / Gemini's limits
    if (code.length > MAX_CODE_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Code exceeds maximum allowed length of ${MAX_CODE_LENGTH} characters`,
      });
    }

    const review = await reviewWithAI(code);

    res.json({
      success: true,
      review,
    });
  } catch (error) {
    console.error("🔥 Full Error:", error); // server-side only, never sent to client

    res.status(500).json({
      success: false,
      message: "Something went wrong while reviewing the code",
      ...(process.env.NODE_ENV !== "production" && { debug: error.message }),
    });
  }
};