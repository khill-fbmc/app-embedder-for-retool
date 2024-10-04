import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import { useExtensionState } from "@/hooks/useExtensionState";

import AppCard from "../components/AppCard";
import DomainInput from "../components/DomainInput";
import AppForm from "./AppForm";

function OptionsForm() {
  const getActiveApp = useExtensionState((s) => s.getActiveApp);
  const updateApp = useExtensionState((s) => s.updateActiveApp);
  const [editing, setEditing] = useState(false);

  const domain = useExtensionState((s) => s.domain);
  const activeAppName = useExtensionState((s) => s.activeAppName);

  const app = getActiveApp();

  useEffect(() => {
    // reset(getActiveApp());
  }, [activeAppName]);

  return (
    <>
      <Row className="mt-2">
        <Col lg={{ offset: 2, span: 8 }} sm={{ offset: 1, span: 10 }} xs={12}>
          <h3>General Config</h3>
          <DomainInput />

          <h3 className="mt-2">Current App</h3>
          {!editing ? (
            <Container className="pt-2">
              <AppCard editable app={app!} onEdit={() => setEditing(true)} />
            </Container>
          ) : (
            <>
              <AppForm app={app!} />
              <div className="d-flex gap-5">
                <Button
                  className="px-3"
                  variant="outline-danger"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-fill px-5"
                  type="submit"
                  variant="success"
                >
                  Save
                </Button>
              </div>
            </>
          )}
        </Col>
      </Row>
    </>
  );
}

export default OptionsForm;
