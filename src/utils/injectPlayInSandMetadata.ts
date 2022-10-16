import { emptyDir, ensureFile } from "fs-extra";
import { existsSync } from "node:fs";
import { appendFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { SANDBOX_METADATA_FOLDER } from "../constants";

export const injectPlayInSandMetadata = async (
  sandboxPath: string,
  sandboxTemplateName: string
) => {
  const gitIgnorePath = path.join(sandboxPath, ".gitignore");

  if (existsSync(gitIgnorePath)) {
    await appendFile(gitIgnorePath, "\n# Play in Sandbox metadata\n.sand");
  } else {
    await writeFile(gitIgnorePath, "# Play in Sandbox metadata\n.sand");
  }

  const metaDataFileDirectory = path.join(sandboxPath, SANDBOX_METADATA_FOLDER);
  const metaDataFilePath = path.join(metaDataFileDirectory, "sand.json");

  const metadata = {
    createdAt: Date.now(),
    sandboxTemplateName,
  };

  await emptyDir(metaDataFileDirectory);
  await ensureFile(metaDataFilePath);
  await writeFile(metaDataFilePath, JSON.stringify(metadata, null, 2));

  return {};
};
