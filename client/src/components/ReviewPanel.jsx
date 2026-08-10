import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useReview } from "../context/ReviewContext";

const ReviewPanel = () => {
  const { review } = useReview();

  return (
    <div className="bg-slate-800 rounded-xl p-5 h-[500px] overflow-auto">
      <h2 className="text-xl font-bold text-white mb-4">
        🤖 AI Review
      </h2>

      {review ? (
        <ReactMarkdown
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");

              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code
                  className="bg-gray-700 px-1 py-0.5 rounded text-pink-400"
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {review}
        </ReactMarkdown>
      ) : (
        <p className="text-gray-400">
          Click <strong>🤖 AI Review</strong> to see AI suggestions.
        </p>
      )}
    </div>
  );
};

export default ReviewPanel;