import React, { useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
// eslint-disable-next-line import/no-named-as-default
import toast, { Toaster } from "react-hot-toast";

import * as MessageBroker from "../../lib/chrome.messages";
import { StorageManager } from "../../lib/chrome.storage";
import { log } from "../../lib/logger";
import { type Environment, retoolUrl, type RetoolVersion } from "../../lib/RetoolURL";

import type { ExtensionSettings } from "../../types";

type Props = {
  settings: ExtensionSettings;
};

const OptionsForm: React.FC<Props> = ({ settings }) => {
  const storage = new StorageManager<ExtensionSettings>();
  const [app, setApp] = useState<string | undefined>(settings?.app);
  const [domain, setDomain] = useState<string | undefined>(settings?.domain);
  const [env, setEnv] = useState<Environment>(settings?.env ?? "production");
  const [version, setVersion] = useState<RetoolVersion>(settings?.version ?? "latest");

  const url = useMemo(() => {
    return retoolUrl({ domain: `${domain}`, app, version, env })
      .embed()
      .toString();
  }, [domain, app, version, env]);

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
      });
      if (reloadFrame === false) {
        toast.success("Settings saved.");
      } else {
        toast.success(`Settings saved.\nReloading "${app}"`);
        MessageBroker.emitWorker("RELOAD_RETOOL_EMBED");
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
              {/* <InputGroup className="">
                <InputGroup.Text>
                  https://{domain === "" ? <span className="text-danger">undefined</span> : domain}
                  .retool.com/app/
                </InputGroup.Text> */}
              <Form.Control
                value={app}
                onChange={(e) => setApp(e.target.value)}
              />
              {/* </InputGroup> */}
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
            <div className="d-flex gap-4 justify-content-end">
              <Button
                variant="success"
                type="submit"
                className="mt-4"
                onClick={(e) => {
                  e.preventDefault();
                  handleSaveSettings();
                  return false;
                }}
              >
                Save
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="mt-4"
                onClick={(e) => {
                  e.preventDefault();
                  handleSaveSettings(true);
                  return false;
                }}
              >
                Save & Reload
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
