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

function mapCommand(command: string) {
  return `${command};`;
}

export const getCommands = (fn: (chalk: ChalkInstance) => string[]) => {
  const chalkPlainTextProxy = getProxy() as ChalkInstance;
  const pretty = fn(originalChalk).map((c) => `${c}${originalChalk.grey(";")}`);
  const plain = fn(chalkPlainTextProxy).map((c) => `${c};`);

  return { pretty, plain };
};
