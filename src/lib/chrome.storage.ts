type Options = Record<string, unknown>;

// Saves a single option to chrome.storage
export const set = async <T extends Options>(obj: T): Promise<T> => {
  const { promise, resolve, reject } = Promise.withResolvers<T>();
  chrome.storage.sync.set(obj, () => {
    if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
    resolve(obj);
  });
  return promise;
};

// Restores a single option from chrome.storage
export const get = async <T>(): Promise<T> => {
  const { promise, resolve, reject } = Promise.withResolvers<T>();
  chrome.storage.sync.get(null, (items: Options) => {
    if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
    resolve(items as T);
  });
  return promise;
};
