import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Search } from "./components/Search";
import { Results } from "./components/Results";
import {
  subscribeToApiFetching,
  subscribeToNotification,
  subscribeToPaginationLinks,
  subscribeToUsersResponse,
} from "./PubSub";
import { Paginator } from "./components/Paginator";
import { NotificationComponent } from "./components/Notification";
import {
  fetchUsersOnPageClick,
  fetchUsersOnSearchSubmit,
} from "./PubSub/Flows";

function App() {
  return (
    <div className="App">
      <Container className="m-1">
        <Row>
          <Col xs={12}>
            <NotificationComponent
              subscribeToNotification={subscribeToNotification}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Search
              onSubmit={fetchUsersOnSearchSubmit}
              subscribeToApiFetching={subscribeToApiFetching}
            />
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
              onPageClick={fetchUsersOnPageClick}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
