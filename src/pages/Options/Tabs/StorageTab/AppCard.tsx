import React from "react";
import { Badge, Button, Card, CardLink, Container, Row } from "react-bootstrap";

import { useExtensionState } from "../../../../hooks/useExtensionState";

import type { RetoolApp } from "../../../../types";

type Props = {
  app: RetoolApp;
  isActive: boolean;
};

function AppCard({ app, isActive }: Props) {
  const setActiveApp = useExtensionState((s) => s.setActiveApp);

  return (
    // <Card bg=>
    <Card border={isActive ? "success" : ""}>
      <Card.Header
        className={`${isActive ? "text-bg-success" : ""} d-flex justify-content-between align-items-center`}
      >
        <div className="d-flex gap-2 align-items-center">
          {app.name}
          <Badge
            pill
            bg="secondary"
          >
            {app.version[0] === "l" ? app.version : `v${app.version}`}
          </Badge>
        </div>

        {/* {isActive && <span className="ml-auto">⭐️</span>} */}
        <span className={`badge environment-${app.env}`}>{app.env}</span>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          Public App: <span className="text-muted">{app.public ? "Yes" : "No"}</span>
        </Card.Text>
        {app.query.length > 0 && (
          <Row>
            <h5>Query Params</h5>
            <dl>
              {app.query.map((p) => (
                <>
                  <dt>{p.param}</dt>
                  <dd className="text-muted">{p.value}</dd>
                </>
              ))}
            </dl>
          </Row>
        )}
        {app.hash.length > 0 && (
          <Row>
            <h5>Hash Params</h5>
            <dl>
              {app.hash.map((p) => (
                <>
                  <dt>{p.param}</dt>
                  <dd className="text-muted">{p.value}</dd>
                </>
              ))}
            </dl>
          </Row>
        )}
        <div className="d-flex justify-content-end">
          <Button
            disabled={isActive}
            variant={isActive ? "primary" : "outline-primary"}
            className="btn-sm ms-auto"
            onClick={() => setActiveApp(app.name)}
          >
            {isActive ? "⭐️ Active" : "Activate"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default AppCard;
