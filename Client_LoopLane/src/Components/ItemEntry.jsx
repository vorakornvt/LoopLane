// Import necessary libraries and components
import { Controller, useForm } from "react-hook-form"; // Form control and management
import Joi from "joi"; // Schema validation library
import { joiResolver } from "@hookform/resolvers/joi"; // Joi resolver for react-hook-form
import { useNavigate } from "react-router-dom"; // For navigation between pages
import { useMutation } from "@apollo/client"; // Apollo mutation hook
import { CREATE_ITEM } from "../graphQL/mutations/mutations"; // GraphQL mutation for creating items
import { FaArrowCircleUp } from "react-icons/fa"; // Icon from react-icons
import { Container, Form, Alert } from "react-bootstrap"; // Bootstrap components for layout and UI

function ItemEntry(props) {
  // Destructure user data from props
  const userData = props.user;
  // Hook for navigation after item submission
  const navigate = useNavigate();

  // Joi schema for form validation
  const schema = Joi.object({
    itemName: Joi.string().min(3).max(255).required(), // Name validation: required, 3-255 chars
    itemDescription: Joi.string().min(3).max(255).required(), // Description validation: required, 3-255 chars
    itemPrice: Joi.number().positive().required(), // Price validation: required, positive number
    itemPicture: Joi.string().min(1).max(500).required(), // Picture URL validation: required, 1-500 chars
    itemCondition: Joi.string()
      .valid("like_new", "excellent", "good", "fair", "used")
      .required(), // Condition validation: required, specific values only
    itemCategory: Joi.string().min(3).max(255).required(), // Category validation: required, 3-255 chars
  });

  // Initialize form with default values and validation
  const {
    control, // Control prop for form management
    handleSubmit, // Function to handle form submission
    formState: { errors }, // Capture form errors
    reset, // Reset form fields to default values
  } = useForm({
    resolver: joiResolver(schema), // Use Joi schema for validation
    defaultValues: {
      itemName: "",
      itemDescription: "",
      itemPrice: 0,
      itemPicture: "",
      itemCondition: "",
      itemCategory: "",
    },
  });

  // Apollo mutation to create a new item
  const [createItem] = useMutation(CREATE_ITEM);

  // Form submission handler
  // Param: data - The form data collected by react-hook-form, including item details such as name, description, price, picture URL, condition, and category.
  const onSubmit = async (data) => {
    data.user = userData.id; // Add user ID to item data
    const token = userData.token; // Extract user token for authorization

    await createItemData(data, token); // Send data to server with authorization
    props.refetch(); // Refetch items after creation
    reset(); // Reset form fields

    navigate("/itempost"); // Navigate to item post page
  };

  // Function to execute GraphQL mutation with authorization token
  // Param: data - The item details being submitted to create a new item
  // Param: token - The user's authorization token to verify access on the server
  const createItemData = async (data, token) => {
    try {
      const result = await createItem({
        variables: {
          input: data, // Pass form data to the mutation
        },
        context: {
          headers: {
            authorization: `${token}`, // Set authorization header
          },
        },
      });
      console.log(result.data); // Log result for debugging
    } catch (error) {
      console.log(error); // Log error if mutation fails
    }
  };

  return (
    <>
      {/* Main container for form layout */}
      <Container fluid className="mb-3">
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          {" "}
          {/* Form element with submit handler */}
          <Container fluid>
            <div className="d-flex row align-items-center">
              <div className="col-5 bg-light">
                {/* Display area for item picture upload */}
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
                    <FaArrowCircleUp style={{ fontSize: "35px" }} />{" "}
                    {/* Upload icon */}
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
                        isInvalid={!!errors.itemPicture} // Error handling
                      />
                      {errors.itemPicture && (
                        <Alert variant="danger">
                          {errors.itemPicture.message} {/* Error message */}
                        </Alert>
                      )}
                    </Form.Group>
                  )}
                />
              </div>

              {/* Right column for item details */}
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
                        isInvalid={!!errors.itemName} // Error handling
                      />
                      {errors.itemName && (
                        <Alert variant="danger">
                          {errors.itemName.message} {/* Error message */}
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
                        isInvalid={!!errors.itemDescription} // Error handling
                      />
                      {errors.itemDescription && (
                        <Alert variant="danger">
                          {errors.itemDescription.message} {/* Error message */}
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
                        isInvalid={!!errors.itemPrice} // Error handling
                      />
                      {errors.itemPrice && (
                        <Alert variant="danger">
                          {errors.itemPrice.message} {/* Error message */}
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
                        isInvalid={!!errors.itemCondition} // Error handling
                      >
                        {/* Dropdown options for item condition */}
                        <option value="">Select condition</option>
                        <option value="like_new">Like New</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                        <option value="used">Used</option>
                      </Form.Select>
                      {errors.itemCondition && (
                        <Alert variant="danger">
                          {errors.itemCondition.message} {/* Error message */}
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
                        isInvalid={!!errors.itemCategory} // Error handling
                      />
                      {errors.itemCategory && (
                        <Alert variant="danger">
                          {errors.itemCategory.message} {/* Error message */}
                        </Alert>
                      )}
                    </Form.Group>
                  )}
                />
              </div>
            </div>
          </Container>
          {/* Submit button */}
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
