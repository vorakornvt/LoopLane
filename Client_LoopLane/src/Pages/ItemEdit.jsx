import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useParams, useNavigate } from "react-router-dom";
// Apollo Client
import { useMutation, useQuery } from "@apollo/client";
import { GET_ITEM } from "../graphQL/queries/queries";
import { UPDATE_ITEM } from "../graphQL/mutations/mutations";
// React Icons
import { FaArrowCircleUp } from "react-icons/fa";
// React Bootstrap
import { Container, Form, Alert } from "react-bootstrap";

function ItemEdit(props) {
  const userData = props.user;
  const { itemId } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_ITEM, {
    variables: { itemId },
    context: {
      headers: {
        authorization: `${userData.token}`,
      },
    },
  });

  console.log("itemId:", itemId);

  const [updateItem] = useMutation(UPDATE_ITEM);

  const schema = Joi.object({
    itemName: Joi.string().min(3).max(255).required(),
    itemDescription: Joi.string().min(3).max(255).required(),
    itemPrice: Joi.number().positive().required(),
    itemPicture: Joi.string().min(1).max(500).required(),
    itemCondition: Joi.string()
      .valid("like_new", "excellent", "good", "fair", "used")
      .required(),
    itemCategory: Joi.string().min(3).max(255).required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: joiResolver(schema),
  });

  useEffect(() => {
    if (data) {
      setValue("itemName", data.item.itemName);
      setValue("itemDescription", data.item.itemDescription);
      setValue("itemPrice", data.item.itemPrice);
      setValue("itemPicture", data.item.itemPicture);
      setValue("itemCondition", data.item.itemCondition);
      setValue("itemCategory", data.item.itemCategory);
    }
  }, [data, setValue]);

  if (loading)
    return (
      <div className="mx-auto spinner-grow text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  if (error) return <p>Error 😞</p>;

  const onSubmit = async (formData) => {
    const {
      itemName,
      itemDescription,
      itemPrice,
      itemPicture,
      itemCondition,
      itemCategory,
    } = formData;
    try {
      await updateItem({
        variables: {
          updateItemId: itemId,
          input: {
            itemName,
            itemDescription,
            itemPrice,
            itemPicture,
            itemCondition,
            itemCategory,
            user: props.user.id,
          },
        },
        context: {
          headers: {
            authorization: `${props.user.token}`,
          },
        },
      });
      navigate("/itempost");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container fluid className="mb-3">
        <div className="border-bottom border-secondary mt-3 mb-2 d-flex">
          <h2 className="fs-5 fw-light fontBody">EDIT YOUR ITEM</h2>
        </div>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Container fluid>
            <div className="d-flex row align-items-center">
              <div className="col-5 bg-light">
                <div
                  style={{
                    height: "350px",
                    width: "350px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="text-center bg-body-secondary mx-auto mt-2 mb-2 rounded"
                >
                  <div className="cen">
                    <FaArrowCircleUp style={{ fontSize: "35px" }} />
                    <h5 className="fs-6 mt-2">We recommend saving from URL</h5>
                  </div>
                </div>
                {/* Item Picture URL Input */}
                <Controller
                  name="itemPicture"
                  control={control}
                  render={({ field }) => (
                    <Form.Group className="mt-4">
                      <Form.Label></Form.Label>
                      <Form.Control
                        {...field}
                        type="url"
                        placeholder="Enter picture URL"
                        isInvalid={!!errors.itemPicture}
                      />
                      {errors.itemPicture && (
                        <Alert variant="danger">
                          {errors.itemPicture.message}
                        </Alert>
                      )}
                    </Form.Group>
                  )}
                />
              </div>
              <div className="col-7 bg-light-subtle">
                {/* Item Name Input */}
                <Controller
                  name="itemName"
                  control={control}
                  render={({ field }) => (
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "14px" }}>
                        Brand
                      </Form.Label>
                      <Form.Control
                        {...field}
                        type="text"
                        placeholder="Enter item name or brand"
                        isInvalid={!!errors.itemName}
                      />
                      {errors.itemName && (
                        <Alert variant="danger">
                          {errors.itemName.message}
                        </Alert>
                      )}
                    </Form.Group>
                  )}
                />
                {/* Item Description Input */}
                <Controller
                  name="itemDescription"
                  control={control}
                  render={({ field }) => (
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "14px" }}>
                        Item Description
                      </Form.Label>
                      <Form.Control
                        {...field}
                        as="textarea"
                        rows={3}
                        placeholder="Enter item description"
                        isInvalid={!!errors.itemDescription}
                      />
                      {errors.itemDescription && (
                        <Alert variant="danger">
                          {errors.itemDescription.message}
                        </Alert>
                      )}
                    </Form.Group>
                  )}
                />

                {/* Item Price Input */}
                <Controller
                  name="itemPrice"
                  control={control}
                  render={({ field }) => (
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "14px" }}>
                        Item Price
                      </Form.Label>
                      <Form.Control
                        {...field}
                        type="number"
                        placeholder="Enter item price"
                        isInvalid={!!errors.itemPrice}
                      />
                      {errors.itemPrice && (
                        <Alert variant="danger">
                          {errors.itemPrice.message}
                        </Alert>
                      )}
                    </Form.Group>
                  )}
                />
                {/* Item Condition Input */}
                <Controller
                  name="itemCondition"
                  control={control}
                  render={({ field }) => (
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "14px" }}>
                        Item Condition
                      </Form.Label>
                      <Form.Select
                        {...field}
                        isInvalid={!!errors.itemCondition}
                      >
                        <option value="">Select condition</option>
                        <option value="like_new">Like New</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                        <option value="used">Used</option>
                      </Form.Select>
                      {errors.itemCondition && (
                        <Alert variant="danger">
                          {errors.itemCondition.message}
                        </Alert>
                      )}
                    </Form.Group>
                  )}
                />

                {/* Item Category Input */}
                <Controller
                  name="itemCategory"
                  control={control}
                  render={({ field }) => (
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "14px" }}>
                        Item Category
                      </Form.Label>
                      <Form.Control
                        {...field}
                        type="text"
                        placeholder="Enter item category"
                        isInvalid={!!errors.itemCategory}
                      />
                      {errors.itemCategory && (
                        <Alert variant="danger">
                          {errors.itemCategory.message}
                        </Alert>
                      )}
                    </Form.Group>
                  )}
                />
              </div>
            </div>
          </Container>
          <div className="text-center mt-3">
            <button type="submit" className="btn btn-danger">
              UPDATE ITEM
            </button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default ItemEdit;
