import { Container, Col, Row } from "react-bootstrap";
import LOGO from "../../src/assets/image/Asset5DW.png";

function Footer() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };
  return (
    <>
      <Container className="mt-1" fluid>
        <div style={{ height: "auto" }} className="bg-body-tertiary">
          <Row className="pt-5 d-flex justify-content-between align-items-center">
            <Col>
              <a
                style={{ fontSize: "14px" }}
                className="text-dark mx-2"
                href="#tiktok"
              >
                tiktok
              </a>
              <a
                style={{ fontSize: "14px" }}
                className="text-dark mx-2"
                href="#instagram"
              >
                instagram
              </a>
              <a
                style={{ fontSize: "14px" }}
                className="text-dark mx-2"
                href="#x"
              >
                x
              </a>
              <a
                style={{ fontSize: "14px" }}
                className="text-dark mx-2"
                href="#facebook"
              >
                facebook
              </a>
              <a
                style={{ fontSize: "14px" }}
                className="text-dark mx-2"
                href="#pinterest"
              >
                pinterest
              </a>
              <a
                style={{ fontSize: "14px" }}
                className="text-dark mx-2"
                href="#snapchat"
              >
                snapchat
              </a>
              <a
                style={{ fontSize: "14px" }}
                className="text-dark mx-2"
                href="#linkedin"
              >
                linkedIn
              </a>
            </Col>
            <Col className="d-flex justify-content-center">
              <img src={LOGO} style={{ height: "20px" }} alt="Logo" />
            </Col>
            <Col className="text-end">
              <span>{getCurrentYear()} - </span>
              <a
                className="link-danger link-offset-2 link-underline-opacity-0 fw-bold link-underline-opacity-100-hover mx-2"
                href="#"
              >
                LOOPLANE
              </a>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default Footer;
