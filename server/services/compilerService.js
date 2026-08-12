import fs from "fs/promises";
import path from "path";
import os from "os";
import { execFile, spawn } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export const compileCpp = async (code, input = "") => {
  const tempDir = await fs.mkdtemp(
    path.join(os.tmpdir(), "cpp-")
  );

  const sourceFile = path.join(tempDir, "main.cpp");
  const executableFile = path.join(tempDir, "main");

  try {
    // --------------------------------
    // 1. Save C++ code
    // --------------------------------

    await fs.writeFile(
      sourceFile,
      code,
      "utf8"
    );

    // --------------------------------
    // 2. Compile C++
    // --------------------------------

    try {
      await execFileAsync(
        "g++",
        [
          sourceFile,
          "-o",
          executableFile,
          "-std=c++17",
        ],
        {
          timeout: 10000,
          maxBuffer: 1024 * 1024,
        }
      );
    } catch (error) {
      return {
        success: false,
        output: "",
        runtimeError:
          error.stderr ||
          error.message ||
          "Compilation failed",
      };
    }

    // --------------------------------
    // 3. Run C++ program
    // --------------------------------

    const result = await new Promise((resolve) => {
      const child = spawn(
        executableFile,
        [],
        {
          cwd: tempDir,
          stdio: ["pipe", "pipe", "pipe"],
        }
      );

      let stdout = "";
      let stderr = "";
      let finished = false;

      // --------------------------------
      // Capture output
      // --------------------------------

      child.stdout.on("data", (data) => {
        stdout += data.toString();
      });

      child.stderr.on("data", (data) => {
        stderr += data.toString();
      });

      // --------------------------------
      // Send program input
      // --------------------------------

      if (input) {
        child.stdin.write(input);
      }

      child.stdin.end();

      // --------------------------------
      // Timeout
      // --------------------------------

      const timer = setTimeout(() => {
        if (!finished) {
          finished = true;

          child.kill("SIGKILL");

          resolve({
            success: false,
            output: stdout,
            runtimeError: "Program execution timed out.",
          });
        }
      }, 5000);

      // --------------------------------
      // Process finished
      // --------------------------------

      child.on("close", (exitCode) => {
        if (finished) {
          return;
        }

        finished = true;

        clearTimeout(timer);

        if (exitCode === 0) {
          resolve({
            success: true,
            output: stdout,
            runtimeError: stderr,
          });
        } else {
          resolve({
            success: false,
            output: stdout,
            runtimeError:
              stderr ||
              `Program exited with code ${exitCode}`,
          });
        }
      });

      // --------------------------------
      // Process error
      // --------------------------------

      child.on("error", (error) => {
        if (finished) {
          return;
        }

        finished = true;

        clearTimeout(timer);

        resolve({
          success: false,
          output: stdout,
          runtimeError: error.message,
        });
      });
    });

    return result;

  } catch (error) {
    console.error("Compiler error:", error);

    return {
      success: false,
      output: "",
      runtimeError: error.message,
    };

  } finally {
    // --------------------------------
    // 4. Delete temporary files
    // --------------------------------

    try {
      await fs.rm(tempDir, {
        recursive: true,
        force: true,
      });
    } catch (error) {
      console.error(
        "Cleanup error:",
        error.message
      );
    }
  }
};