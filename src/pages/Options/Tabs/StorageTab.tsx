import React from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";

import { useExtensionState } from "@/hooks/useExtensionState";

import AppCard from "../components/AppCard";

function StorageTab() {
  const reset = useExtensionState((s) => s.reset);

  const apps = useExtensionState((s) => s.apps);
  const activeApp = useExtensionState((s) => s.getActiveApp());

  return (
    <Container className="px-5 pb-5 mt-4">
      <Row>
        <Col className="offset-1 col-10">
          <Alert variant="primary">
            <Alert.Heading>Storage</Alert.Heading>
            Here are all your saved Retool App Definitions
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={() => reset()} variant="outline-primary">
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
            <Col md={12} lg={6} className="p-1">
              <AppCard
                key={app.name}
                isActive={app.name === activeApp?.name}
                app={app}
              />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default StorageTab;
