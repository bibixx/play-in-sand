import { remove } from "fs-extra";
import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import { join } from "node:path";
import chalk from "chalk";
import { SANDBOX_DATA_FOLDER, SANDBOX_METADATA_FOLDER } from "../constants";
import { getSandboxTargetPath } from "../utils/paths";
import { readDirs } from "../utils/readDirs";
import { logSuccess, logWarning } from "../utils/userLog";

export const removeCommand = async () => {
  const unfilteredDirs = await readDirs(getSandboxTargetPath());
  const dirs = unfilteredDirs.filter((dir) => dir !== SANDBOX_DATA_FOLDER);

  const metadataPromises = dirs.map(async (dir) => {
    const metadataJsonPath = join(
      getSandboxTargetPath(),
      dir,
      SANDBOX_METADATA_FOLDER,
      "sand.json"
    );

    if (!existsSync(metadataJsonPath)) {
      return null;
    }

    try {
      const contents = await fs.readFile(metadataJsonPath, "utf8");

      return JSON.parse(contents) as Metadata;
    } catch (error) {
      console.warn(logWarning(error));

      return null;
    }
  });

  const metadatas = await Promise.all(metadataPromises);

  const latestMetadataIndex = getLatestMetadataIndex(metadatas);
  if (latestMetadataIndex < 0) {
    logSuccess("No sandbox to remove");

    return;
  }

  const pathOfSandboxToBeRemoved = join(
    getSandboxTargetPath(),
    dirs[latestMetadataIndex]
  );

  await remove(pathOfSandboxToBeRemoved);
  logSuccess(
    `Successfully removed sandbox from ${chalk.green(pathOfSandboxToBeRemoved)}`
  );
};

interface Metadata {
  createdAt: number;
}
function getLatestMetadataIndex(metadatas: (Metadata | null)[]) {
  let index = -1;
  let max = -1;

  for (let i = 0; i < metadatas.length; i++) {
    const metadata = metadatas[i];

    if (metadata === null) {
      continue;
    }

    if (metadata.createdAt > max) {
      index = i;
      max = metadata.createdAt;
    }
  }

  return index;
}
