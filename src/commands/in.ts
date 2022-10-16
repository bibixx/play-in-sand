import path from "node:path";
import { fileURLToPath } from "node:url";
import chalk from "chalk";
import clipboard from "clipboardy";
import { createSandbox } from "../utils/createSandbox";
import { getSandboxList } from "../utils/getSandboxList";
import { getSandboxDataPath, getSandboxTargetPath } from "../utils/paths";
import { createSandboxName } from "../utils/createSandboxName";
import { spawnInBackground } from "../utils/spawnInBackground";
import { getCommands } from "../utils/getCommands";
import { logError, logInfo, logSuccess } from "../utils/userLog";
import { injectPlayInSandMetadata } from "../utils/injectPlayInSandMetadata";

export interface InCommandOptions {
  outputName?: string;
  copy: boolean;
}

export const inCommand = async (
  sandboxTemplateName: string,
  { outputName, copy }: InCommandOptions
) => {
  const sandboxes = await getSandboxList();

  if (!sandboxes.includes(sandboxTemplateName)) {
    logError(
      // prettier-ignore
      `Template ${chalk.bold.red(`"${sandboxTemplateName}"`)} was not found in ${chalk.gray(getSandboxDataPath())}`
    );
    process.exit(1);
  }

  const sandboxName = outputName ?? createSandboxName(sandboxTemplateName);
  const sandboxTargetDirectory = getSandboxTargetPath();
  const sandboxTargetPath = path.join(sandboxTargetDirectory, sandboxName);

  logInfo(`Creating new sandbox in ${chalk.green(sandboxTargetPath)}`);

  await createSandbox(sandboxTemplateName, sandboxName);
  await injectPlayInSandMetadata(sandboxTargetPath, sandboxTemplateName);
  logSuccess(chalk.bold.green(`Done 🚀`));

  const { pretty, plain } = getCommands((chalk) => [
    `${chalk.cyan("cd")} ${sandboxTargetPath}`,
    chalk.cyan("npm run dev"),
  ]);
  console.log();
  if (copy) {
    logInfo(`Now run: ${chalk.italic.grey("(copied to clipboard)")}`);
  } else {
    logInfo(`Now run:`);
  }
  logInfo(...pretty);

  if (copy) {
    await clipboard.write(plain.join("\n"));
  }

  spawnInBackground("node", [
    fileURLToPath(import.meta.url),
    "prepare",
    sandboxTemplateName,
  ]);
};
