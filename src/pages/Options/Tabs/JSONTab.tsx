import JsonView from "@uiw/react-json-view";
import { githubLightTheme } from "@uiw/react-json-view/githubLight";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import { type State, useExtensionState } from "@/hooks/useExtensionState";

function JSONTab() {
  // const state = {};
  const state = useExtensionState();
  // const state = useExtensionState((state) => {
  //   return {
  //     activeAppName: state.activeAppName,
  //     apps: state.apps,
  //   };
  // });
  return (
    <Container className="pb-5">
      <div className="d-flex flex-column align-items-center">
        <Card className="shadow">
          <Card.Header className="bg-success-subtle">
            <Card.Title>Extension State</Card.Title>
            <Card.Subtitle>Stored Apps and Settings</Card.Subtitle>
          </Card.Header>
          <Card.Body className="px-4">
            <JsonView
              value={state}
              collapsed={3}
              displayDataTypes={false}
              enableClipboard={false}
              style={githubLightTheme}
              shortenTextAfterLength={0}
            />
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default JSONTab;
