import { useState } from "react";
import useSWR from "swr";

const callWorkflow = async (url: string, workflowApiKey: string): Promise<string[]> => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Workflow-Api-Key": workflowApiKey,
    },
  });
  const data = (await res.json()) as { apps: string[] };
  return data.apps ?? [];
};

export function useWorkflow(url: string, apiKey: string) {
  const [workflowUrl, setWorkflowUrl] = useState<string>(url);
  const [workflowApiKey, setWorkflowApiKey] = useState<string>(apiKey);

  return {
    workflowUrl,
    workflowApiKey,
    setWorkflowUrl,
    setWorkflowApiKey,
    ...useSWR<string[]>(url, (keyIsUrl: string) => callWorkflow(keyIsUrl, workflowApiKey)),
  };
}
