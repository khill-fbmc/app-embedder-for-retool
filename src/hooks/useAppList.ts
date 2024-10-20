import { useStore } from "./useStore";

export function useAppList() {
  const apps = useStore((s) => s.apps);
  const addApp = useStore((s) => s.addApp);
  const removeApp = useStore((s) => s.removeApp);
  const updateApp = useStore((s) => s.updateApp);

  return {
    apps,
    addApp,
    removeApp,
    updateApp,
  };
}
