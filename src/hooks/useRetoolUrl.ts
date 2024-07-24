import { useMemo, useState } from "react";

import { retoolUrl } from "../lib/RetoolURL";

import type { Environment, RetoolUrlConfig, RetoolVersion } from "../lib/RetoolURL";

export function useRetoolUrl(config: RetoolUrlConfig) {
  const [app, setApp] = useState<string>(config?.app ?? "");
  const [domain, setDomain] = useState<string>(config?.domain ?? "");
  const [env, setEnv] = useState<Environment>(config?.env ?? "production");
  const [version, setVersion] = useState<RetoolVersion>(config?.version ?? "latest");

  const url = useMemo(() => {
    return retoolUrl({ domain: `${domain}`, app, version, env })
      .embed()
      .toString();
  }, [domain, app, version, env]);

  return {
    url,
    app,
    env,
    domain,
    version,
    setApp,
    setEnv,
    setDomain,
    setVersion,
  };
}
