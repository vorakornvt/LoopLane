import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Display from "./Display";

function DisplayGrid({ data, user, refetch }) {
  const itemsToDisplay =
    data && data.items ? [...data.items].reverse().slice(0, 8) : [];

  return (
    <Container fluid>
      <Row className="g-2">
        {itemsToDisplay.length > 0 ? (
          itemsToDisplay.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
              <Display item={item} user={user} refetch={refetch} />
            </Col>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </Row>
    </Container>
  );
}

export default DisplayGrid;
