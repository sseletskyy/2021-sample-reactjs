import React from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Search } from "./components/Search";
import { Results } from "./components/Results";
import { subscribeToUsersMock } from "./components/Results/mock.data";

function App() {
  return (
    <div className="App">
      <Container className="m-1">
        <Row>
          <Col xs={12}>[notifications]</Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Search
              onSubmit={(value) => {
                console.log(`Search :: onSubmit('${value}')`);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Results subscribeToUsers={subscribeToUsersMock} />
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
