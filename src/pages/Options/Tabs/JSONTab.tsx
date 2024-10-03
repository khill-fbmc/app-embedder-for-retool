import JsonView from "@uiw/react-json-view";
import { githubLightTheme } from "@uiw/react-json-view/githubLight";
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "react-bootstrap";
import Container from "react-bootstrap/Container";

import { useExtensionStatePrimitives } from "@/hooks/useExtensionStatePrimitives";
import { log } from "@/lib/logger";

function JSONTab() {
  const state = useExtensionStatePrimitives();

  // const jsonState = useMemo(() => JSON.stringify(state, null, 2), [state]);

  const setCode = (code: string) => {
    log(code);
  };

  return (
    <Container className="pb-5">
      <div className="d-flex flex-column align-items-center">
        <Card className="shadow">
          <Card.Header>
            <span className="fs-4">Current State</span>
          </Card.Header>
          <Card.Body>
            <JsonView value={state} style={githubLightTheme} />
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default JSONTab;
