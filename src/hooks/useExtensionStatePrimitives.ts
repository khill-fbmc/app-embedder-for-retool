import { useExtensionState } from "./useExtensionState";

export function useExtensionStatePrimitives() {
  const domain = useExtensionState((s) => s.domain);
  const apps = useExtensionState((s) => s.apps);
  const activeAppName = useExtensionState((s) => s.activeAppName);

  const workflowUrl = useExtensionState((s) => s.workflowUrl);
  const workflowApiKey = useExtensionState((s) => s.workflowApiKey);

  return { domain, activeAppName, workflowUrl, workflowApiKey, apps };
}
