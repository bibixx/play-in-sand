import { exec } from "child_process";

export const execPromise = (command: string) =>
  new Promise<string>((resolve, reject) => {
    exec(command, (err, stdout) => {
      if (err !== null) {
        return reject(err);
      }

      return resolve(stdout);
    });
  });
