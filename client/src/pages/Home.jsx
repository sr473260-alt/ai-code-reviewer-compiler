import Navbar from "../components/Navbar";
import CodeEditor from "../components/CodeEditor";
import ReviewPanel from "../components/ReviewPanel";
import ActionButtons from "../components/ActionButtons";
import { useCode } from "../context/CodeContext";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { input, setInput, output } = useCode();
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        theme === "dark"
          ? "bg-slate-900 text-white"
          : "bg-gray-100 text-slate-900"
      }`}
    >
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        {/* Editor + AI Review */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CodeEditor />
          <ReviewPanel />
        </div>

        {/* Buttons */}
        <div className="mt-6">
          <ActionButtons />
        </div>

        {/* Program Input */}
        <div
          className={`mt-6 rounded-xl p-5 transition-all duration-300 ${
            theme === "dark"
              ? "bg-slate-800"
              : "bg-white shadow-md"
          }`}
        >
          <h2 className="text-xl font-bold mb-4">
            ▶ Program Input
          </h2>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter input for cin here..."
            className={`w-full h-32 rounded-lg p-4 outline-none resize-none transition-all duration-300 ${
              theme === "dark"
                ? "bg-slate-900 text-white border border-slate-700"
                : "bg-gray-100 text-slate-900 border border-gray-300"
            }`}
          />
        </div>

        {/* Program Output */}
        <div
          className={`mt-6 rounded-xl p-5 transition-all duration-300 ${
            theme === "dark"
              ? "bg-slate-800"
              : "bg-white shadow-md"
          }`}
        >
          <h2 className="text-xl font-bold mb-4">
            ▶ Program Output
          </h2>

          <pre
            className={`rounded-lg p-4 min-h-[150px] whitespace-pre-wrap overflow-x-auto transition-all duration-300 ${
              theme === "dark"
                ? "bg-slate-900 text-green-400"
                : "bg-gray-100 text-green-700"
            }`}
          >
            {output || "Run your code to see the output..."}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Home;