import React from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Search } from "./components/Search/Search";

function App() {
  return (
    <div className="App">
      <Container className="m-1">
        <Row>
          <Col xs={12}>[notifications]</Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Search />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>[results]</Col>
        </Row>
        <Row>
          <Col xs={12}>[paginator]</Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
