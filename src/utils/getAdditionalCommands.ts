import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { SANDBOX_METADATA_FOLDER } from "../constants";
import { GetCommandsFunction } from "./getCommands";

// TODO: Validate import
interface CommandsModule {
  getCommands: GetCommandsFunction;
}

export const getFunctionForAdditionalCommands = async (
  sandboxTargetPath: string
): Promise<GetCommandsFunction> => {
  const metadataPrepareDirectory = path.join(
    sandboxTargetPath,
    SANDBOX_METADATA_FOLDER
  );
  const metadataPreparePath = path.join(
    metadataPrepareDirectory,
    "commands.mjs"
  );

  if (existsSync(metadataPreparePath)) {
    const module = (await import(
      pathToFileURL(metadataPreparePath).href
    )) as CommandsModule;

    return module.getCommands;
  }

  return () => [];
};
