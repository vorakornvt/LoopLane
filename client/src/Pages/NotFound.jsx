import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

function NotFound() {
  return (
    <Container fluid className="bg-white">
      <div
        style={{ height: "500px", paddingTop: "200px" }}
        className="text-center "
      >
        <h1 className="fontBody">404</h1>
        <Link
          className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
          to="/"
        >
          This page could not be found
        </Link>
      </div>
    </Container>
  );
}

export default NotFound;
