import path from "node:path";
import {
  SANDBOX_DATA_FOLDER,
  SANDBOX_PATH,
  SANDBOX_TMP_FOLDER,
} from "../constants";

export const getSandboxTargetPath = () => SANDBOX_PATH;

export const getSandboxDataPath = () =>
  path.join(SANDBOX_PATH, SANDBOX_DATA_FOLDER);

export const getSandboxTmpPath = () =>
  path.join(getSandboxDataPath(), SANDBOX_TMP_FOLDER);
