import fs from "node:fs/promises";
import { SANDBOX_TMP_FOLDER } from "../constants";
import { getSandboxDataPath } from "./paths";

export const getSandboxList = async () => {
  const dirents = await fs.readdir(getSandboxDataPath(), {
    withFileTypes: true,
  });

  const dirs = dirents.reduce<string[]>((acc, dirent) => {
    if (!dirent.isDirectory()) {
      return acc;
    }

    if (dirent.name !== SANDBOX_TMP_FOLDER) {
      acc.push(dirent.name);
    }

    return acc;
  }, []);

  return dirs;
};
