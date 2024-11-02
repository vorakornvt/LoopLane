//React
import { useState } from "react";
//Bootstrap
import { Card, Form, Button, Alert, Container } from "react-bootstrap";
//React Router
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//React Hook Forms
import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
//Apollo Client
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphQL/mutations/mutations";
import Logo from "../../src/assets/image/Asset6DW.png";
import BGimage from "../../src/assets/image/Artboard10.png";

function SignUp({ onLogin }) {
  //JOI Validation for React-Hook-Forms
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().min(6).required(),
  });

  //React-Hook-Forms
  //control - React Hook Forms Controller this is used to control the input
  //handleSubmit - React Hook Forms handleSubmit function this is used to handle the submit event
  //formState - React Hook Forms formState this is used to access the form state
  //reset - React Hook Forms reset function this is used to reset the form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  //?Apollo Client Mutation
  const [createUser, { loading, error }] = useMutation(CREATE_USER); //createUser - The mutation function
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const navigate = useNavigate(); // Navigate function to navigate to a different page

  //?Submit New User
  //This function is called when the form is submitted by react hook forms
  const onSubmit = async (data, event) => {
    event.preventDefault(); // Prevents page from refreshing on submit
    const { username, email, password } = data; // Destructure data from form

    try {
      // Send the mutation request with data as input
      const result = await createUser({
        variables: {
          input: {
            username,
            email,
            password,
          },
        },
      });
      console.log(result.data); //Response from the server
      onLogin(result.data.createUser); // Call onLogin function with the user to be save to state and session storage
      navigate("/"); // Navigate to the home page
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message); // Set error message state
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <Card
        className="shadow-lg border-0 p-3 mb-5 bg-body-tertiary rounded"
        style={{ width: "650px", height: "auto" }}
      >
        <Card.Body className=" d-flex flex-column align-items-center">
          <img
            className="mx-auto mb-3"
            src={Logo}
            alt="Logo"
            style={{ width: "150px" }}
          />

          <Card.Subtitle className="mb-4">
            <h6 className="fw-light">
              <span className="bold">LOOPLANE</span>, Think secondhand first
            </h6>
          </Card.Subtitle>

          <div className="border-bottom w-75">
            <h6 className="text-center fontBody">Sign Up</h6>
          </div>

          <Form
            noValidate="noValidate"
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 fontBody w-75"
          >
            {/* Email Text Box */}

            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                // Bootstrap input text box component
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label className="visually-hidden">Username</Form.Label>
                  <Form.Control
                    {...field}
                    type="text"
                    placeholder="Username"
                    size="l"
                    className="form-control-l border-0 shadow-sm"
                  />
                  {errors.username && (
                    <Alert
                      variant="danger"
                      className="form-control-l border-0 shadow-sm"
                    >
                      {errors.username.message}
                    </Alert>
                  )}
                </Form.Group>
              )}
            />
            {/* /Email Text Box */}

            {/* Email Text Box */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                // Bootstrap input text box component
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label className="visually-hidden">
                    Email address
                  </Form.Label>
                  <Form.Control
                    {...field}
                    type="email"
                    placeholder="Enter email"
                    size="l"
                    className="form-control-l border-0 shadow-sm"
                  />
                  {errors.email && (
                    <Alert
                      variant="danger"
                      className="form-control-l border-0 shadow-sm"
                    >
                      {errors.email.message}
                    </Alert>
                  )}
                </Form.Group>
              )}
            />
            {/* /Email Text Box */}

            {/* Password Text Box */}

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                // Bootstrap input text box component
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label className="visually-hidden">Password</Form.Label>
                  <Form.Control
                    {...field}
                    type="password"
                    placeholder="Password"
                    size="l"
                    className="form-control-l border-0 shadow-sm"
                  />
                  {errors.password && (
                    <Alert
                      variant="danger"
                      className="form-control-l border-0 shadow-sm"
                    >
                      {errors.password.message}
                    </Alert>
                  )}
                </Form.Group>
              )}
            />
            {/* /Password Text Box */}
            {/* General Error Messages */}
            {errorMessage && (
              <Alert variant="danger" className="mt-2 alert-dark mb-0">
                {errorMessage}
              </Alert>
            )}
            {/* General Error Messages */}
            {/* Submit Button */}

            <Button
              variant="lights"
              size="l"
              block="true"
              className="w-100 btn btn-danger mt-3 py-2 shadow-sm border-0 fontBody"
              type="submit"
            >
              SIGNUP
            </Button>
            {/* /Submit Button */}
          </Form>
          {/* Login Link */}
          <p className="text-center text-black mt-3 mb-0">
            Already have an account?{" "}
            <Link
              to="/login"
              className="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover mx-2"
            >
              Login
            </Link>{" "}
            now!
          </p>
          {/* Login Link */}
        </Card.Body>
      </Card>
    </Container>
  );
}
export default SignUp;
