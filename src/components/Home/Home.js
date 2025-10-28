import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/rounded pic.drawio.png";
import Particle from "../Particle";
import HomeBody from "./HomeBody";
import Type from "./Type";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Container className="home-content" >
          <Row>
            <Col md={8} className="home-header" style={{ textAlign: "left" }}>
              <h1 style={{ paddingBottom: 15, margin: 0 }} className="heading">
                Hello World!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name" style={{ margin: 5 }}>
                I'm
                <strong className="main-name"> Kavindu Warnakulasuirya</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left", display: "flex" }}>
                <h1 style={{ fontSize: "2.2em", paddingTop: "8px" }}>
                  <span style={{ paddingRight: "10px", color: "green" }}>
                    akw:~$
                  </span>
                </h1>
                  <Type />
              </div>
            </Col>

            <Col md={4} style={{ paddingBottom: 0, position: "relative" }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px", }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <HomeBody />
      <Particle />
    </section>
  );
}

export default Home;
