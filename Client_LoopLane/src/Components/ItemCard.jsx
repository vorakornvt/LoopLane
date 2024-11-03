// Import necessary libraries and components
import { useState } from "react"; // useState hook for managing loading state
import { useMutation } from "@apollo/client"; // Apollo mutation hook
import { Link, useNavigate } from "react-router-dom"; // For navigation and linking
import { DELETE_ITEM } from "../graphQL/mutations/mutations"; // GraphQL mutation for deleting items
import { Container } from "react-bootstrap"; // Bootstrap container component

// ItemCard component that displays an item card with options to edit or delete
function ItemCard({ item, user, refetch }) {
  // Initialize the deleteItem mutation with authorization headers
  const [deleteItem] = useMutation(DELETE_ITEM, {
    context: {
      headers: {
        authorization: user?.token, // Pass user's token for authorization
      },
    },
  });

  // State to manage loading status during item deletion
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation after deletion

  // Handle item deletion
  const handleDelete = async () => {
    setLoading(true); // Set loading state to true during deletion
    try {
      const result = await deleteItem({
        variables: { deleteItemId: item.id }, // Pass item ID for deletion
      });

      // Check for errors in the result
      if (result.errors) {
        throw new Error(result.errors[0].message); // Throw error if present
      }

      // Navigate to item listing page after successful deletion
      navigate("/itempost");

      // Refetch items to update the list
      refetch();
    } catch (error) {
      console.error(`Failed to delete item: ${error.message}`); // Log error message if deletion fails
    } finally {
      setLoading(false); // Reset loading state after deletion attempt
    }
  };

  return (
    <Container fluid className="mb-3">
      {/* Card layout for the item */}
      <div
        className="card mx-auto border-light mb-3 shadow p-3 bg-light rounded"
        style={{ maxWidth: "700px" }}
      >
        <div className="row g-0">
          {/* Image Section */}
          <div className="col-md-8">
            <img
              src={item.itemPicture}
              alt={item.itemName}
              className="img-fluid rounded-start" // Display item image
            />
          </div>

          {/* Content Section */}
          <div className="col-md-4 d-flex flex-column">
            <div className="card-body">
              {/* Title Section */}
              <h5 className="mt-3 card-title fs-4">{item.itemName}</h5>{" "}
              {/* Item name as title */}
              {/* Details Section */}
              <div className="d-flex flex-column align-items-start my-3">
                <p className="card-text" style={{ fontSize: "14px" }}>
                  {item.itemDescription} {/* Item description */}
                </p>
                <p className="card-text" style={{ fontSize: "14px" }}>
                  Condition: {item.itemCondition} {/* Item condition */}
                </p>
                <p className="card-text" style={{ fontSize: "14px" }}>
                  Price: {item.itemPrice} AUD {/* Item price */}
                </p>
                <p className="card-text" style={{ fontSize: "14px" }}>
                  Category: {item.itemCategory} {/* Item category */}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mx-auto flex-column mb-5">
              <Link to={`/itemedit/${item.id}`}>
                <button className="btn btn-outline-dark me-3 ms-3">
                  EDIT {/* Edit button linking to item edit page */}
                </button>
              </Link>
              <button
                className="btn btn-outline-dark me-3 ms-3"
                onClick={handleDelete} // Trigger delete on click
                disabled={loading} // Disable button during loading
                aria-label="Delete Item"
              >
                {loading ? "Deleting..." : "DELETE"}{" "}
                {/* Show loading text if deleting */}
              </button>
            </div>

            {/* Footer Section */}
            <div className="mt-auto text-end" style={{ paddingRight: "10px" }}>
              <p
                className="text-body-secondary"
                style={{ fontSize: "12px", marginBottom: "-2px" }}
              >
                Updated on:{" "}
                {new Date(parseInt(item.createdAt)).toLocaleDateString()}{" "}
                {/* Display item update date */}
              </p>
              <p className="text-body-secondary" style={{ fontSize: "12px" }}>
                Posted by: {user?.username}{" "}
                {/* Display username of the item poster */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ItemCard;
