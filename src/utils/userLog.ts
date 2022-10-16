import chalk from "chalk";

const getMessage =
  (fistPrefix: string, prefix: string) => (values: string[]) => {
    const [firstValue, ...restValues] = values;
    return [fistPrefix + firstValue, ...restValues.map((v) => prefix + v)].join(
      "\n"
    );
  };

export const logInfo = (...messages: string[]) =>
  console.log(getMessage("  ", "  ")(messages));

export const logSuccess = (...messages: string[]) =>
  console.log(getMessage(chalk.bold.green("✔ "), "  ")(messages));

export const logError = (...messages: string[]) =>
  console.error(getMessage(chalk.bold.red("✖ "), "  ")(messages));

export const logWarning = (...messages: string[]) =>
  console.error(getMessage(chalk.bold.yellow("⚠ "), "  ")(messages));

export const logQuestion = (...messages: string[]) =>
  console.error(getMessage(chalk.bold.blue("? "), "  ")(messages));
