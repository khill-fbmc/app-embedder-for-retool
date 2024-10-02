import { create } from "zustand";

import type { RetoolApp, UrlParamSpec } from "../types";

type Actions = {
  setAppId: (appName: string) => void;
  setEnvironment: (env: RetoolApp["env"]) => void;
  setVersion: (version: RetoolApp["version"]) => void;
  setHashParams: (spec: UrlParamSpec[]) => void;
  setQueryParams: (spec: UrlParamSpec[]) => void;
  updateParam: (which: "query" | "hash", index: number, spec: UrlParamSpec[]) => void;
  resetApp: () => void;
};

const initialState: RetoolApp = {
  id: "",
  env: "development",
  version: "latest",
  hash: [],
  query: [],
};

export const useRetoolAppStore = create<RetoolApp & Actions>()((set) => ({
  ...initialState,
  setAppId: (id) => set(() => ({ id })),
  setEnvironment: (env) => set(() => ({ env })),
  setVersion: (version) => set(() => ({ version })),
  setHashParams: (hash) => set(() => ({ hash })),
  setQueryParams: (query) => set(() => ({ query })),
  updateParam: (which, index, param) =>
    set((state) => ({
      hash: state[which].map((item, idx) => (idx === index ? { ...item, ...param } : item)),
    })),
  resetApp: () => set(() => initialState),
}));
