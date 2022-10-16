import { existsSync } from "fs";
import { copy, emptyDir, ensureDir, move } from "fs-extra";
import path from "path";
import chalk from "chalk";
import { askQuestion } from "./askQuestion";
import {
  getSandboxDataPath,
  getSandboxTargetPath,
  getSandboxTmpPath,
} from "./paths";
import { tmpSandboxExists } from "./tmpSandboxExists";
import { SANDBOX_METADATA_FOLDER } from "../constants";
import { runNodeFile } from "./runNodeFile";

export const createSandbox = async (sandbox: string, sandboxName: string) => {
  const sandboxTargetDirectory = getSandboxTargetPath();
  const sandboxTargetPath = path.join(sandboxTargetDirectory, sandboxName);

  let shouldOverwrite = false;
  if (existsSync(sandboxTargetPath)) {
    shouldOverwrite = await askQuestion(
      // prettier-ignore
      `Sandbox directory "${chalk.green(sandboxTargetDirectory)}" is not empty. Remove existing files and continue?`,
      false
    );

    if (!shouldOverwrite) {
      process.exit(0);
    }
  }

  if (tmpSandboxExists(sandbox)) {
    const sandboxTmpDirectory = getSandboxTmpPath();
    const sandboxTmpPath = path.join(sandboxTmpDirectory, sandbox);

    await move(sandboxTmpPath, sandboxTargetPath, {
      overwrite: shouldOverwrite,
    });
  } else {
    const sandboxDataDirectory = getSandboxDataPath();
    const sandboxDataPath = path.join(sandboxDataDirectory, sandbox);

    if (shouldOverwrite) {
      await emptyDir(sandboxTargetPath);
    } else {
      await ensureDir(sandboxTargetPath);
    }

    await copy(sandboxDataPath, sandboxTargetPath, {
      overwrite: shouldOverwrite,
    });
  }

  const metadataPrepareDirectory = path.join(
    sandboxTargetPath,
    SANDBOX_METADATA_FOLDER
  );
  const metadataPreparePath = path.join(
    metadataPrepareDirectory,
    "prepare.mjs"
  );

  if (existsSync(metadataPreparePath)) {
    await runNodeFile(metadataPreparePath);
  }

  return sandboxName;
};
