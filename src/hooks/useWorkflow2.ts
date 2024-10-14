import useSWR from "swr";

import type { RetoolApp } from "@/types/extension";
import { WorkflowDataFetcher } from "@/lib/WorkflowDataFetcher";

export function useWorkflow(
  apiKey: string,
  url: string | undefined | null | false
) {
  const fetch = async () => {
    const data = await WorkflowDataFetcher(url) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Workflow-Api-Key": apiKey,
      },
    });

    const data = (await res.json()) as { apps: RetoolApp[] };

    if (!data?.apps) {
      throw new Error(
        "The returned object from the workflow must have `apps` as a property."
      );
    }

    return data;
  }

  return useSWR<{ apps: RetoolApp[] }>(url, WorkflowDataFetcher);
}
