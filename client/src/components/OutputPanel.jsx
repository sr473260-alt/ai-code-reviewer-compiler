import { useCode } from "../context/CodeContext";

const OutputPanel = () => {
  const { output } = useCode();

  return (
    <div className="bg-slate-800 rounded-xl p-5 mt-6">
      <h2 className="text-xl font-bold text-white mb-4">
        ▶ Program Output
      </h2>

      <pre className="text-green-400 whitespace-pre-wrap">
        {output || "Run your code to see the output."}
      </pre>
    </div>
  );
};

export default OutputPanel;