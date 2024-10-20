import { useState } from "react";

import type { RetoolApp } from "@/types/extension";

export function useWorkflowData(apiKey: string, id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [workflowData, setWorkflowData] = useState<RetoolApp[]>([]);
  const [workflowError, setWorkflowError] = useState<string | undefined>();

  const fetchWorkflowData = async () => {
    setIsLoading(true);
    try {
      const url = `https://api.retool.com/v1/workflows/${id}/startTrigger`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Workflow-Api-Key": apiKey,
        },
      });

      const result = (await res.json()) as { apps: RetoolApp[] };

      setWorkflowData(result?.apps);
    } catch (e) {
      setWorkflowError((e as Error).message);
    }
    setIsLoading(false);
  };

  return {
    fetchWorkflowData,
    workflow: {
      isLoading,
      data: workflowData,
      error: workflowError,
    },
  };
}
