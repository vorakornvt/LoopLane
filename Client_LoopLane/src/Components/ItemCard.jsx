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
    <>
      <Container fluid className="mb-3">
        <div
          className="card mx-auto border-light mb-3 shadow p-3 mb-5 bg-light rounded"
          style={{ maxWidth: "700px", maxHight: "auto" }}
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
                <div className="text-start">
                  <h5 className="mt-3 card-title fs-4">{item.itemName}</h5>
                </div>

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

              <div className=" mx-auto col-md-10 d-flex flex-column mb-5">
                <Link to={`/itemedit/${item.id}`}>
                  <button className="btn btn-outline-dark me-3 ms-3">
                    EDIT
                  </button>
                  <button
                    className="btn btn-outline-dark"
                    onClick={handleDelete}
                    disabled={loading}
                    aria-label="Delete Item"
                  >
                    DELETE
                  </button>
                </Link>
              </div>

              {/* Footer Section */}
              <div
                className="mt-auto text-end"
                style={{ paddingRight: "10px" }}
              >
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
    </>
  );
}

export default ItemCard;
