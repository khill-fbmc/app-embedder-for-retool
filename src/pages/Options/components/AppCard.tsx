import "./AppCard.css";

import { clsx } from "clsx";
import React, { useMemo } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";

import { useDomain } from "@/hooks/useDomain";
import { useEditMode } from "@/hooks/useEditMode";
import { useExtensionState } from "@/hooks/useExtensionState";
import { useRetoolUrl } from "@/hooks/useRetoolUrl";

import type { RetoolApp, UrlParam } from "@/types/extension";

// Base props
type BaseProps = {
  app: RetoolApp;
  isActive: boolean;
};

type StdProps = BaseProps & {
  editable?: false | undefined;
};

type EditProps = BaseProps & {
  editable: true;
  onEdit: () => void;
};

type Props = EditProps | StdProps;

function AppCard({ app, isActive, ...props }: Props) {
  const { endEditMode } = useEditMode();
  const { domain } = useDomain();
  const setActiveApp = useExtensionState((s) => s.setActiveApp);

  const appUrl = useRetoolUrl(domain, app);

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
                endEditMode();
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

const Parameters: React.FC<{ params: UrlParam[] }> = ({ params }) => {
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
