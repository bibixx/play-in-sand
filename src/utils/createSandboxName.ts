import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

export const createSandboxName = (sandbox: string) => {
  const suffix = uniqueNamesGenerator({
    dictionaries: [colors, adjectives, animals],
    separator: "_",
  });

  return [sandbox, suffix].join("_");
};
