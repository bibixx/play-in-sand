import path from "path";
import { getSandboxTmpPath } from "./paths";
import { existsSync } from "fs";

export const tmpSandboxExists = (sandbox: string) => {
  const sandboxTmpDirectory = getSandboxTmpPath();
  const sandboxTmpPath = path.join(sandboxTmpDirectory, sandbox);

  return existsSync(sandboxTmpPath);
};
