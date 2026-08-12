import fs from "fs/promises";
import path from "path";
import os from "os";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export const compileCpp = async (code, input = "") => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "cpp-"));
  const sourceFile = path.join(tempDir, "main.cpp");
  const executableFile = path.join(tempDir, "main");

  try {
    // Write C++ source code
    await fs.writeFile(sourceFile, code, "utf8");

    // Compile
    try {
      await execFileAsync("g++", [
        sourceFile,
        "-o",
        executableFile,
        "-std=c++17",
      ]);
    } catch (error) {
      return {
        success: false,
        output: "",
        runtimeError: error.stderr || error.message,
      };
    }

    // Run executable
    try {
      const { stdout, stderr } = await execFileAsync(
        executableFile,
        [],
        {
          input,
          timeout: 5000,
          maxBuffer: 1024 * 1024,
        }
      );

      return {
        success: true,
        output: stdout,
        runtimeError: stderr || "",
      };
    } catch (error) {
      return {
        success: false,
        output: error.stdout || "",
        runtimeError: error.stderr || error.message,
      };
    }
  } finally {
    // Remove temporary files
    try {
      await fs.rm(tempDir, {
        recursive: true,
        force: true,
      });
    } catch (cleanupError) {
      console.error("Cleanup error:", cleanupError.message);
    }
  }
};