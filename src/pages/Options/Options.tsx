import "./Options.css";

import React, { useCallback, useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";

import retoolLogo from "../../assets/img/retool.svg";
import * as MessageBroker from "../../lib/chrome.messages";
import { log } from "../../lib/logger";
import OptionsForm from "./OptionsForm";

import type { ExtensionSettings } from "../../types";

interface Props {
  settings: ExtensionSettings;
}

const Options: React.FC<Props> = ({ settings }) => {
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <div className="d-flex align-items-center gap-3">
              <img
                id="retool-logo"
                alt="Retool Logo"
                src={retoolLogo}
              />
              <div className="mt-1">App Embedder - Settings</div>
            </div>
          </Navbar.Brand>
          <Form className="form-inline">
            <Button
              variant="secondary"
              type="button"
              className="btn-sm btn-outline"
              onClick={(e) => {
                e.preventDefault();
                MessageBroker.emitWorker("OPEN_OPTIONS");
                return false;
              }}
            >
              Open Side Panel
            </Button>
          </Form>
        </Container>
      </Navbar>
      <Container className="px-5 mt-4">
        <Row>
          <Col className="offset-1 col-10">
            <Alert variant="primary">
              <Alert.Heading>Welcome</Alert.Heading>To enable this exension, please fill in the
              required fields.
            </Alert>
          </Col>
        </Row>
        <OptionsForm settings={settings} />
      </Container>
      <div className="d-flex mt-5 py-2 bg-body-tertiary justify-content-center">
        <p className="my-auto">
          Made with ❤️ by <a href="https://community.retool.com/u/khill-fbmc">Kevin Hill</a>
        </p>
      </div>
    </>
  );
};

export default Options;
