import type { RetoolApp } from "@/types/extension";

export async function getWorkflowApps(
  apiKey: string,
  id: string
): Promise<{ apps: RetoolApp[] }> {
  const url = `https://api.retool.com/v1/workflows/${id}/startTrigger`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Workflow-Api-Key": apiKey,
    },
  });

  return await res.json();
}
