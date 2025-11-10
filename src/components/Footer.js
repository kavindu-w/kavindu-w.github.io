import { Container, Row, Col } from "react-bootstrap";
import VisitorCounter from "./VisitorCounter";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="6" className="footer-copywright">
          <h3>Copyright © {year} akw</h3>
        </Col>
        <Col
          md="6"
          className="footer-copywright"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}
        >
          <h3>Designed by Kavindu Warnakulasuirya</h3>
          {/* visitor counter */}
          <VisitorCounter />
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;