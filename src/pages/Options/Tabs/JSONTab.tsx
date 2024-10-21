import React from "react";
import { Card } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import { useStorePrimitives } from "@/hooks/useStorePrimitives";

import { SimpleJsonView } from "../components/SimpleJsonView";

function JSONTab() {
  const state = useStorePrimitives();

  return (
    <Container className="pb-5">
      <div className="d-flex flex-column align-items-center">
        <Card className="shadow">
          <Card.Header className="bg-success-subtle">
            <Card.Title>Extension State</Card.Title>
            <Card.Subtitle>Stored Apps and Settings</Card.Subtitle>
          </Card.Header>
          <Card.Body className="px-4">
            <SimpleJsonView value={state} />
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default JSONTab;
