import "./Panel.css";

import React from "react";
import { Alert, Container } from "react-bootstrap";

import { StorageManager } from "../../lib/chrome.storage";
import { log } from "../../lib/logger";
import RetoolFrame from "./RetoolFrame";

import type { ExtensionSettings } from "../../types";

interface Props {
  settings: ExtensionSettings;
}

const storage = new StorageManager<ExtensionSettings>();

const Panel: React.FC<Props> = ({ settings }) => {
  const { app, domain, env, version } = settings;

  storage.onUpdate((settings) => {
    log("SETTINGS!", settings);
  });

  return (
    <Container>
      {app === "" ? (
        <Alert variant="warning">
          There is no domain set for your Retool instance. Open the{" "}
          <Alert.Link href={"#"}>an example link</Alert.Link>. Give it a click if
        </Alert>
      ) : (
        <RetoolFrame
          title="RetoolEmbedder"
          domain={`${domain}`}
          app={`${app}`}
          env={env}
          version={version}
        />
      )}
    </Container>
  );
};

export default Panel;
