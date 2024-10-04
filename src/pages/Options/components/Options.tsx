import React from "react";
import { Col, Container, Navbar, Row, Tab, Tabs } from "react-bootstrap";
import { Toaster } from "react-hot-toast";

import extLogo from "@/assets/img/logo_32.png";
import retoolLogo from "@/assets/img/retool.svg";

import OptionsForm from "../Tabs/ConfigTab";
import JSONTab from "../Tabs/JSONTab";
import StorageTab from "../Tabs/StorageTab";
import WorkflowTab from "../Tabs/WorkflowTab";

function Options() {
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container className="">
          <div className="d-flex mx-auto align-items-center gap-3">
            <img id="extension-logo" alt="Extension Logo" src={extLogo} />
            <div className="fs-2">App Embedder For</div>
            <img id="retool-logo" alt="Retool Logo" src={retoolLogo} />
          </div>
        </Container>
      </Navbar>

      <Tabs
        justify
        defaultActiveKey="config"
        className="mb-3 px-5 gap-3 bg-body-tertiary"
      >
        <Tab eventKey="config" title="Settings">
          <Container className="px-5 mt-2 mb-5">
            <Row>
              <Col className="offset-1 col-10">
                {/* <Alert variant="primary">
                  <Alert.Heading>Welcome</Alert.Heading>To enable this exension, please fill in the
                  required fields.
                </Alert> */}
              </Col>
            </Row>
            <OptionsForm />
          </Container>
        </Tab>
        <Tab eventKey="storage" title="Storage">
          <StorageTab />
        </Tab>
        <Tab eventKey="workflow" title="Workflow">
          <WorkflowTab />
        </Tab>
        <Tab eventKey="json" title="JSON">
          <JSONTab />
        </Tab>
      </Tabs>

      <footer className="d-flex py-2 bg-dark text-light justify-content-center">
        <p className="my-auto">
          Made with ❤️ by{" "}
          <a
            href="https://community.retool.com/u/khill-fbmc"
            className="text-light"
          >
            Kevin Hill
          </a>
        </p>
      </footer>

      <Toaster />
    </>
  );
}

export default Options;
