import { useState } from "react";
import useSWR from "swr";

import { callWorkflow } from "../lib/workflows";

export function useWorkflow(url: string, apiKey: string) {
  const [workflowUrl, setWorkflowUrl] = useState<string>(url);
  const [workflowApiKey, setWorkflowApiKey] = useState<string>(apiKey);

  return {
    workflowUrl,
    workflowApiKey,
    setWorkflowUrl,
    setWorkflowApiKey,
    ...useSWR<string[]>(url, () => callWorkflow(url, workflowApiKey)),
  };
}
