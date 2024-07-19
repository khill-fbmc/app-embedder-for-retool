import React from "react";
import { Container } from "react-bootstrap";

import { type Environment, retoolUrl, type RetoolVersion } from "../../lib/RetoolURL";

type Props = {
  title: string;
  domain: string;
  app: string;
  env?: Environment;
  version?: RetoolVersion;
};

const RetoolFrame: React.FC<Props> = ({ title, domain, app, version, env }) => {
  const url = retoolUrl({ app, version, domain, env }).embed();
  return (
    <iframe
      id="retool-frame"
      title={title}
      src={url.toString()}
      width="100%"
      height="100%"
    />
  );
};

export default RetoolFrame;
