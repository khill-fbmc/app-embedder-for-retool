import React from "react";

import { useRetoolUrl } from "../../hooks/useRetoolUrl";
import { storage } from "../../lib/chrome";

import type { Environment, RetoolVersion } from "../../lib/RetoolURL";

type Props = {
  domain: string;
  app: string;
  env?: Environment;
  version?: RetoolVersion;
};

const RetoolFrame: React.FC<Props> = (settings) => {
  const { url, setApp, setEnv, setDomain, setVersion } = useRetoolUrl(settings);

  storage.onUpdate((settings) => {
    settings?.env && setEnv(settings.env);
    settings?.app && setApp(settings.app);
    settings?.domain && setDomain(settings.domain);
    settings?.version && setVersion(settings.version);
  });

  return (
    <iframe
      id="retool-frame"
      title={"Retool Embedder"}
      src={url}
      width="100%"
      height="100%"
    />
  );
};

export default RetoolFrame;
