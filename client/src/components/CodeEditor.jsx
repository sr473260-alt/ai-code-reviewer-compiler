import Editor from "@monaco-editor/react";
import { useCode } from "../context/CodeContext";
import { useTheme } from "../context/ThemeContext";

const CodeEditor = () => {
  const { code, setCode } = useCode();
  const { theme } = useTheme();

  return (
    <div
      className={`rounded-xl overflow-hidden border transition-all duration-300 ${
        theme === "dark"
          ? "bg-slate-800 border-purple-500"
          : "bg-white border-gray-300 shadow-md"
      }`}
    >
      {/* Header */}
      <div
        className={`px-4 py-3 font-semibold text-lg ${
          theme === "dark"
            ? "bg-slate-700 text-white"
            : "bg-gray-100 text-slate-900"
        }`}
      >
        💻 Code Editor (C++)
      </div>

      {/* Monaco Editor */}
      <Editor
        height="500px"
        language="cpp"
        value={code}
        theme={theme === "dark" ? "vs-dark" : "light"}
        onChange={(value) => setCode(value || "")}
        options={{
          minimap: {
            enabled: false,
          },
          fontSize: 16,
          automaticLayout: true,
          wordWrap: "on",
          scrollBeyondLastLine: false,
          tabSize: 4,
          insertSpaces: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          smoothScrolling: true,
          roundedSelection: true,
          padding: {
            top: 15,
          },
        }}
      />
    </div>
  );
};

export default CodeEditor;