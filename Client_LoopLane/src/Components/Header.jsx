import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import ImageLogo from "../../src/assets/image/Asset5DW.png";
import ImageLogoRed from "../../src/assets/image/Asset8DW.png";
import ImageLogoRedTwo from "../../src/assets/image/Asset6DW.png";

function Header({ user, onLogout }) {
  const location = useLocation();
  const onItemPostPage = location.pathname === "/itempost";
  const onItemEntryPage = location.pathname === "/itementry";

  // Helper function to get initials (first two letters of username)
  const getUserInitials = (username) => {
    return username ? username.slice(0, 2).toUpperCase() : "";
  };

  return (
    <Container fluid>
      <Navbar bg="light" expand="lg" className="bg-body-tertiary">
        <Nav className="d-flex align-items-center">
          {/* Conditional Discover and Create Buttons for Logged-in Users */}
          {user ? (
            <>
              <Nav.Link as={Link} to="/itempost">
                <button
                  className={`btn ${
                    onItemPostPage ? "btn-danger" : "btn-secondary"
                  } `}
                >
                  Discover
                </button>
              </Nav.Link>
              <Nav.Link as={Link} to="/itementry">
                <button
                  className={`btn ${
                    onItemEntryPage ? "btn-danger" : "btn-secondary"
                  } `}
                >
                  Post
                </button>
              </Nav.Link>
            </>
          ) : (
            <>
              <Link to="/">
                <img
                  src={ImageLogoRedTwo}
                  style={{ width: "100px" }}
                  alt="Logo"
                />
              </Link>
              <div className="ms-1 mt-2">
                <h6
                  className="fw-bold"
                  style={{ fontSize: "17px", marginBottom: "-1px" }}
                >
                  LOOPLANE
                </h6>
                <h6 className="fw-light" style={{ fontSize: "8px" }}>
                  Think secondhand first
                </h6>
              </div>
            </>
          )}
        </Nav>

        {/* Logo and tagline */}
        <div className="d-flex align-items-center mx-auto">
          {user ? (
            <>
              <Link to="/">
                <img
                  src={ImageLogoRedTwo}
                  style={{ width: "100px" }}
                  alt="Logo"
                />
              </Link>
              <div className="ms-1 mt-2">
                <h6
                  className="fw-bold"
                  style={{ fontSize: "17px", marginBottom: "-1px" }}
                >
                  LOOPLANE
                </h6>
                <h6 className="fw-light" style={{ fontSize: "8px" }}>
                  Think secondhand first
                </h6>
              </div>
            </>
          ) : null}
        </div>

        {/* User section */}
        <Nav className="d-flex align-items-center">
          {user ? (
            <>
              {/* Profile Initials and Logout Button */}
              <Nav.Link as={Link} to="/profile">
                <div
                  className="d-flex justify-content-center align-items-center text-dark"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    fontSize: "18px",
                    border: "solid 1px #000000",
                  }}
                >
                  {getUserInitials(user.username)}
                </div>
              </Nav.Link>
              <Nav.Link onClick={onLogout}>
                <button className="btn btn-secondary">Logout</button>
              </Nav.Link>
            </>
          ) : (
            // Logged-out view: Login and Register buttons
            <>
              <Nav.Link as={Link} to="/login">
                <button
                  style={{ marginRight: "-12px" }}
                  className="btn btn-danger "
                >
                  Login
                </button>
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                <button
                  style={{ marginRight: "-12px" }}
                  className="btn btn-secondary "
                >
                  Register
                </button>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar>
    </Container>
  );
}

export default Header;
