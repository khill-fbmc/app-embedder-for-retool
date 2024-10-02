import React from "react";
import Form from "react-bootstrap/Form";

import { useExtensionState } from "../../../../hooks/useExtensionState";

export default function AppNameInput() {
  const getActiveApp = useExtensionState((s) => s.getActiveApp);
  const updateActiveApp = useExtensionState((s) => s.updateActiveApp);

  const app = getActiveApp();

  return (
    <Form.Group
      className="mb-4"
      controlId="app"
    >
      <Form.Label>
        App Name{"  "}
        <span className="d-inline ml-2 text-danger">(required)</span>
      </Form.Label>
      <Form.Control
        value={app?.name}
        onChange={(e) => updateActiveApp({ name: e.target.value })}
      />
      <Form.Text className="text-muted">
        Use the "Share" button in the editor and copy the name / id from the URL after "app/"
      </Form.Text>
    </Form.Group>
  );
}
