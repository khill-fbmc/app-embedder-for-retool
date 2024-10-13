import JsonView from "@uiw/react-json-view";
import React, { useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import { useExtensionState } from "@/hooks/useExtensionState";
import { useWorkflow } from "@/hooks/useWorkflow2";

function WorkflowTab() {
  const updateWorkflow = useExtensionState((s) => s.updateWorkflow);
  const { apiKey, url } = useExtensionState((s) => s.workflow);

  const [useWorkflowProvider, setUseWorkflowProvider] = useState(false);

  // const { data, error, isLoading } = useWorkflow(apiKey, url);
  const data = { apps: [] };
  return (
    <Container>
      <div className="my-2 d-flex">
        <h2 className="mx-auto">Workflow Apps List</h2>
      </div>

      <Row>
        <Col className="offset-1 col-10">
          <Alert variant="warning">
            <Alert.Heading>How To Use</Alert.Heading>
            Here are all your saved Retool App Definitions
          </Alert>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow">
            <Card.Header>
              <div className="d-flex gap-2">
                <i className="bi bi-cloud"></i>
                Workflow Details
              </div>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-4" controlId="workflowUrl">
                <p className="text-muted">
                  Enable this feature to swap the <code>App Name</code> from an
                  input field, into a dynamic list fetched from a Retool
                  Workflow.
                </p>
                <Form.Label>Workflow URL</Form.Label>
                <Form.Control
                  value={url}
                  disabled={!useWorkflowProvider}
                  onChange={(e) => updateWorkflow({ url: e.target.value })}
                />
                <Form.Text className="text-muted">
                  Supply a Retool workflow URL that returns a <code>200</code>{" "}
                  with a JSON body formatted <code>{"{ apps: string[] }"}</code>
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-4" controlId="workflowApiKey">
                <Form.Label>Workflow API Key</Form.Label>
                <Form.Control
                  type="password"
                  value={apiKey}
                  disabled={!useWorkflowProvider}
                  onChange={(e) => updateWorkflow({ apiKey: e.target.value })}
                />
                <Form.Text className="text-muted">
                  Copy this value from Retool
                </Form.Text>
              </Form.Group>

              <Container className="d-flex justify-content-end">
                <Button
                  variant={useWorkflowProvider ? "warning" : "primary"}
                  title={`Enable using a workflow to provide the app name list`}
                  onClick={() => setUseWorkflowProvider((old) => !old)}
                >
                  {useWorkflowProvider ? "Disable Provider" : "Enable Provider"}
                </Button>
              </Container>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex justify-content-between">
                <small className="text-muted">Last updated 3 mins ago</small>
                <div>
                  {!useWorkflowProvider ? (
                    <small className="text-muted">❌ Disabled</small>
                  ) : isLoading ? (
                    <small className="text-muted">🚀 Fetching...</small>
                  ) : error ? (
                    <small className="text-danger">💣 Error! {error}</small>
                  ) : data ? (
                    <small className="text-muted">
                      ✅ <span className="text-success">Success.</span> Loaded{" "}
                      {data.apps.length} app names.
                    </small>
                  ) : (
                    <small className="text-muted">
                      🔦 No results returned.
                    </small>
                  )}
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Col>

        <Col>2</Col>

        <Col>
          <Card className="shadow">
            <Card.Header>
              <div className="d-flex gap-2">
                <i className="bi bi-cloud"></i>
                Workflow Details
              </div>
            </Card.Header>
            <Card.Body>
              <JsonView value={data} />
            </Card.Body>
            <Card.Footer>
              <div className="d-flex justify-content-between">
                <small className="text-muted">Last updated 3 mins ago</small>
                <div>
                  {!useWorkflowProvider ? (
                    <small className="text-muted">❌ Disabled</small>
                  ) : isLoading ? (
                    <small className="text-muted">🚀 Fetching...</small>
                  ) : error ? (
                    <small className="text-danger">💣 Error! {error}</small>
                  ) : data ? (
                    <small className="text-muted">
                      ✅ <span className="text-success">Success.</span> Loaded{" "}
                      {data.apps.length} app names.
                    </small>
                  ) : (
                    <small className="text-muted">
                      🔦 No results returned.
                    </small>
                  )}
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default WorkflowTab;
