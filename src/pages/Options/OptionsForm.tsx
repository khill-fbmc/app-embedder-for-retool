import React, { useEffect, useMemo, useState } from "react";
import { Button, Container } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import type { Environment, RetoolVersion } from "../../lib/RetoolURL";
import type { ExtensionSettings } from "../../lib/types";

type Props = {
  settings: ExtensionSettings;
  saveSettings: (settings: ExtensionSettings) => void;
};

const OptionsForm: React.FC<Props> = ({ settings, saveSettings }) => {
  const [app, setApp] = useState<string>("");
  const [domain, setDomain] = useState<string>("");
  const [env, setEnv] = useState<Environment>("production");
  const [version, setVersion] = useState<RetoolVersion>("latest");

  const handleSaveSettings = async () => {
    await saveSettings({
      domain,
      app,
      version,
      env,
    });
    console.log(settings);
  };

  return (
    <>
      <Form>
        <Form.Group
          className="mb-3"
          controlId="domain"
        >
          <Form.Label>Workspace Domain</Form.Label>
          <InputGroup className="">
            <InputGroup.Text>https://</InputGroup.Text>
            <Form.Control
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
            <InputGroup.Text>.retool.com</InputGroup.Text>
          </InputGroup>
          <Form.Text className="text-muted">This is your registered instance name.</Form.Text>
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="app"
        >
          <Form.Label>App Name</Form.Label>
          <InputGroup className="">
            <InputGroup.Text>https://{domain}.retool.com/app/</InputGroup.Text>
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
        <div className="d-flex justify-content-end">
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
      </Container>
    </>
  );
};

export default OptionsForm;
