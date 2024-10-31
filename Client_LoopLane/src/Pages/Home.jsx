import { Container, Row } from "react-bootstrap";
import HeroImg from "../assets/image/Artboard6.png";
import Logo from "../assets/image/Asset5DW.png";
import { Link } from "react-router-dom";

function Home({ user }) {
  return (
    <>
      <Container fluid>
        <div
          style={{
            backgroundImage: `url(${HeroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center 5%",
            height: "550px",
          }}
        >
          <Row className="justify-content-end" style={{ paddingTop: "130px" }}>
            <img
              src={Logo}
              className="align-self-end"
              style={{ width: "100px" }}
            />
            <h6 style={{ fontSize: "13.5px" }} className="fw-light text-end">
              LOOPLANE
            </h6>
            <h1 className="fw-bold text-end">
              <span className="text-warning">{user ? "JOINED" : "JOIN"}</span>{" "}
              THE LOOP OF LUXURY.
            </h1>

            <div
              style={{ marginRight: "345px" }}
              className="d-flex justify-content-end"
            >
              {user ? (
                <>
                  {/* Links for logged-in users */}
                  <Link
                    to="/shop"
                    style={{ marginRight: "5px" }}
                    className=" link-warning link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-bold fs-5 px-3"
                  >
                    SHOP
                  </Link>
                  <Link
                    to="/sell"
                    style={{ marginRight: "20px" }}
                    className=" link-warning link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-bold fs-5"
                  >
                    SELL
                  </Link>
                </>
              ) : (
                <>
                  {/* Links for guests (not logged in) */}
                  <Link
                    to="/signup"
                    className="link-warning link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-bold fs-6 px-3"
                  >
                    REGISTER
                  </Link>
                  <Link
                    to="/login"
                    className="link-warning link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover fw-bold fs-6"
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
}

export default Home;
