import React from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Search } from "./components/Search";
import { Results } from "./components/Results";
import {
  fetchUsersAndPaginationLinksOnPageClick,
  fetchUsersAndPaginationLinksOnSearch,
} from "./PubSub/Flows";
import { subscribeToPaginationLinks, subscribeToUsersResponse } from "./PubSub";
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
            <Search onSubmit={fetchUsersAndPaginationLinksOnSearch} />
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
              subscribeToPaginationLinks={subscribeToPaginationLinks}
              onPageClick={fetchUsersAndPaginationLinksOnPageClick}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
