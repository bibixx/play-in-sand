import fs from "node:fs/promises";

export const readDirs = async (path: string) => {
  const dirents = await fs.readdir(path, {
    withFileTypes: true,
  });

  const dirs = dirents.reduce<string[]>((acc, dirent) => {
    if (dirent.isDirectory()) {
      acc.push(dirent.name);
    }

    return acc;
  }, []);

  return dirs;
};
