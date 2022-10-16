import { spawn } from "child_process";

export const spawnInBackground = (command: string, args: readonly string[]) => {
  spawn(command, args, {
    stdio: "ignore",
    detached: true,
  }).unref();
};
