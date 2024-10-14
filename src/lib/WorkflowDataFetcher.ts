import type { RetoolApp } from "@/types/extension";

export async function WorkflowDataFetcher(
  apiKey: string,
  url: string
): Promise<{ apps: RetoolApp[] }> {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Workflow-Api-Key": apiKey,
    },
  }).then((res) => {
    const json = res.json();
    console.log(json);
    return json;
  });
}
