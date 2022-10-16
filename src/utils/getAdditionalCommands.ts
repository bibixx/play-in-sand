import { existsSync } from "node:fs";
import path from "node:path";
import { SANDBOX_METADATA_FOLDER } from "../constants";
import { execPromise } from "./execPromise";

export const getAdditionalCommands = async (
  sandboxTargetPath: string
): Promise<string[]> => {
  const metadataPrepareDirectory = path.join(
    sandboxTargetPath,
    SANDBOX_METADATA_FOLDER
  );
  const metadataPreparePath = path.join(
    metadataPrepareDirectory,
    "commands.mjs"
  );

  if (existsSync(metadataPreparePath)) {
    const output = await execPromise(`node ${metadataPreparePath}`);
    const cleanedUpValues = output.trim();
    return cleanedUpValues.split("\n");
  }

  return [];
};
