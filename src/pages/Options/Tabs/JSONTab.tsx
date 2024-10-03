import JsonView from "@uiw/react-json-view";
import { githubLightTheme } from "@uiw/react-json-view/githubLight";
import React from "react";
import { Card } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import { useExtensionStatePrimitives } from "@/hooks/useExtensionStatePrimitives";

function JSONTab() {
  const state = useExtensionStatePrimitives();

  return (
    <Container className="pb-5">
      <div className="d-flex flex-column align-items-center">
        <Card className="shadow">
          <Card.Header className="bg-success-subtle">
            <span className="fs-4">Current State</span>
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
