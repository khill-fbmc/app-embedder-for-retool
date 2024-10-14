import type { RetoolApp } from "@/types/extension";

function useRetoolUrl(domain: string): (app: RetoolApp) => string;
function useRetoolUrl(domain: string, app?: RetoolApp): string;
function useRetoolUrl(domain: string, app?: RetoolApp) {
  if (!app) {
    return (app: RetoolApp) => composeAppUrl(domain, app);
  } else {
    return composeAppUrl(domain, app);
  }
}

function composeAppUrl(domain: string, app: RetoolApp) {
  const base = `https://${domain}.retool.com/`;
  const path = `${app.public ? "p" : "app"}/${app.name}`;
  const url = new URL(path, base);

  app.query.forEach((q) => url.searchParams.append(q.param, q.value));

  if (app.hash.length === 0) {
    return `${url.toString()}`;
  }

  const hashParams = new URLSearchParams(
    app.hash.map((h) => [h.param, h.value])
  );

  return `${url.toString()}#${hashParams.toString()}`;
}

export { useRetoolUrl };
