import originalChalk from "chalk";
type ChalkInstance = typeof originalChalk;

const handlers: ProxyHandler<Function> = {
  apply(target, thisArg, argumentsList) {
    return argumentsList[0];
  },
  get() {
    return getProxy();
  },
};
function getProxy() {
  return new Proxy(function () {}, handlers);
}

export type GetCommandsFunction = (chalk: ChalkInstance) => string[];
export const getFormattedCommands = (fn: GetCommandsFunction) => {
  const chalkPlainTextProxy = getProxy() as ChalkInstance;
  const pretty = fn(originalChalk).map((c) => `${c}${originalChalk.grey(";")}`);
  const plain = fn(chalkPlainTextProxy).map((c) => `${c};`);

  return { pretty, plain };
};
