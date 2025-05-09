import { Container, Row } from "react-bootstrap";
import Logo from "../assets/image/Asset5DW.png";
import { Link } from "react-router-dom";
import ItemGrid from "../Components/ItemGrid";
import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../graphQL/queries/queries.js";
import { useEffect } from "react";

function Home({ user }) {
  const { loading, error, data, refetch } = useQuery(GET_ITEMS, {
    context: {
      headers: {
        authorization: user ? user.token : "",
      },
    },
  });

  useEffect(() => {
    if (refetch) refetch();
  }, [refetch]);

  if (loading)
    return (
      <div className="mx-auto spinner-grow text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  if (error)
    return (
      <>
        <Container fluid>
          <div
            style={{
              height: "550px",
            }}
          >
            <Row
              className="justify-content-center"
              style={{ paddingTop: "130px" }}
            >
              <img
                src={Logo}
                className="align-self-end"
                style={{ width: "100px" }}
              />
              <h6 style={{ fontSize: "13.5px" }} className="text-center">
                LOOPLANE
              </h6>
              <h1 className="fw-bold text-center">
                <span className="text-dark">{user ? "JOINED" : "JOIN"}</span>{" "}
                THE LOOP OF LUXURY.
              </h1>

              <div
                style={{ marginRight: "400px" }}
                className="d-flex justify-content-end"
              >
                {user ? (
                  <>
                    {/* Links for logged-in users */}
                    <Link
                      to="/itempost"
                      style={{ marginRight: "0px" }}
                      className=" link-danger link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-bold fs-5 px-3"
                    >
                      DISCOVER
                    </Link>
                    <Link
                      to="/itementry"
                      style={{ marginRight: "18px" }}
                      className=" link-danger link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-bold fs-5"
                    >
                      CREATE
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      style={{ marginRight: "18px" }}
                      className="link-danger link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-bold fs-5 px-3"
                    >
                      REGISTER
                    </Link>
                    <Link
                      to="/login"
                      style={{ marginRight: "18px" }}
                      className="link-danger link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-bold fs-5"
                    >
                      LOGIN
                    </Link>
                  </>
                )}
              </div>
            </Row>
          </div>
        </Container>
      </>
    );
  return (
    <>
      <Container fluid>
        <div
          style={{
            height: "auto",
          }}
        >
          <Row
            className="justify-content-center"
            style={{ paddingTop: "130px" }}
          >
            <img
              src={Logo}
              className="align-self-end"
              style={{ width: "100px" }}
            />
            <h6 style={{ fontSize: "13.5px" }} className="text-center">
              LOOPLANE
            </h6>
            <h1 className="fw-bold text-center">
              <span className="text-dark">{user ? "JOINED" : "JOIN"}</span> THE
              LOOP OF LUXURY.
            </h1>

            <div
              style={{ marginRight: "400px" }}
              className="d-flex justify-content-end"
            >
              {user ? (
                <>
                  <Link
                    to="/itempost"
                    style={{ marginRight: "0px" }}
                    className=" link-danger link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-bold fs-5 px-3"
                  >
                    DISCOVER
                  </Link>
                  <Link
                    to="/itementry"
                    style={{ marginRight: "18px" }}
                    className=" link-danger link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-bold fs-5"
                  >
                    CREATE
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="link-danger link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-bold fs-6 px-3"
                  >
                    REGISTER
                  </Link>
                  <Link
                    to="/login"
                    className="link-danger link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-bold fs-6"
                  >
                    LOGIN
                  </Link>
                </>
              )}
            </div>
            {user ? (
              <div className="gradient-overlay">
                <ItemGrid data={data} user={user} refetch={refetch} />
              </div>
            ) : null}
          </Row>
        </div>
      </Container>
    </>
  );
}

export default Home;
