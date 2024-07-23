import { TypedEmitter } from "tiny-typed-emitter";

type Options = Record<string, unknown>;

// Saves a single option to chrome.storage
export const set = async <T extends Options>(input: T) => {
  const { promise, resolve, reject } = Promise.withResolvers<T>();
  try {
    chrome.storage.sync.set(input, () => resolve(input));
  } catch (e) {
    reject(e);
  }
  return promise;
};

// Restores a single option from chrome.storage
export const get = async <T extends Options>(): Promise<T> => {
  const { promise, resolve, reject } = Promise.withResolvers<T>();
  try {
    chrome.storage.sync.get(undefined, (items: Options) => resolve(items as T));
  } catch (e) {
    reject(e);
  }
  return promise;
};

/**
 *
 */
export class StorageManager<T extends Options> {
  private _updateHandler: ((data: T) => void) | null = null;

  constructor() {
    chrome.runtime.onMessage.addListener((message) => {
      (async () => {
        await this._handleMessage(message);
      })();
      return true;
    });
  }

  public onUpdate(callback: (data: T) => void) {
    this._updateHandler = callback;
  }

  public async save(input: T) {
    const { promise, resolve, reject } = Promise.withResolvers<T>();
    try {
      chrome.storage.sync.set(input, () => {
        resolve(input);
      });
    } catch (e) {
      reject(e);
    }
    return promise.then((saved) => {
      chrome.runtime.sendMessage({ source: "storage", event: "update", data: saved });
    });
  }

  public async load(): Promise<T> {
    const { promise, resolve, reject } = Promise.withResolvers<T>();
    try {
      chrome.storage.sync.get(undefined, (saved: Options) => resolve(saved as T));
    } catch (e) {
      reject(e);
    }
    return promise;
  }

  private _handleMessage(message: any) {
    const msg = message as StorageUpdated<T>;
    if (msg?.source === "storage" && msg?.event === "update" && this._updateHandler) {
      this._updateHandler(msg.data);
    }
  }
}

type StorageUpdated<T> = {
  source: "storage";
  event: "update";
  data: T;
};
