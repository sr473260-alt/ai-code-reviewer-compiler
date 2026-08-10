import { useState } from "react";
import api from "../services/api";
import { useCode } from "../context/CodeContext";
import { useReview } from "../context/ReviewContext";

const ActionButtons = () => {
  const { code, input, setOutput } = useCode();
  const { setReview } = useReview();

  const [loading, setLoading] = useState(false);
  const [running, setRunning] = useState(false);

  // AI Review
  const handleReview = async () => {
    try {
      setLoading(true);

      const response = await api.post("/review", {
        code,
      });

      setReview(response.data.review);
    } catch (error) {
      setReview("❌ Failed to review code.");
    } finally {
      setLoading(false);
    }
  };

  // Run Code
  const handleRun = async () => {
    try {
      setRunning(true);

      setOutput("Running...");

      const response = await api.post("/compiler/compile", {
        language: "cpp",
        code,
        input,
      });

      if (response.data.success) {
        let result = "";

        if (response.data.output) {
          result += response.data.output;
        }

        if (response.data.runtimeError) {
          result += "\n" + response.data.runtimeError;
        }

        setOutput(result || "Program finished successfully.");
      } else {
        setOutput(response.data.compilerError || "Compilation failed.");
      }
    } catch (error) {
      setOutput(
        error.response?.data?.message ||
          "❌ Unable to connect to compiler."
      );
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="flex gap-4 mt-6">
      <button
        onClick={handleRun}
        disabled={running}
        className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition"
      >
        {running ? "Running..." : "▶ Run Code"}
      </button>

      <button
        onClick={handleReview}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700
        px-6 py-3 rounded-lg font-semibold transition"
      >
        {loading ? "Reviewing..." : "🤖 AI Review"}
      </button>
    </div>
  );
};

export default ActionButtons;