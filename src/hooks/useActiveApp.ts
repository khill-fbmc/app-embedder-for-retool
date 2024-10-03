import { useExtensionState } from "./useExtensionState";

export function useActiveApp() {
  const app = useExtensionState((s) => s.getActiveApp());
  const updateApp = useExtensionState((s) => s.updateActiveApp);

  return { app, updateApp };
}
