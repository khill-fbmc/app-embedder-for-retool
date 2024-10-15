import "./AppCard.css";

import { clsx } from "clsx";
import React from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";

import { useEditMode } from "@/hooks/useEditMode";
import { useRetoolAppUrl } from "@/hooks/useRetoolAppUrl";
import { useStore } from "@/hooks/useStore";

import AppVisibilityBadge from "./AppVisibilityBadge";

import type { RetoolApp, UrlParam } from "@/types/extension";

type BaseProps = {
  app?: RetoolApp;
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
  const domain = useStore((s) => s.domain);
  const setActiveApp = useStore((s) => s.setActiveApp);

  const appUrl = useRetoolAppUrl(domain, app);

  return (
    <Card
      className={clsx("app-card", isActive && "active")}
      // border={isActive ? "secondary" : ""}
    >
      <Card.Header
        className={clsx(
          "d-flex justify-content-between align-items-center",
          isActive && `bg-${app?.env}`,
          isActive && app?.env === "production" && "text-white",
          isActive && app?.env === "development" && "text-white"
        )}
      >
        {app?.name}
        <span className={clsx("badge", `bg-${app?.env}`)}>{app?.env}</span>
      </Card.Header>
      <Card.Body>
        <Row>
          {app?.query && (
            <Col>
              <h5>Query Params</h5>
              <Parameters type="query" params={app.query} />
            </Col>
          )}
          {app?.hash && (
            <Col>
              <h5>Hash Params</h5>
              <Parameters type="hash" params={app.hash} />
            </Col>
          )}
        </Row>
        <div className="d-flex my-2 justify-content-center">
          <a
            target="_blank"
            rel="noreferrer"
            className="btn-sm d-flex align-items-center gap-1"
            href={appUrl}
          >
            <i className="bi bi-box-arrow-up-right"></i>Open in Retool
          </a>
        </div>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex justify-space-between">
          <div className="d-flex gap-2 align-items-center">
            <AppVisibilityBadge isPublic={app?.public} />
            <Badge pill bg="secondary">
              {app?.version[0] === "l" ? app?.version : `v${app?.version}`}
            </Badge>
          </div>

          <Button
            className="btn-sm ms-auto"
            onClick={() => {
              if (props.editable) {
                props.onEdit();
              } else {
                endEditMode();
                setActiveApp(app?.name);
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
      </Card.Footer>
    </Card>
  );
}

export default AppCard;

const Parameters: React.FC<{
  type: "query" | "hash";
  params: UrlParam[];
}> = ({ type, params }) => {
  return (
    <dl>
      {params.map((p) => (
        <div key={p.param}>
          <dt className={type}>{p.param}</dt>
          <dd className="text-muted">{p.value}</dd>
        </div>
      ))}
    </dl>
  );
};
