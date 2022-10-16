import { SANDBOX_TMP_FOLDER } from "../constants";
import { getSandboxDataPath } from "./paths";
import { readDirs } from "./readDirs";

export const getSandboxList = async () => {
  const dirs = await readDirs(getSandboxDataPath());

  return dirs.filter((dir) => dir !== SANDBOX_TMP_FOLDER);
};
