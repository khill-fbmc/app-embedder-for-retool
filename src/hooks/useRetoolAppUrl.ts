import type { RetoolApp } from "@/types/extension";

function useRetoolAppUrl(domain: string): (app: RetoolApp) => URL;
function useRetoolAppUrl(domain: string, app?: RetoolApp): URL;
function useRetoolAppUrl(domain: string, app?: RetoolApp) {
  if (!app) {
    return (app: RetoolApp) => composeAppUrl(domain, app);
  } else {
    return composeAppUrl(domain, app);
  }
}

function composeAppUrl(domain: string, app: RetoolApp): URL {
  const base = `https://${domain}.retool.com/`;
  const path = `${app.public ? "p" : "app"}/${app.name}`;
  const url = new URL(path, base);

  app.query.forEach((q) => url.searchParams.append(q.param, q.value));

  url.searchParams.append("_version", app.version);
  url.searchParams.append("_environment", app.env);

  if (app.hash.length === 0) return url;

  const hashParams = new URLSearchParams(
    app.hash.map((h) => [h.param, h.value])
  );

  url.hash = hashParams.toString();

  return url;
}

export { useRetoolAppUrl };
