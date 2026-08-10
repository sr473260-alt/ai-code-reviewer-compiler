import { createContext, useContext, useState } from "react";

const CodeContext = createContext();

export const CodeProvider = ({ children }) => {
  // Code written in Monaco Editor
  const [code, setCode] = useState(`#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
    return 0;
}`);

  // Input for cin
  const [input, setInput] = useState("");

  // Compiler output
  const [output, setOutput] = useState("");

  return (
    <CodeContext.Provider
      value={{
        code,
        setCode,

        input,
        setInput,

        output,
        setOutput,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
};

export const useCode = () => {
  const context = useContext(CodeContext);

  if (!context) {
    throw new Error("useCode must be used inside CodeProvider");
  }

  return context;
};