import chalk from "chalk";
import { logQuestion } from "./userLog";

const getYesNo = (defaultValue?: boolean) => {
  if (defaultValue === undefined) {
    return "y/n";
  }

  if (defaultValue === true) {
    return "Y/n";
  }

  return "y/N";
};

export const askQuestion = (question: string, defaultValue?: boolean) =>
  new Promise<boolean>((resolve) => {
    var stdin = process.stdin;

    logQuestion(`${question} ${chalk.grey(`[${getYesNo(defaultValue)}]`)}`);

    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");

    stdin.on("data", function (key: string) {
      if (key === "\u0003") {
        process.exit();
      }

      if (key.toLowerCase() === "n") {
        resolve(false);
        process.stdin.pause();
      }

      if (key.toLowerCase() === "y") {
        resolve(true);
        process.stdin.pause();
      }

      if (defaultValue !== undefined && key.charCodeAt(0) === 13) {
        resolve(defaultValue);
        process.stdin.pause();
      }
    });
  });
