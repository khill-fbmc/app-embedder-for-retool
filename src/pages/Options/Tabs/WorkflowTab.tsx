import React, { useEffect, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import useSWR from "swr";

import { useExtensionState } from "@/hooks/useExtensionState";
import { getWorkflowApps } from "@/lib/WorkflowDataFetcher";

import { SimpleJsonView } from "../components/SimpleJsonView";

import type { RetoolApp } from "@/types/extension";

function WorkflowTab() {
  const workflow = useExtensionState((s) => s.workflow);
  const updateWorkflow = useExtensionState((s) => s.updateWorkflow);

  const [useProvider, setUseProvider] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [workflowData, setWorkflowData] = useState<RetoolApp[]>([]);
  const [workflowError, setWorkflowError] = useState<string | undefined>();

  const fetchRemoteApps = async () => {
    setIsLoading(true);
    try {
      const reply = await getWorkflowApps(workflow.apiKey, workflow.id);
      if (reply.apps) {
        setWorkflowData(reply.apps);
      }
    } catch (e) {
      setWorkflowError((e as Error).message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (useProvider && workflow.id && workflow.apiKey) fetchRemoteApps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useProvider, workflow]);

  return (
    <Container>
      <div className="my-2 d-flex">
        <h2 className="mx-auto">Remote Apps List</h2>
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
                <Form.Label>Workflow ID</Form.Label>
                <Form.Control
                  value={workflow.id}
                  disabled={!useProvider}
                  onChange={(e) => updateWorkflow({ id: e.target.value })}
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
                  value={workflow.apiKey}
                  disabled={!useProvider}
                  onChange={(e) => updateWorkflow({ apiKey: e.target.value })}
                />
                <Form.Text className="text-muted">
                  Copy this value from Retool
                </Form.Text>
              </Form.Group>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex justify-content-between">
                <Button
                  variant={useProvider ? "warning" : "primary"}
                  title={`Enable using a workflow to provide the app name list`}
                  onClick={() => setUseProvider((old) => !old)}
                >
                  {useProvider ? "Disable Provider" : "Enable Provider"}
                </Button>
                <Button
                  variant={"success"}
                  disabled={useProvider === false}
                  title={`Refresh the app list from the remote workflow`}
                  onClick={() => fetchRemoteApps()}
                >
                  Refresh Apps
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </Col>

        <Col>
          <Card className="shadow">
            <Card.Header>
              <div className="d-flex gap-2">
                <i className="bi bi-cloud"></i>
                Workflow Data
              </div>
            </Card.Header>
            <Card.Body>
              {isLoading ? (
                <h1>Loading...</h1>
              ) : (
                <>
                  {workflowData.length > 0 ? (
                    <SimpleJsonView value={workflowData} />
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
                  {!useProvider ? (
                    <small className="text-muted">❌ Disabled</small>
                  ) : isLoading ? (
                    <small className="text-muted">🚀 Fetching...</small>
                  ) : workflowError ? (
                    <small className="text-danger">
                      💣 Error! {workflowError}
                    </small>
                  ) : workflowData.length > 0 ? (
                    <small className="text-muted">
                      ✅ <span className="text-success">Success.</span> Loaded{" "}
                      {workflowData.length} app names.
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
