import { useExtensionState } from "./useExtensionState";

export function useActiveApp() {
  const app = useExtensionState((s) => s.getActiveApp());
  const updateActiveApp = useExtensionState((s) => s.updateActiveApp);
  const setActiveApp = useExtensionState((s) => s.setActiveApp);

  return { app, updateActiveApp, setActiveApp };
}
