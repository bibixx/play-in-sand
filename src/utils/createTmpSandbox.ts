import path from "path";
import { copy, emptyDir, ensureDir } from "fs-extra";
import { getSandboxDataPath, getSandboxTmpPath } from "./paths";
import { existsSync } from "fs";

export const createTmpSandbox = async (sandbox: string) => {
  const sandboxDataPath = getSandboxDataPath();

  await ensureDir(sandboxDataPath);

  const sandboxPath = path.join(sandboxDataPath, sandbox);

  if (!existsSync(sandboxPath)) {
    throw new Error(`Sandbox "${sandbox}" doesn't exist`);
  }

  const sandboxTmpPath = getSandboxTmpPath();
  const targetSandboxPath = path.join(sandboxTmpPath, sandbox);

  await emptyDir(targetSandboxPath);
  await copy(sandboxPath, targetSandboxPath, { overwrite: true });
};
