// React
import { Controller, useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useNavigate } from "react-router-dom";
// Apollo Client
import { useMutation } from "@apollo/client";
import { CREATE_ITEM } from "../graphQL/mutations/mutations";
import { FaArrowCircleUp } from "react-icons/fa";
// React Bootstrap
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";

function ItemEntry(props) {
  const userData = props.user;
  const navigate = useNavigate();

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
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      itemName: "",
      itemDescription: "",
      itemPrice: 0,
      itemPicture: "",
      itemCondition: "",
      itemCategory: "",
    },
  });

  const [createItem] = useMutation(CREATE_ITEM);

  const onSubmit = async (data) => {
    data.user = userData.id;
    const token = userData.token;

    await createItemData(data, token);
    props.refetch();
    reset();

    navigate("/itempost");
  };

  const createItemData = async (data, token) => {
    try {
      const result = await createItem({
        variables: {
          input: data,
        },
        context: {
          headers: {
            authorization: `${token}`,
          },
        },
      });
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container fluid className="mb-3">
        <div className="border-bottom border-secondary mt-3 mb-2 d-flex">
          <h2 className="fs-5 fw-light fontBody">CREATE YOUR LOOP</h2>
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
              POST ITEM
            </button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default ItemEntry;
