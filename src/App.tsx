import React from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Search } from "./components/Search";
import { Results } from "./components/Results";
import { fetchUsersOnSearchSubmit } from "./PubSub/Flows";
import { subscribeToUsersResponse } from "./PubSub";
import { subscribeToPaginationLinksMock } from "./components/Paginator/mock.data";
import { Paginator } from "./components/Paginator";

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
          <Col xs={12}>
            <Paginator
              subscribeToPaginationLinks={subscribeToPaginationLinksMock}
              onPageClick={(link) => {
                console.log(`page clicked: ${link}`);
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
