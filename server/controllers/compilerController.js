import { compileCpp } from "../services/compilerService.js";

export const compileCode = async (req, res) => {
  try {
    const { code, input } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Code is required",
      });
    }

    const result = await compileCpp(code, input);

    res.json(result);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};