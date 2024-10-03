import React, { useMemo, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import { useExtensionState } from "@/hooks/useExtensionState";
import { useWorkflow } from "@/hooks/useWorkflow";

function WorkflowTab() {
  const workflowUrl = useExtensionState((s) => s.workflowUrl);
  const workflowApiKey = useExtensionState((s) => s.workflowApiKey);

  const {
    data: appList,
    error: appListError,
    isLoading,
    setWorkflowUrl,
    setWorkflowApiKey,
  } = useWorkflow(workflowUrl, workflowApiKey);

  const [useWorkflowList, setUseWorkflowList] = useState(false);

  return (
    <Container>
      <Accordion defaultActiveKey="0" className="shadow mt-2 mx-5">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="d-flex gap-2">
              <i className="bi bi-cloud"></i>
              Workflow App Name Provider
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-4" controlId="workflowUrl">
              <p className="text-muted">
                Enable this feature to swap the <code>App Name</code> from an
                input field, into a dynamic list fetched from a Retool Workflow.
              </p>
              <Form.Label>Workflow URL</Form.Label>
              <Form.Control
                value={workflowUrl}
                disabled={!useWorkflowList}
                onChange={(e) => setWorkflowUrl(e.target.value)}
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
                value={workflowApiKey}
                disabled={!useWorkflowList}
                onChange={(e) => setWorkflowApiKey(e.target.value)}
              />
              <Form.Text className="text-muted">
                Copy this value from Retool
              </Form.Text>
            </Form.Group>

            <Container className="d-flex justify-content-end">
              <Button
                variant={useWorkflowList ? "warning" : "primary"}
                title={`Enable using a workflow to provide the app name list`}
                onClick={() => setUseWorkflowList((old) => !old)}
              >
                {useWorkflowList ? "Disable Provider" : "Enable Provider"}
              </Button>
            </Container>
            {!useWorkflowList ? (
              <p className="text-muted">❌ Disabled</p>
            ) : isLoading ? (
              <p className="text-muted">🚀 Fetching...</p>
            ) : appListError ? (
              <p className="text-danger">💣 Error! {appListError}</p>
            ) : appList ? (
              <p className="text-muted">
                ✅ Success. Loaded {appList.length} app names.
              </p>
            ) : (
              <p className="text-muted">🔦 No results returned.</p>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default WorkflowTab;
