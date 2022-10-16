import { spawn } from "child_process";
import path from "path";

export const runNodeFile = async (filepath: string) => {
  const extension = path.extname(filepath).substring(1);

  if (extension === "mjs") {
    return new Promise((resolve) => {
      const child = spawn("node", [filepath], { stdio: "inherit" });
      child.on("exit", resolve);
    });
  }

  return;
};
