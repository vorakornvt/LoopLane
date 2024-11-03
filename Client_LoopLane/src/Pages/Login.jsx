//React
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Link, useNavigate } from "react-router-dom";
//React Bootstrap
import { Card, Form, Button, Alert, Container } from "react-bootstrap";
//image asset
import Logo from "../../src/assets/image/Asset6DW.png";
import BGimage from "../../src/assets/image/Artboard10.png";
//Apollo Client
import { useMutation } from "@apollo/client";
//GraphQL Mutations
import { LOGIN_USER } from "../graphQL/mutations/mutations";

function Login({ onLogin }) {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().min(6).required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER); // loginUser - The mutation function
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const navigate = useNavigate(); // Navigate function to navigate to a different page

  // Submit Login
  const onSubmit = async (data, event) => {
    event.preventDefault(); // Prevents page from refreshing on submit
    const { email, password } = data; // Destructure data from form
    try {
      // Send the mutation request with data as input
      const result = await loginUser({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
      console.log(result.data);
      onLogin(result.data.loginUser); // Call onLogin function from App.jsx to store the user in App.jsx state
      navigate("/"); // Navigate to the home page
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message); // Set error message state
      reset(); // Reset the form
    }
  };

  //Generates a random number that is used to select a background colour for the card component
  function getRandomNumber() {
    return Math.floor(Math.random() * 5);
  }
  //Generates a random emoji that is used to display a random emoji in the card component
  function getRandomPersonEmoji() {
    const personEmojis = ["👩", "👨", "🧑", "👧", "👦"];
    const randomIndex = Math.floor(Math.random() * personEmojis.length);
    return personEmojis[randomIndex];
  }

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

          <Card.Subtitle className="mb-1">
            <h6 className="fw-light">
              <span className="bold">LoopLane</span>, Think secondhand first
            </h6>
          </Card.Subtitle>

          <div className="border-bottom w-75">
            <h6 className="text-center fontBody">LOGIN</h6>
          </div>

          <Form
            noValidate="noValidate"
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 fontBody w-75"
          >
            {/* Email Text Box */}
            <h6>Email</h6>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Form.Group controlId="email" className="mb-3">
                  <Form.Control
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                    size="l"
                    className="form-control-l border-0 shadow-sm"
                    style={{
                      borderRadius: "4px",
                    }}
                  />
                  {errors.email && (
                    <Alert
                      variant="danger"
                      className="mt-1 text-center p-1 small border-0"
                    >
                      {errors.email.message}
                    </Alert>
                  )}
                </Form.Group>
              )}
            />
            {/* /Email Text Box */}

            {/* Password Text Box */}
            <h6>Password</h6>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Form.Group controlId="password" className="mb-3">
                  <Form.Control
                    {...field}
                    type="password"
                    placeholder="Enter your password"
                    size="l"
                    className="form-control-l border-0 shadow-sm"
                    style={{
                      borderRadius: "4px",
                    }}
                  />
                  {errors.password && (
                    <Alert
                      variant="danger"
                      className="mt-1 text-center p-1 small border-0"
                    >
                      {errors.password.message}
                    </Alert>
                  )}
                </Form.Group>
              )}
            />
            {/* /Password Text Box */}

            {errorMessage && (
              <Alert
                variant="danger"
                className="mt-1 text-center p-1 small border-0"
              >
                {errorMessage}
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              variant="lights"
              size="l"
              block="true"
              className="w-100 btn btn-danger mt-3 py-2 shadow-sm border-0 fontBody"
              type="submit"
            >
              LOGIN
            </Button>
            {/* /Submit Button */}

            {/* Sign Up Link */}
            <p className="text-center mt-3 mb-0 ">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover mx-2"
              >
                Sign up
              </Link>{" "}
              now!
            </p>
            {/* /Sign Up Link */}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
