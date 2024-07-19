type Options = Record<string, unknown>;

type Hook = <T>(obj?: Options) => T | Promise<T>;

type Hooks = "preSet" | "postSet" | "preGet" | "postGet";

const hooks: Record<Hooks, Hook | undefined> = {
  preSet: undefined,
  postSet: undefined,
  preGet: undefined,
  postGet: undefined,
};

export const preSetHook = (hook: Hook) => (hooks.preSet = hook);
export const postSetHook = (hook: Hook) => (hooks.postSet = hook);
export const preGetHook = (hook: Hook) => (hooks.preGet = hook);
export const postGetHook = (hook: Hook) => (hooks.postGet = hook);

// Saves a single option to chrome.storage
export const set = async <T extends Options>(obj: T): Promise<T> => {
  const { promise, resolve, reject } = Promise.withResolvers<T>();
  let payload = obj;
  if (hooks.preSet) {
    payload = await hooks.preSet(payload);
  }
  chrome.storage.sync.set(payload, () => {
    if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
    resolve(obj);
  });
  return promise.then(async (settings) => {
    return hooks.postSet ? await hooks.postSet(settings) : settings;
  });
};

// Restores a single option from chrome.storage
export const get = async <T extends Options>(): Promise<T> => {
  const { promise, resolve, reject } = Promise.withResolvers<T>();
  if (hooks.preGet) await hooks.preGet();
  chrome.storage.sync.get(null, (items: Options) => {
    if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
    resolve(items as T);
  });
  return promise.then(async (settings) => {
    return hooks.postGet ? await hooks.postGet(settings) : settings;
  });
};
