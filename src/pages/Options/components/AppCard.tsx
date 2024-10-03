import "./AppCard.css";

import { clsx } from "clsx";
import React from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";

import { useActiveApp } from "@/hooks/useActiveApp";
import { useAppUrl } from "@/hooks/useAppUrl";
import { useExtensionState } from "@/hooks/useExtensionState";

import type { RetoolApp } from "@/types";

type Props = {
  app: RetoolApp;
};

function AppCard({ app }: Props) {
  const appUrl = useAppUrl(app);
  const { app: activeApp } = useActiveApp();
  const setActiveApp = useExtensionState((s) => s.setActiveApp);

  const isActive = app.name === activeApp?.name;

  return (
    <Card
      className={clsx("app-card", isActive && "active")}
      // border={isActive ? "secondary" : ""}
    >
      <Card.Header
        className={clsx(
          "d-flex justify-content-between align-items-center",
          isActive && `bg-${app.env}`
        )}
      >
        <div className="d-flex gap-2 align-items-center">
          {app.name}
          <Badge pill bg="secondary">
            {app.version[0] === "l" ? app.version : `v${app.version}`}
          </Badge>
        </div>

        {/* {isActive && <span className="ml-auto">⭐️</span>} */}
        <span className={clsx("badge", `bg-${app.env}`)}>{app.env}</span>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          Public App:{" "}
          <span className="text-muted">{app.public ? "Yes" : "No"}</span>
        </Card.Text>
        <Row>
          {app.query.length > 0 && (
            <Col>
              <h5>Query Params</h5>
              <dl>
                {app.query.map((p) => (
                  <div key={p.param}>
                    <dt className="query">{p.param}</dt>
                    <dd className="text-muted">{p.value}</dd>
                  </div>
                ))}
              </dl>
            </Col>
          )}
          {app.hash.length > 0 && (
            <Col>
              <h5>Hash Params</h5>
              <dl>
                {app.hash.map((p) => (
                  <div key={p.param}>
                    <dt className="hash">{p.param}</dt>
                    <dd className="text-muted">{p.value}</dd>
                  </div>
                ))}
              </dl>
            </Col>
          )}
        </Row>
        <br />
        <div className="d-flex justify-space-between">
          <a
            target="_blank"
            rel="noreferrer"
            className="btn-sm d-flex align-items-center gap-1"
            href={appUrl}
          >
            <i className="bi bi-box-arrow-up-right"></i>Open in Retool
          </a>
          <Button
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
