import "./AppCard.css";

import { clsx } from "clsx";
import React from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";

import { useComposedUrl } from "@/hooks/useComposedUrl";
import { useExtensionState } from "@/hooks/useExtensionState";

import type { RetoolApp } from "@/types";

type Props = {
  app: RetoolApp;
  isActive: boolean;
};

function AppCard({ app, isActive }: Props) {
  const domain = useExtensionState((s) => s.domain);
  const setActiveApp = useExtensionState((s) => s.setActiveApp);

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
                  <>
                    <dt className="query">{p.param}</dt>
                    <dd className="text-muted">{p.value}</dd>
                  </>
                ))}
              </dl>
            </Col>
          )}
          {app.hash.length > 0 && (
            <Col>
              <h5>Hash Params</h5>
              <dl>
                {app.hash.map((p) => (
                  <>
                    <dt className="hash">{p.param}</dt>
                    <dd className="text-muted">{p.value}</dd>
                  </>
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
            href={useComposedUrl(domain, app)}
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
