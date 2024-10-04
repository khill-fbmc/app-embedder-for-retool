import "./AppCard.css";

import { clsx } from "clsx";
import React from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";

import { useActiveApp } from "@/hooks/useActiveApp";
import { useAppUrl } from "@/hooks/useAppUrl";
import { useExtensionState } from "@/hooks/useExtensionState";

import type { RetoolApp, UrlParamSpec } from "@/types/extension";

// Base props
type Props = {
  app: RetoolApp;
};

// Props for the editable state
type EditProps = Props & {
  editable: true;
  onEdit: () => void;
};

// Props for the non-editable state
type StdProps = Props & {
  editable?: false | undefined;
};

function AppCard({ app, ...props }: EditProps | StdProps) {
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
              <Parameters params={app.query} />
            </Col>
          )}
          {app.hash.length > 0 && (
            <Col>
              <h5>Hash Params</h5>
              <Parameters params={app.hash} />
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
            className="btn-sm ms-auto"
            onClick={() => {
              if (props.editable) {
                props.onEdit();
              } else {
                setActiveApp(app.name);
              }
            }}
            variant={
              props.editable
                ? "outline-success"
                : isActive
                  ? "primary"
                  : "outline-primary"
            }
          >
            {props.editable ? "Edit" : isActive ? "⭐️ Active" : "Activate"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default AppCard;

const Parameters: React.FC<{ params: UrlParamSpec[] }> = ({ params }) => {
  return (
    <dl>
      {params.map((p) => (
        <div key={p.param}>
          <dt className="query">{p.param}</dt>
          <dd className="text-muted">{p.value}</dd>
        </div>
      ))}
    </dl>
  );
};
