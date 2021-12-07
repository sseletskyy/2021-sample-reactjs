import React from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Search } from "./components/Search";
import { Results } from "./components/Results";
import { fetchUsersOnSearchSubmit } from "./PubSub/Flows";
import { subscribeToUsersResponse } from "./PubSub";

function App() {
  return (
    <div className="App">
      <Container className="m-1">
        <Row>
          <Col xs={12}>[notifications]</Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Search onSubmit={fetchUsersOnSearchSubmit} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Results subscribeToUsers={subscribeToUsersResponse} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>[paginator]</Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
