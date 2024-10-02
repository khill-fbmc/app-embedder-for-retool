import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { useExtensionState } from "../../../../hooks/useExtensionState";
import AppCard from "./AppCard";

import type { SerializedSettings } from "../../../../lib/storage";

type Props = {
  settings: SerializedSettings;
};

function StorageTab({ settings }: Props) {
  const reset = useExtensionState((s) => s.reset);
  const state = useExtensionState((state) => JSON.stringify(state, null, 2));

  const apps = useExtensionState((s) => s.apps);
  const activeApp = useExtensionState((s) => s.getActiveApp());

  return (
    <Container className="px-5 mt-4">
      <Row>
        <Col className="offset-1 col-10">
          <Alert variant="primary">
            <Alert.Heading>Storage</Alert.Heading>
            Here are all your saved Retool App Definitions
            <hr />
            <div className="d-flex justify-content-end">
              <Button
                onClick={() => reset()}
                variant="outline-primary"
              >
                Reset State
              </Button>
            </div>
          </Alert>
        </Col>
      </Row>
      <Row>
        {!apps.length ? (
          <></>
        ) : (
          apps.map((app) => (
            <Col
              md={12}
              lg={6}
              className="p-1"
            >
              <AppCard
                key={app.name}
                isActive={app.name === activeApp?.name}
                app={app}
              />
            </Col>
          ))
        )}
      </Row>

      <Row>
        <Col>
          <pre>{state}</pre>
        </Col>
      </Row>
    </Container>
  );
}

export default StorageTab;
