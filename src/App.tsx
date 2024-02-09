import React from "react";
import Scorecard from "./components/scorecard";
import { Col, Container, Row, ThemeProvider } from "react-bootstrap";

const App: React.FC = () => {
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <Container className="App" fluid>
        <Row className="mb-3 mt-3">
          <Col>
            <h1>Disc Golf Putting game</h1>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Scorecard />
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
};

export default App;
