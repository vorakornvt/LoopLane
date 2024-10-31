import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { DELETE_ITEM } from "../graphQL/mutations/mutations";
import { Card, Button } from "react-bootstrap"; // Import Bootstrap components

function ItemCard({ item, user, refetch }) {
  const [deleteItem] = useMutation(DELETE_ITEM, {
    context: {
      headers: {
        authorization: user?.token,
      },
    },
  });

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (loading) return;
    setLoading(true);

    console.log("Attempting to delete item:", item); // Ensure item is defined

    try {
      await deleteItem({ variables: { deleteItemId: item.id } });
      refetch();
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="m-3 shadow border-0" style={{ borderRadius: "20px" }}>
      {/* Ensure the image URL is valid */}
      <Card.Img
        variant="top"
        src={item.itemPicture} // This will display the image from the URL
        alt={item.itemName}
        style={{
          borderRadius: "20px 20px 0 0",
          height: "200px",
          objectFit: "cover",
        }}
      />
      <Card.Body>
        <div className="d-flex align-items-center">
          <div className="flex-grow-1 me-3">
            <Card.Title className="text-primary fw-bold">
              {item.itemName}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <i className="bi bi-calendar-event"></i>{" "}
              {new Date(parseInt(item.createdAt)).toLocaleDateString()}
            </Card.Subtitle>
          </div>
          <div className="ms-auto d-flex">
            <Link to={`/job/edit/${item.id}`}>
              <Button
                variant="outline-primary"
                className="me-2"
                aria-label="Edit Job"
              >
                <i className="bi bi-pencil"></i>
              </Button>
            </Link>
            <Button
              variant="outline-danger"
              onClick={handleDelete}
              disabled={loading}
              aria-label="Delete Job"
            >
              <i className="bi bi-trash"></i>
            </Button>
          </div>
        </div>
        <Card.Text className="mt-3">{item.itemDescription}</Card.Text>
        <div className="d-flex justify-content-between mt-2 text-muted">
          <span style={{ color: "#50da00" }}>Price: ${item.itemPrice}</span>
          <span>Posted by: {user?.username}</span>
        </div>
        <div className="mt-3">
          <strong>Condition:</strong> <span>{item.itemCondition}</span>
        </div>
        <div className="mt-1">
          <strong>Category:</strong> <span>{item.itemCategory}</span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ItemCard;
