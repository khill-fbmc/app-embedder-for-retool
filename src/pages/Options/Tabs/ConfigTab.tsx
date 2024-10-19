import React, { useMemo, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

import { useEditMode } from "@/hooks/useEditMode";
import { useStore } from "@/hooks/useStore";
import { successToast } from "@/lib/toast";

import AppCard from "../components/AppCard";
import AppForm from "../components/AppForm";
import DomainInput from "../components/DomainInput";

import type { RetoolApp } from "@/types/extension";

function ConfigTab() {
  const methods = useForm<RetoolApp>();
  const { isEditing, startEditMode } = useEditMode();
  const app = useStore((s) => s.getActiveApp());
  const updateActiveApp = useStore((s) => s.updateActiveApp);

  const [creatingNew, setCreatingNew] = useState(false);
  const createNewApp = () => {
    setCreatingNew(true);
  };

  return (
    <>
      <Row className="mt-2">
        <Col lg={{ offset: 2, span: 8 }} sm={{ offset: 1, span: 10 }} xs={12}>
          <h3>General Config</h3>
          <DomainInput />

          <h3 className="mt-2">Current App</h3>
          {isEditing ? (
            <FormProvider {...methods}>
              <AppForm
                app={app!}
                onSave={(data) => {
                  updateActiveApp(data);
                  successToast("Edits saved.");
                }}
              />
            </FormProvider>
          ) : (
            <Container className="pt-2">
              <AppCard
                isActive
                editable
                app={app}
                onEdit={() => startEditMode()}
              />
            </Container>
          )}
        </Col>
      </Row>
      {!isEditing && !creatingNew && (
        <div className="d-flex mt-5">
          <Button variant="success" className="mx-auto">
            Create New
          </Button>
        </div>
      )}
    </>
  );
}

export default ConfigTab;

const NEW_APP: RetoolApp = {
  name: "",
  public: false,
  version: "latest",
  env: "development",
  hash: [],
  query: [],
};
