import React, { useEffect } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import prism from "react-syntax-highlighter/dist/esm/styles/prism/vs";

import { useStore } from "@/hooks/useStore";
import { useWorkflowData } from "@/hooks/useWorkflow";

import { SimpleJsonView } from "../components/SimpleJsonView";

SyntaxHighlighter.registerLanguage("typescript", typescript);
function WorkflowTab() {
  const schema = String(process.env.APP_SCHEMA).replace(/^export\s/, "");

  console.log(schema);

  const {
    apiKey,
    id: workflowId,
    enabled: workflowEnabled,
  } = useStore((s) => s.workflow);

  const updateWorkflow = useStore((s) => s.updateWorkflow);
  const retoolWorkflowUrl = useStore((s) => s.getRetoolWorkflowUrl);
  const toggleWorkflowProvider = useStore((s) => s.toggleWorkflowProvider);

  const { workflow, fetchWorkflowData } = useWorkflowData(apiKey, workflowId);

  useEffect(() => {
    if (workflowEnabled && workflowId && apiKey) {
      fetchWorkflowData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workflowEnabled, workflowId, apiKey]);

  return (
    <Container>
      <div className="my-2 d-flex">
        <h2 className="mx-auto">Workflow Provider</h2>
      </div>

      <Row>
        <Col className="offset-1 col-10">
          <Alert variant="warning">
            <Alert.Heading>How To Use</Alert.Heading>
            Use the workflow provider to add more apps to your list, from
            Retool!
          </Alert>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="d-flex flex-column gap-3">
            <Card className="shadow">
              <Card.Header className="d-inline-flex justify-content-between">
                <div className="d-flex gap-2">
                  <i className="bi bi-cloud"></i>
                  Workflow
                </div>
                <a
                  className="d-flex gap-2 link-secondary"
                  href={retoolWorkflowUrl()}
                  target="_blank"
                  rel="noreferrer"
                >
                  View in Retool<i className="bi bi-box-arrow-up-right"></i>
                </a>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-4" controlId="workflowUrl">
                  <p className="text-muted">
                    Enable this feature to use a <code>Retool Workflow</code> to
                    provide the additional apps to the available list.
                  </p>
                  <Form.Label>Workflow ID</Form.Label>
                  <Form.Control
                    value={workflowId}
                    disabled={workflowEnabled === false}
                    onChange={(e) => updateWorkflow({ id: e.target.value })}
                    data-testid="workflow-input-id"
                  />
                  <Form.Text className="text-muted">
                    Copy from the URL
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-4" controlId="workflowApiKey">
                  <Form.Label>Workflow API Key</Form.Label>
                  <Form.Control
                    type="password"
                    value={apiKey}
                    disabled={workflowEnabled === false}
                    onChange={(e) => updateWorkflow({ apiKey: e.target.value })}
                    data-testid="workflow-input-apikey"
                  />
                  <Form.Text className="text-muted">
                    Copy from Retool Editor
                  </Form.Text>
                </Form.Group>
              </Card.Body>
              <Card.Footer>
                <div className="d-flex justify-content-between">
                  <Button
                    variant={workflowEnabled ? "warning" : "primary"}
                    title={`Enable using a workflow to provide the app name list`}
                    onClick={toggleWorkflowProvider}
                    data-testid="workflow-button-toggle"
                  >
                    {workflowEnabled ? "Disable Provider" : "Enable Provider"}
                  </Button>
                  <Button
                    variant={"success"}
                    disabled={workflowEnabled === false}
                    title={`Refresh the app list from the remote workflow`}
                    onClick={fetchWorkflowData}
                    data-testid="workflow-button-refresh"
                  >
                    Refresh Apps
                  </Button>
                </div>
              </Card.Footer>
            </Card>

            <Card className="shadow">
              <Card.Header>App Schema</Card.Header>
              <Card.Body>
                <p className="text-muted">
                  The workflow must must respond with a <code>200</code>{" "}
                  response that is in the format of <code>RetoolApp[]</code>.
                </p>
                <p className="text-muted">
                  The following are the TypeScript types for a{" "}
                  <code>RetoolApp</code>.
                </p>
                <SyntaxHighlighter language="typescript" style={prism}>
                  {schema}
                </SyntaxHighlighter>
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col>
          <Card className="shadow">
            <Card.Header>
              <div className="d-flex gap-2">
                <i className="bi bi-cloud"></i>
                Remote App List
              </div>
            </Card.Header>
            <Card.Body>
              {workflow.isLoading ? (
                <h2>Loading...</h2>
              ) : (
                <>
                  {workflow.data.length > 0 ? (
                    <SimpleJsonView value={workflow.data} />
                  ) : (
                    <Alert variant="danger">
                      No Apps Returned From Workflow
                    </Alert>
                  )}
                </>
              )}
            </Card.Body>
            <Card.Footer>
              <div className="d-flex justify-content-between">
                <small className="text-muted">Last update: 3 mins ago</small>
                <div>
                  {!workflowEnabled ? (
                    <small className="text-muted">❌ Disabled</small>
                  ) : workflow.isLoading ? (
                    <small className="text-muted">🚀 Fetching...</small>
                  ) : workflow.error ? (
                    <small className="text-danger">
                      💣 Error! {workflow.error}
                    </small>
                  ) : workflow.data.length > 0 ? (
                    <small className="text-muted">
                      ✅ <span className="text-success">Success.</span> Loaded{" "}
                      {workflow.data.length} app names.
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
