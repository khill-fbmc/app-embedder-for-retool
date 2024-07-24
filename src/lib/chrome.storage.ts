import type { ExtensionSettings } from "../types";

type Options = Record<string, unknown>;

class ChromeStorage<T extends Options> {
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

export const storage = new ChromeStorage<Required<ExtensionSettings>>();

type StorageUpdated<T> = {
  source: "storage";
  event: "update";
  data: T;
};
