import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { DELETE_ITEM } from "../graphQL/mutations/mutations";
import { Container } from "react-bootstrap"; // Import Bootstrap components

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
    setLoading(true);
    try {
      const result = await deleteItem({
        variables: { deleteItemId: item.id },
      });

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      const deletedItem = result.data?.deleteItem?.item;
      if (deletedItem) {
        console.log(`Deleted item: ${deletedItem.itemName}`);
      }

      refetch();
    } catch (error) {
      console.error(`Failed to delete item: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="mb-3">
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
              className="img-fluid rounded-start"
            />
          </div>

          {/* Content Section */}
          <div className="col-md-4 d-flex flex-column">
            <div className="card-body">
              {/* Title Section */}
              <h5 className="mt-3 card-title fs-4">{item.itemName}</h5>

              {/* Details Section */}
              <div className="d-flex flex-column align-items-start my-3">
                <p className="card-text" style={{ fontSize: "14px" }}>
                  {item.itemDescription}
                </p>
                <p className="card-text" style={{ fontSize: "14px" }}>
                  Condition: {item.itemCondition}
                </p>
                <p className="card-text" style={{ fontSize: "14px" }}>
                  Price: {item.itemPrice} AUD
                </p>
                <p className="card-text" style={{ fontSize: "14px" }}>
                  Category: {item.itemCategory}
                </p>
              </div>
            </div>

            <div className="mx-auto  flex-column mb-5">
              <Link to={`/itemedit/${item.id}`}>
                <button className="btn btn-outline-dark me-3 ms-3">EDIT</button>
              </Link>
              <button
                className="btn btn-outline-dark me-3 ms-3"
                onClick={handleDelete}
                disabled={loading}
                aria-label="Delete Item"
              >
                {loading ? "Deleting..." : "DELETE"}
              </button>
            </div>

            {/* Footer Section */}
            <div className="mt-auto text-end" style={{ paddingRight: "10px" }}>
              <p
                className="text-body-secondary"
                style={{ fontSize: "12px", marginBottom: "-2px" }}
              >
                Updated on:{" "}
                {new Date(parseInt(item.createdAt)).toLocaleDateString()}
              </p>
              <p className="text-body-secondary" style={{ fontSize: "12px" }}>
                Posted by: {user?.username}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ItemCard;
