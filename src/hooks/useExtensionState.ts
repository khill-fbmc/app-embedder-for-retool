import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import ChromeStateStorage from "@/lib/ChromeStateStorage";
import { DEMO_APPS, INSPECTOR_APP } from "@/lib/EmbeddableApps";

import type { RetoolApp } from "@/types/extension";

export type State = {
  domain: string;
  isEditing: boolean;
  activeAppName: RetoolApp["name"] | undefined;
  // activeApp: RetoolApp | undefined;
  workflow: {
    id: string;
    apiKey: string;
  };
  apps: RetoolApp[];
};

export type Actions = {
  setDomain: (domain: State["domain"]) => void;
  setActiveApp: (activeAppName: State["activeAppName"]) => void;
  addApp: (app: RetoolApp) => void;
  updateApp: (name: string, props: Partial<RetoolApp>) => void;
  updateActiveApp: (props: Partial<RetoolApp>) => void;
  setEditMode: (state: boolean) => void;
  updateWorkflow: (workflow: Partial<State["workflow"]>) => void;
};

export const STORAGE_KEY = "app-embedder-for-retool2";

const initialState: State = {
  domain: "",
  isEditing: false,
  activeAppName: INSPECTOR_APP["name"],
  workflow: {
    id: "13d34554-9891-40c0-a032-fda523774e97",
    apiKey: "retool_wk_bde9d74b27644cf3a0691211ff18dee2",
  },
  apps: [INSPECTOR_APP, ...DEMO_APPS],
};

export const useExtensionState = create<State & Actions>()(
  // persist(
  (set, get) => ({
    ...initialState,
    setDomain: (domain) => set(() => ({ domain })),
    setEditMode: (isEditing) => set(() => ({ isEditing })),
    setActiveApp: (activeAppName) => set(() => ({ activeAppName })),
    addApp: (app) => set((state) => ({ apps: [...state.apps, app] })),
    updateApp: (name, props) => {
      set((state) => ({
        apps: state.apps.map((app) => {
          return app.name === name ? { ...app, ...props } : app;
        }),
      }));
    },
    updateActiveApp: (props) => {
      const name = get().activeAppName;
      if (name) {
        get().updateApp(name, props);
      }
    },
    updateWorkflow: (props) =>
      set((state) => ({
        ...state,
        workflow: { ...state.workflow, ...props },
      })),
  })
  //   {
  //     name: STORAGE_KEY,
  //     storage: createJSONStorage(() => ChromeStateStorage),
  //   }
  // )
);

export const getActiveApp = () => {
  const state = useExtensionState.getState();
  return state.apps.find((app) => app.name === state.activeAppName);
};

export const reset = () => useExtensionState.setState(initialState);
