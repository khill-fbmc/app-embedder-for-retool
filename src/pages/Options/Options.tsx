import "./Options.css";

import React from "react";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import extLogo from "../../assets/img/logo_32.png";
import retoolLogo from "../../assets/img/retool.svg";
import OptionsForm from "./Tabs/ConfigTab/OptionsForm";
import StorageTab from "./Tabs/StorageTab/StorageTab";
import WorkflowTab from "./Tabs/WorkflowTab";

import type { SerializedSettings } from "../../lib/storage";

interface Props {
  settings: SerializedSettings;
}

const Options: React.FC<Props> = ({ settings }) => {
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container className="">
          <div className="d-flex mx-auto align-items-center gap-3">
            <img
              id="extension-logo"
              alt="Extension Logo"
              src={extLogo}
            />
            <div className="fs-2">App Embedder For</div>
            <img
              id="retool-logo"
              alt="Retool Logo"
              src={retoolLogo}
            />
          </div>
        </Container>
      </Navbar>

      <Tabs
        justify
        defaultActiveKey="config"
        className="mb-3 px-5 gap-3 bg-body-tertiary"
      >
        <Tab
          eventKey="config"
          title="Config"
        >
          <Container className="px-5 mt-2 mb-5">
            <Row>
              <Col className="offset-1 col-10">
                {/* <Alert variant="primary">
                  <Alert.Heading>Welcome</Alert.Heading>To enable this exension, please fill in the
                  required fields.
                </Alert> */}
              </Col>
            </Row>
            <OptionsForm settings={settings} />
          </Container>
        </Tab>
        <Tab
          eventKey="storage"
          title="Storage"
        >
          <StorageTab settings={settings} />
        </Tab>
        <Tab
          eventKey="workflow"
          title="Workflow"
        >
          <WorkflowTab settings={settings} />
        </Tab>
      </Tabs>
      <footer className="d-flex py-2 bg-body-tertiary justify-content-center">
        <p className="my-auto">
          Made with ❤️ by <a href="https://community.retool.com/u/khill-fbmc">Kevin Hill</a>
        </p>
      </footer>
    </>
  );
};

export default Options;
