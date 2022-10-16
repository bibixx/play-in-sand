import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { SANDBOX_METADATA_FOLDER } from "../constants";

interface PrepareModule {
  prepare: (sandboxName: string) => Promise<void>;
}

export const prepareAfterCopy = async (
  sandboxTargetPath: string,
  sandboxName: string
) => {
  const metadataPrepareDirectory = path.join(
    sandboxTargetPath,
    SANDBOX_METADATA_FOLDER
  );
  const metadataPreparePath = path.join(
    metadataPrepareDirectory,
    "prepare.mjs"
  );

  if (!existsSync(metadataPreparePath)) {
    return;
  }

  const importHref = pathToFileURL(metadataPreparePath).href;
  const module: PrepareModule = await import(importHref);

  await module.prepare(sandboxName);
};
