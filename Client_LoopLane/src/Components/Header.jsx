import { Navbar, Nav, Form, FormControl, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import ImageLogo from "../../src/assets/image/Asset5DW.png"; // Update with your logo path

function Header({ user, onLogout }) {
  // Helper function to get initials (first two letters of username)
  const getUserInitials = (username) => {
    return username ? username.slice(0, 2).toUpperCase() : "";
  };

  return (
    <>
      <Container fluid>
        <Navbar bg="light" expand="lg" className="bg-body-tertiary">
          {/* Icons for Wishlist and Cart */}
          <Nav className="d-flex align-items-center">
            <Nav.Link as={Link} to="/wishlist" className="text-dark">
              <AiOutlineHeart size={24} />
            </Nav.Link>

            <Nav.Link as={Link} to="/cart" className="text-dark">
              <AiOutlineShoppingCart size={24} />
            </Nav.Link>
          </Nav>

          {/* Logo and tagline */}
          <div className="d-flex align-items-center mx-auto">
            <Link to="/">
              <img src={ImageLogo} style={{ width: "130px" }} alt="Logo" />
            </Link>
            <div className="ms-1 mt-1">
              <h6 className=" fw-bold" style={{ fontSize: "17px" }}>
                LOOPLANE
              </h6>
              <h6 className="fw-light" style={{ fontSize: "8px" }}>
                Think secondhand first
              </h6>
            </div>
          </div>

          {/* User section */}
          <Nav className=" d-flex align-items-center">
            {user ? (
              // Logged-in view: Initials and Logout button
              <>
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
                <Nav.Link onClick={onLogout} className="text-dark">
                  Logout
                </Nav.Link>
              </>
            ) : (
              // Logged-out view: Login and Register buttons
              <>
                <Nav.Link as={Link} to="/login" className="text-dark">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="text-dark">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar>
      </Container>
    </>
  );
}

export default Header;
