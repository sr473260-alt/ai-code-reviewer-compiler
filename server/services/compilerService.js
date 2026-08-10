import fs from "fs";
import { exec } from "child_process";

export const compileCpp = (code, input = "") => {
  return new Promise((resolve) => {
    const id = Date.now();

    const cppFile = `temp_${id}.cpp`;
    const exeFile = `temp_${id}.exe`;
    const inputFile = `input_${id}.txt`;

    fs.writeFileSync(cppFile, code);
    fs.writeFileSync(inputFile, input);

    exec(`g++ "${cppFile}" -o "${exeFile}"`, (error, stdout, stderr) => {
      if (error) {
        cleanup();
        return resolve({
          success: false,
          compilerError: stderr,
        });
      }

      exec(
        `"${exeFile}" < "${inputFile}"`,
        (runError, runStdout, runStderr) => {
          cleanup();

          resolve({
            success: true,
            output: runStdout,
            runtimeError: runStderr,
          });
        }
      );
    });

    function cleanup() {
      if (fs.existsSync(cppFile)) fs.unlinkSync(cppFile);
      if (fs.existsSync(exeFile)) fs.unlinkSync(exeFile);
      if (fs.existsSync(inputFile)) fs.unlinkSync(inputFile);
    }
  });
};