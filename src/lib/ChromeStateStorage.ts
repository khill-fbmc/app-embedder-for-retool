import type { StateStorage } from "zustand/middleware";

const ChromeStateStorage: StateStorage = {
  getItem,
  setItem,
  removeItem,
};

export default ChromeStateStorage;

function getItem(name: string): string | null | Promise<string | null> {
  return runtimePromise<string>((resolve, rejectIfRuntimeError) => {
    chrome.storage.sync.get(name, (items) => {
      rejectIfRuntimeError();
      resolve(items[name]);
    });
  });
}

function setItem(name: string, value: string): unknown | Promise<unknown> {
  return runtimePromise((resolve, rejectIfRuntimeError) => {
    chrome.storage.sync.set({ [name]: value }, () => {
      rejectIfRuntimeError();
      resolve(void 0);
    });
  });
}

function removeItem(name: string): unknown | Promise<unknown> {
  return runtimePromise((resolve, rejectIfRuntimeError) => {
    chrome.storage.sync.remove(name, () => {
      rejectIfRuntimeError();
      resolve(void 0);
    });
  });
}

function runtimePromise<T = unknown>(handler: PromiseHandler<T>): Promise<T> {
  const { promise, resolve, reject } = Promise.withResolvers<T>();
  const rejectIfRuntimeError = () => {
    if (chrome.runtime.lastError) {
      reject(chrome.runtime.lastError.message);
    }
  };
  handler(resolve, rejectIfRuntimeError);
  return promise;
}

type Resolver<T> = (value: T | PromiseLike<T>) => void;

type PromiseHandler<T> = (
  resolve: Resolver<T>,
  rejectIfRuntimeError: () => void
) => void;
