import { Card } from "react-bootstrap";
import "./PostDisplay.css";

function Display({ item }) {
  return (
    <Card className="post-display-card border-0 shadow-sm mb-4">
      <Card.Img
        src={item.itemPicture}
        alt={item.itemName}
        className="post-display-image"
      />
    </Card>
  );
}

export default Display;
