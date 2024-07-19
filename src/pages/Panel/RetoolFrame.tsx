import React from "react";

import { useRetoolURL } from "../../hooks/useRetoolURL";

import type { Environment, RetoolVersion } from "../../lib/RetoolURL";

type Props = {
  title: string;
  domain: string;
  app: string;
  env?: Environment;
  version?: RetoolVersion;
};

const RetoolFrame: React.FC<Props> = ({ title, domain, app, version, env }) => {
  const { builder } = useRetoolURL({ app, version, domain, env });

  return (
    <iframe
      id="retool-frame"
      title={title}
      src={builder.embed().toString()}
      width="100%"
      height="100%"
    />
  );
};

export default RetoolFrame;
