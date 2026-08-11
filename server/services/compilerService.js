import { execFile } from "child_process";
import fs from "fs/promises";
import path from "path";
import os from "os";
import crypto from "crypto";

const runCommand = (command, args, options = {}) => {
  return new Promise((resolve) => {
    execFile(
      command,
      args,
      {
        ...options,
        timeout: 5000,
        maxBuffer: 1024 * 1024,
      },
      (error, stdout, stderr) => {
        if (error) {
          resolve({
            success: false,
            stdout: stdout || "",
            stderr: stderr || error.message,
          });
          return;
        }

        resolve({
          success: true,
          stdout: stdout || "",
          stderr: stderr || "",
        });
      }
    );
  });
};

export const compileCpp = async (code, input = "") => {
  const id = crypto.randomUUID();

  const tempDir = await fs.mkdtemp(
    path.join(os.tmpdir(), `cpp-${id}-`)
  );

  const sourceFile = path.join(tempDir, "main.cpp");
  const executableFile = path.join(
    tempDir,
    process.platform === "win32" ? "main.exe" : "main"
  );

  try {
    // Save C++ source code
    await fs.writeFile(sourceFile, code, "utf8");

    /*
     * Compile
     *
     * Windows:
     * g++ main.cpp -o main.exe
     *
     * Linux:
     * g++ main.cpp -o main
     */
    const compileResult = await runCommand(
      "g++",
      [
        sourceFile,
        "-std=c++17",
        "-O2",
        "-o",
        executableFile,
      ],
      {
        cwd: tempDir,
      }
    );

    // Compilation failed
    if (!compileResult.success) {
      return {
        success: false,
        output: "",
        runtimeError: compileResult.stderr,
      };
    }

    /*
     * Execute compiled program
     */
    const executeResult = await runCommand(
      executableFile,
      [],
      {
        cwd: tempDir,
        input,
      }
    );

    if (!executeResult.success) {
      return {
        success: false,
        output: executeResult.stdout,
        runtimeError: executeResult.stderr,
      };
    }

    return {
      success: true,
      output: executeResult.stdout,
      runtimeError: executeResult.stderr,
    };

  } catch (error) {
    console.error("Compiler Error:", error);

    return {
      success: false,
      output: "",
      runtimeError: error.message,
    };

  } finally {
    // Delete temporary files
    try {
      await fs.rm(tempDir, {
        recursive: true,
        force: true,
      });
    } catch (cleanupError) {
      console.error(
        "Cleanup Error:",
        cleanupError.message
      );
    }
  }
};