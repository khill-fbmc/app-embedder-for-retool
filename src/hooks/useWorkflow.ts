import { useState } from "react";
import useSWR from "swr";

import type { RetoolApp } from "@/types/extension";

export function useWorkflow(url: string, apiKey: string) {
  const [workflowUrl, setWorkflowUrl] = useState<string>(url);
  const [workflowApiKey, setWorkflowApiKey] = useState<string>(apiKey);

  return {
    state: {
      workflowUrl,
      workflowApiKey,
    },
    setWorkflowUrl,
    setWorkflowApiKey,
    ...useSWR<WorkflowResult>(url, () => callWorkflow(url, workflowApiKey)),
  };
}

async function callWorkflow(
  url: string,
  workflowApiKey: string
): Promise<WorkflowResult> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Workflow-Api-Key": workflowApiKey,
    },
  });

  const data = (await res.json()) as { apps: RetoolApp[] };

  if (!data?.apps) {
    throw new Error(
      "The returned object from the workflow must have `apps` as a property."
    );
  }

  return { apps: data.apps };
}

type WorkflowResult = {
  apps: RetoolApp[];
};
