import React from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";

import { useEditMode } from "@/hooks/useEditMode";
import { useStore } from "@/hooks/useStore";
import { successToast } from "@/lib/toast";

import AppCard from "../components/AppCard";
import AppForm from "../components/AppForm";
import DomainInput from "../components/DomainInput";

import type { RetoolApp } from "@/types/extension";

function ConfigTab() {
  const methods = useForm<RetoolApp>();
  const setActiveTab = useStore((s) => s.setActiveTab);
  const { isEditing, startEditMode, stopEditMode } = useEditMode();

  const createApp = useStore((s) => s.createApp);
  const getActiveApp = useStore((s) => s.getActiveApp);
  const activeAppName = useStore((s) => s.activeAppName);
  const updateActiveApp = useStore((s) => s.updateActiveApp);

  const createNewApp = () => {
    startEditMode();
    createApp("new-app-1");
  };

  const onSave: SubmitHandler<RetoolApp> = (data) => {
    updateActiveApp(data);
    successToast("Edits saved.");
    stopEditMode();
  };

  const onCancel = () => {
    methods.reset();
    stopEditMode();
  };

  const app = getActiveApp();

  return (
    <>
      <Row className="mt-2">
        <Col lg={{ offset: 2, span: 8 }} sm={{ offset: 1, span: 10 }} xs={12}>
          <h3>General Config</h3>
          <DomainInput />

          <h3 className="mt-2">Current App</h3>
          {isEditing ? (
            <FormProvider {...methods}>
              <AppForm app={app!} onSave={onSave} onCancel={onCancel} />
            </FormProvider>
          ) : (
            <Container className="pt-2">
              {activeAppName ? (
                <AppCard
                  isActive
                  editable
                  app={app}
                  onEdit={() => startEditMode()}
                />
              ) : (
                <Alert variant="warning">
                  <Alert.Heading>None Selected</Alert.Heading>
                  To view your app list{" "}
                  <Alert.Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("storage");
                    }}
                  >
                    click here
                  </Alert.Link>
                  .
                </Alert>
              )}
            </Container>
          )}
        </Col>
      </Row>
      {!isEditing && (
        <div className="d-flex mt-5">
          <Button variant="success" className="mx-auto" onClick={createNewApp}>
            Create New
          </Button>
        </div>
      )}
    </>
  );
}

export default ConfigTab;
