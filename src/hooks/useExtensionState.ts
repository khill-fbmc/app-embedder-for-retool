import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import ChromeStateStorage from "@/lib/ChromeStateStorage";
import { DEMO_APPS, INSPECTOR_APP } from "@/lib/EmbeddableApps";

import type { RetoolApp } from "@/types/extension";

type State = {
  domain: string;
  apps: RetoolApp[];
  isEditing: boolean;
  activeAppName: RetoolApp["name"] | undefined;
  // activeApp: RetoolApp | undefined;
  workflow: {
    url: string;
    apiKey: string;
  };
};

interface Actions {
  reset: () => void;
  setDomain: (domain: State["domain"]) => void;
  setActiveApp: (activeAppName: State["activeAppName"]) => void;
  addApp: (app: RetoolApp) => void;
  updateApp: (name: string, props: Partial<RetoolApp>) => void;
  getActiveApp: () => RetoolApp | undefined;
  updateActiveApp: (props: Partial<RetoolApp>) => void;
  setEditMode: (state: boolean) => void;
  updateWorkflow: (workflow: Partial<State["workflow"]>) => void;
}

export const STORAGE_KEY = "app-embedder-for-retool";

const initialState: State = {
  domain: "",
  isEditing: false,
  activeAppName: INSPECTOR_APP["name"],
  workflow: {
    url: "",
    apiKey: "",
  },
  apps: [INSPECTOR_APP, ...DEMO_APPS],
};

export const useExtensionState = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,
      reset: () => set(initialState),
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
      getActiveApp: () => {
        return get().apps.find((app) => app.name === get().activeAppName);
      },
      updateActiveApp: (props) => {
        const name = get().activeAppName;
        if (name) {
          get().updateApp(name, props);
        }
      },
      updateWorkflow: (props) =>
        set((state) =>
          Object.assign(state, { workflow: { ...state.workflow, ...props } })
        ),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => ChromeStateStorage),
    }
  )
);
