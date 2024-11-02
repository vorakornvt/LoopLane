import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PostDisplay from "./PostDisplay"; // Ensure the path is correct

function ItemGrid({ data, user, refetch }) {
  return (
    <Container fluid>
      <Row className="g-2">
        {data?.items.length > 0 ? (
          // Reverse the array and slice to get the last 8 items
          [...data.items]
            .reverse()
            .slice(0, 8)
            .map((item) => (
              <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
                <PostDisplay item={item} user={user} refetch={refetch} />
              </Col>
            ))
        ) : (
          <p>No items found.</p>
        )}
      </Row>
    </Container>
  );
}

export default ItemGrid;
