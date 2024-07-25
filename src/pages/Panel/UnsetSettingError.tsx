import React from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";

type Props = {
  unsetSetting: string;
};

const UnsetSettingError: React.FC<Props> = ({ unsetSetting }) => {
  return (
    <Container
      id="error"
      className="full-height d-flex justify-content-center"
    >
      <Row className="my-auto text-center">
        <Col>
          <Alert variant="warning p-5">
            <h3 className="mb-4">⚠️ Whoops!</h3>
            <p className="mb-3">
              It seems that your <code>{unsetSetting}</code> is not set.
            </p>
            <p className="my-0">
              Open the{" "}
              <Alert.Link
                href={"#"}
                onClick={(e) => {
                  e.preventDefault();
                  chrome.runtime.openOptionsPage();
                  return false;
                }}
              >
                options page
              </Alert.Link>{" "}
              to fill this in.
            </p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default UnsetSettingError;
