import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

import { useEditMode } from "@/hooks/useEditMode";
import { useStore } from "@/hooks/useStore";

import AppCard from "../components/AppCard";
import AppForm from "../components/AppForm";
import DomainInput from "../components/DomainInput";

import type { RetoolApp } from "@/types/extension";

function ConfigTab() {
  const methods = useForm<RetoolApp>();
  const { isEditing, startEditMode } = useEditMode();

  const app = useStore((s) => s.getActiveApp());

  return (
    <>
      <Row className="mt-2">
        <Col lg={{ offset: 2, span: 8 }} sm={{ offset: 1, span: 10 }} xs={12}>
          <h3>General Config</h3>
          <DomainInput />

          <h3 className="mt-2">Current App</h3>
          {!isEditing ? (
            <Container className="pt-2">
              <AppCard
                isActive
                editable
                app={app}
                onEdit={() => startEditMode()}
              />
            </Container>
          ) : (
            <FormProvider {...methods}>
              <AppForm app={app!} />
            </FormProvider>
          )}
        </Col>
      </Row>
    </>
  );
}

export default ConfigTab;
