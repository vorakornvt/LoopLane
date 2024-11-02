import React from "react";
import { Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import "./PostDisplay.css"; // Import the CSS file for hover effects

function PostDisplay({ item }) {
  return (
    <Link to={`/item/${item.id}`} style={{ textDecoration: "none" }}>
      <Card className="post-display-card border-0 shadow-sm mb-4">
        <Card.Img
          src={item.itemPicture}
          alt={item.itemName}
          className="post-display-image"
        />
        <div className="post-display-overlay">
          <h5 className="overlay-title">{item.itemName}</h5>
          <p className="overlay-price">{item.itemPrice} AUD</p>
        </div>
      </Card>
    </Link>
  );
}

export default PostDisplay;
