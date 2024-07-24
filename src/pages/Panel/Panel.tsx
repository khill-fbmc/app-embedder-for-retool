import "./Panel.css";

import React from "react";
import { Alert, Container } from "react-bootstrap";

import RetoolFrame from "./RetoolFrame";

import type { ExtensionSettings } from "../../types";

interface Props {
  settings: Required<Omit<ExtensionSettings, "workflowUrl" | "workflowApiKey">>;
}

const Panel: React.FC<Props> = ({ settings }) => {
  return settings.app === "" ? (
    <Container
      id="error"
      className="full-height"
    >
      <Alert variant="warning">
        There is no domain set for your Retool instance. Open the{" "}
        <Alert.Link href={"#"}>an example link</Alert.Link>. Give it a click if
      </Alert>
    </Container>
  ) : (
    <RetoolFrame {...settings} />
  );
};

export default Panel;
