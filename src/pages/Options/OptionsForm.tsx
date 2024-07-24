import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
// eslint-disable-next-line import/no-named-as-default
import toast, { Toaster } from "react-hot-toast";

import { useRetoolUrl } from "../../hooks/useRetoolUrl";
import { useWorkflow } from "../../hooks/useWorkflow";
import { messages, storage } from "../../lib/chrome";

import type { Environment, RetoolUrlConfig, RetoolVersion } from "../../lib/RetoolURL";
import type { ExtensionSettings } from "../../types";

type Props = {
  settings: ExtensionSettings;
};

const OptionsForm: React.FC<Props> = ({ settings }) => {
  const [useWorkflowList, setUseWorkflowList] = useState(false);

  const {
    data: appList,
    error: appListError,
    isLoading,
    workflowUrl,
    workflowApiKey,
    setWorkflowUrl,
    setWorkflowApiKey,
  } = useWorkflow(`${settings?.workflowUrl}`, `${settings.workflowApiKey}`);

  const { url, domain, app, version, env, setApp, setDomain, setVersion, setEnv } = useRetoolUrl(
    settings as RetoolUrlConfig
  );

  const handleSaveSettings = async (reloadFrame = false) => {
    if (domain === "") {
      toast.error("Your Retool instance name cannot be blank, please fill in this field.");
      return;
    }
    if (app === "") {
      toast.error("You must provide a Retool app Name or ID, please fill in this field.");
      return;
    }
    try {
      await storage.save({
        domain,
        app,
        version,
        env,
        workflowUrl,
        workflowApiKey,
      });
      if (reloadFrame === false) {
        toast.success("Settings saved.");
      } else {
        toast.success(`Settings saved.\nReloading "${app}"`);
        messages.emitWorker("RELOAD_RETOOL_EMBED");
      }
      storage.load();
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
    }
  };

  return (
    <>
      <Row className="mt-2">
        <Col className="offset-1 col-10">
          <Form>
            <Form.Group
              className="mb-4"
              controlId="domain"
            >
              <Form.Label>
                Instance Name{"  "}
                <span className="d-inline ml-2 text-danger">(required)</span>
              </Form.Label>

              <InputGroup className="">
                <InputGroup.Text>https://</InputGroup.Text>
                <Form.Control
                  value={domain}
                  onChange={(e) => setDomain(e.target.value.replace(/\s/, ""))}
                />
                <InputGroup.Text>.retool.com</InputGroup.Text>
              </InputGroup>
              <Form.Text className="text-muted">
                This is your registered domain / instance name.
              </Form.Text>
            </Form.Group>
            <Form.Group
              className="mb-4"
              controlId="app"
            >
              <Form.Label>
                App Name{"  "}
                <span className="d-inline ml-2 text-danger">(required)</span>
              </Form.Label>
              {useWorkflowList ? (
                <Form.Select
                  value={app}
                  disabled={isLoading}
                  onChange={(e) => setApp(e.target.value as Environment)}
                >
                  {isLoading ? (
                    <option value="loading">Fetching...</option>
                  ) : (
                    appList?.map((appName) => (
                      <option
                        key={appName}
                        value={appName}
                      >
                        {appName}
                      </option>
                    ))
                  )}
                </Form.Select>
              ) : (
                <Form.Control
                  value={app}
                  onChange={(e) => setApp(e.target.value)}
                />
              )}
              <Form.Text className="text-muted">
                Use the "Share" button in the editor and copy the name / id from the URL after
                "app/"
              </Form.Text>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group
                  className="mb-4"
                  controlId="version"
                >
                  <Form.Label>Version</Form.Label>
                  <Form.Control
                    value={version}
                    onChange={(e) => {
                      const { value } = e.target;
                      if (value === "") {
                        setVersion("latest");
                      } else if (/(?:[0-9]+\.){2}[0-9]+/.test(value)) {
                        setVersion(e.target.value as RetoolVersion);
                      }
                    }}
                  />
                  <Form.Text className="text-muted">Input version: "1.2.3" or "latest"</Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="mb-4"
                  controlId="env"
                >
                  <Form.Label>Environment</Form.Label>
                  <Form.Select
                    value={env}
                    onChange={(e) => setEnv(e.target.value as Environment)}
                  >
                    <option value="production">Production</option>
                    <option value="staging">Staging</option>
                    <option value="development">Development</option>
                  </Form.Select>
                  <Form.Text className="text-muted">Select preferred environment</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group
              className="mb-4"
              controlId="url"
            >
              <Form.Label>Composed URL</Form.Label>
              <InputGroup>
                <Form.Control
                  disabled
                  readOnly
                  value={url}
                ></Form.Control>
                <Button
                  variant="secondary"
                  title={`Open "${app}" in a new Tab`}
                  onClick={() => window?.open(url, "_blank")}
                >
                  <i className="bi bi-box-arrow-up-right"></i>
                </Button>
              </InputGroup>
              <Form.Text className="text-muted">Does this look correct?</Form.Text>
            </Form.Group>

            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <div className="d-flex gap-2">
                    <i className="bi bi-cloud"></i>
                    Workflow App Name Provider
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Form.Group
                    className="mb-4"
                    controlId="workflowUrl"
                  >
                    <p className="text-muted">
                      Enable this feature to swap the <code>App Name</code> from an input field,
                      into a dynamic list fetched from a Retool Workflow.
                    </p>
                    <Form.Label>Workflow URL</Form.Label>
                    <Form.Control
                      value={workflowUrl}
                      disabled={!useWorkflowList}
                      onChange={(e) => setWorkflowUrl(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      Supply a Retool workflow URL that returns a <code>200</code> with a JSON body
                      formatted <code>{"{ apps: string[] }"}</code>
                    </Form.Text>
                  </Form.Group>
                  <Form.Group
                    className="mb-4"
                    controlId="workflowApiKey"
                  >
                    <Form.Label>Workflow API Key</Form.Label>
                    <Form.Control
                      type="password"
                      value={workflowApiKey}
                      disabled={!useWorkflowList}
                      onChange={(e) => setWorkflowApiKey(e.target.value)}
                    />
                    <Form.Text className="text-muted">Copy this value from Retool</Form.Text>
                  </Form.Group>

                  <Container className="d-flex justify-content-end">
                    <Button
                      variant={useWorkflowList ? "warning" : "success"}
                      title={`Enable using a workflow to provide the app name list`}
                      onClick={() => setUseWorkflowList((old) => !old)}
                    >
                      {useWorkflowList ? "Disable Feature" : "Enable Provider"}
                    </Button>
                  </Container>
                  {!useWorkflowList ? (
                    <p className="text-muted">❌ Disabled</p>
                  ) : isLoading ? (
                    <p className="text-muted">🚀 Fetching...</p>
                  ) : appListError ? (
                    <p className="text-danger">💣 Error! {appListError}</p>
                  ) : appList ? (
                    <p className="text-muted">✅ Success. Loaded {appList.length} app names.</p>
                  ) : (
                    <p className="text-muted">‼️ No results returned.</p>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <div className="d-flex gap-4 justify-content-center">
              <Button
                variant="success"
                type="submit"
                className="mt-4 px-5"
                onClick={(e) => {
                  e.preventDefault();
                  handleSaveSettings();
                  return false;
                }}
              >
                Save
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Toaster />
    </>
  );
};

export default OptionsForm;
