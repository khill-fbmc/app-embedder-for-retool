import "./AppCard.css";

import { clsx } from "clsx";
import React from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";

import { useEditMode } from "@/hooks/useEditMode";
import { useRetoolAppUrl } from "@/hooks/useRetoolAppUrl";
import { useStore } from "@/hooks/useStore";

import AppVisibilityBadge from "./AppVisibilityBadge";
import ParameterList from "./ParameterList";

import type { RetoolApp } from "@/types/extension";

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
  const domain = useStore((s) => s.domain);
  const setActiveApp = useStore((s) => s.setActiveApp);

  const { stopEditMode } = useEditMode();
  const appUrl = useRetoolAppUrl(domain, app);

  const onPreview = () => window.open(appUrl, "_blank");

  const onActivate = () => {
    if (props.editable) {
      props.onEdit();
    } else {
      stopEditMode();
      setActiveApp(app?.name);
    }
  };

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
          <Col>
            <h5>Query Params</h5>
            {app?.query && app.query.length ? (
              <ParameterList type="query" params={app.query} />
            ) : (
              <small className="text-muted">none</small>
            )}
          </Col>

          <Col>
            <h5>Hash Params</h5>
            {app?.hash && app.hash.length ? (
              <ParameterList type="hash" params={app.hash} />
            ) : (
              <small className="text-muted">none</small>
            )}
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex justify-content-between">
          <div className="d-flex gap-2 align-items-center">
            <AppVisibilityBadge isPublic={app?.public} />
            <Badge pill bg="secondary">
              {app?.version[0] === "l" ? app?.version : `v${app?.version}`}
            </Badge>
          </div>
          <div className="d-flex gap-2 align-items-end">
            <Button
              variant="outline-success"
              className="btn-sm d-flex gap-2"
              onClick={onPreview}
            >
              <i className="bi bi-box-arrow-up-right"></i>Preview
            </Button>
            <Button
              className="btn-sm mx-auto"
              onClick={onActivate}
              variant={
                props.editable
                  ? "outline-primary"
                  : isActive
                    ? "primary"
                    : "outline-primary"
              }
            >
              {props.editable ? "Edit" : isActive ? "⭐️ Active" : "Activate"}
            </Button>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default AppCard;
