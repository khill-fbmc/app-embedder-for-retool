import React, { useMemo, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { type Environment, retoolUrl, type RetoolVersion } from "../../lib/RetoolURL";

import type { useChromeStorage } from "../../hooks/useChromeStorage";
import type { ExtensionSettings } from "../../lib/types";

type Props = {
  settings: ExtensionSettings;
  // saveSettings: (settings: ExtensionSettings) => void;
} & ReturnType<typeof useChromeStorage<ExtensionSettings>>;

const OptionsForm: React.FC<Props> = ({ settings, saveSettings, loadSettings }) => {
  const [app, setApp] = useState<string | undefined>(settings?.app);
  const [domain, setDomain] = useState<string | undefined>(settings?.domain);
  const [env, setEnv] = useState<Environment>(settings?.env ?? "production");
  const [version, setVersion] = useState<RetoolVersion>(settings?.version ?? "latest");

  const url = useMemo(() => {
    return retoolUrl({ domain: `${domain}`, app, version, env })
      .embed()
      .toString();
  }, [domain, app, version, env]);

  const handleSaveSettings = async () => {
    await saveSettings({
      domain,
      app,
      version,
      env,
    });
    alert("Saved!");
  };

  return (
    <>
      <Form>
        <Form.Group
          className="mb-3"
          controlId="domain"
        >
          <Form.Label>Instance Name</Form.Label>
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
          className="mb-3"
          controlId="app"
        >
          <Form.Label>App Name</Form.Label>
          <InputGroup className="">
            <InputGroup.Text>
              https://{domain === "" ? <span className="text-danger">undefined</span> : domain}
              .retool.com/app/
            </InputGroup.Text>
            <Form.Control
              value={app}
              onChange={(e) => setApp(e.target.value)}
            />
          </InputGroup>
          <Form.Text className="text-muted">
            Use the "Share" button in the top right of the editor and copy the name from the URL
            after "app/"
          </Form.Text>
        </Form.Group>
        <Form.Group
          className="mb-3"
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
          <Form.Text className="text-muted">
            Input a specific version "1.2.3" or "latest" (default: "latest")
          </Form.Text>
        </Form.Group>
        <Form.Group
          className="mb-3"
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
          <Form.Text className="text-muted">Select preferred environment.</Form.Text>
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="url"
        >
          <Form.Label>Composed URL</Form.Label>
          <Form.Control
            disabled
            readOnly
            value={url}
          ></Form.Control>
          <Form.Text className="text-muted">Does this look correct?</Form.Text>
        </Form.Group>
        <div className="d-flex gap-4 justify-content-end">
          <Button
            variant="primary"
            type="button"
            className="mt-4"
            onClick={(e) => {
              e.preventDefault();
              loadSettings();
              return false;
            }}
          >
            Load Settings
          </Button>
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
            Save Settings
          </Button>
        </div>
      </Form>
      <Container>
        <p>Debugging</p>
        <Row>
          <Col>
            Form
            <pre>
              {JSON.stringify(
                {
                  domain,
                  app,
                  version,
                  env,
                },
                null,
                2
              )}
            </pre>
          </Col>
          <Col>
            Loaded Settings
            <pre>{JSON.stringify(settings, null, 2)}</pre>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OptionsForm;
