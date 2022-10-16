import { createTmpSandbox } from "../utils/createTmpSandbox";
import { getSandboxList } from "../utils/getSandboxList";

export const prepare = async (sandboxTemplateName: string) => {
  const sandboxes = await getSandboxList();

  if (!sandboxes.includes(sandboxTemplateName)) {
    console.error(`Sandbox "${sandboxTemplateName}" not found`);
    process.exit(1);
  }

  await createTmpSandbox(sandboxTemplateName);
};
