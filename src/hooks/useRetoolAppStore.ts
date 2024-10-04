import { create } from "zustand";

import type { RetoolApp, UrlParamSpec } from "../types/extension";

export interface RetoolAppState extends RetoolApp {
  setName: (name: string) => void;
  setEnvironment: (env: RetoolApp["env"]) => void;
  setVersion: (version: RetoolApp["version"]) => void;
  setHashParams: (spec: RetoolApp["hash"]) => void;
  setQueryParams: (spec: RetoolApp["query"]) => void;
  updateParam: (
    which: "query" | "hash",
    index: number,
    spec: UrlParamSpec[]
  ) => void;
  resetApp: () => void;
}

const initialState: RetoolApp = {
  name: "",
  public: false,
  env: "development",
  version: "latest",
  hash: [],
  query: [],
};

export const useRetoolAppStore = create<RetoolAppState>()((set) => ({
  ...initialState,
  resetApp: () => set(() => initialState),
  setName: (name) => set(() => ({ name })),
  setEnvironment: (env) => set(() => ({ env })),
  setVersion: (version) => set(() => ({ version })),
  setHashParams: (hash) => set(() => ({ hash })),
  setQueryParams: (query) => set(() => ({ query })),
  updateParam: (which, index, param) => {
    set((state) => ({
      hash: state[which].map((item, idx) =>
        idx === index ? { ...item, ...param } : item
      ),
    }));
  },
}));
