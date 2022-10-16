#!/usr/bin/env node --enable-source-maps
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { inCommand } from "./commands/in";
import { prepare } from "./commands/prepare";
import { removeCommand } from "./commands/remove";

yargs(hideBin(process.argv))
  .command(
    "in [sandbox] [name]",
    "create and run a sandbox",
    (yargs) => {
      return yargs
        .option("copy", {
          alias: "c",
          describe: "Copy execute commands to clipboard",
          type: "boolean",
          default: true,
        })
        .positional("sandbox", {
          describe: "sandbox name to be run",
          type: "string",
        })
        .positional("name", {
          describe: "sandbox name to be run",
          type: "string",
        })
        .demandOption("sandbox");
    },
    (argv) =>
      inCommand(argv.sandbox, {
        outputName: argv.name,
        copy: argv.copy,
      })
  )
  .command(
    "prepare [sandbox]",
    false,
    (yargs) => {
      return yargs
        .positional("sandbox", {
          describe: "sandbox name to be run",
          type: "string",
        })
        .demandOption("sandbox");
    },
    (argv) => prepare(argv.sandbox)
  )
  .command(
    "remove",
    "remove the most recent sandbox",
    () => {},
    (argv) => removeCommand()
  )
  .hide("prepare")
  .demandCommand(1, 1, "")
  .scriptName("play")
  .help()
  .parse();
