import "./Panel.css";

import React from "react";

import RetoolFrame from "./RetoolFrame";

import type { ExtensionSettings } from "../../types";

interface Props {
  settings: ExtensionSettings;
}

const Panel: React.FC<Props> = ({ settings }) => {
  const { app, domain, env, version } = settings;

  return (
    <div className="container">
      <RetoolFrame
        title="RetoolEmbedder"
        domain={`${domain}`}
        app={`${app}`}
        env={env}
        version={version}
      />
    </div>
  );
};

export default Panel;
