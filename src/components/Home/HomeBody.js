import { Container, Row, Col } from "react-bootstrap";
import laptopImg from "../../Assets/about.png";
import { TiPointOfInterest } from "react-icons/ti";
import Github from "./Github";
import Techstack from "./Techstack";

import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,

} from "react-icons/ai";
import {
  FaLinkedinIn,
  FaFacebook,
  FaKaggle
} from "react-icons/fa";

function HomeBody() {
  return (
    <Container fluid className="home-about-section" id="about" style={{ paddingTop: 0 }}>
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              <span className="purple">README 😁</span>
            </h1>
            <p className="home-about-body">
              👋🏾 Hi Everyone, I am <span style={{ color: "#caa6ff" }}> Kavindu Warnakulasuirya</span>, and I am from <br />Seeduwa, Sri Lanka.
              <br />
              <br />
              🎓 I am a <span style={{ color: "#caa6ff" }}>Computer Science & Engineering</span> graduate, specialised in <span style={{ color: "#caa6ff" }}>Data Science & Engineering</span> from the <span style={{ color: "#caa6ff" }}>University of Moratuwa</span>.
              <br />
              <br />😊 I am enthusiastic and passionate about research on NLP <br />(especially low-resource) and LLM Agents.
              <br />
              <br />
              Apart from coding, some of my interests and passions are:
              <ul>
                <li className="about-activity">
                  <TiPointOfInterest /> Playing piano 🎹 and clarinet 🎵
                </li>
                <li className="about-activity">
                  <TiPointOfInterest /> Playing badminton 🏸
                </li>
                <li className="about-activity">
                  <TiPointOfInterest /> Puzzle-solving (Rubik's cube, Sudoku, etc.) 🧩
                </li>
              </ul>

              <p style={{ color: "rgb(155 126 172)" }}>
                "Do not worry about the things that are out of
                your control. <br />Simply adapt and continue!"{" "}
              </p>
              <footer className="blockquote-footer">Anonymous</footer>
            </p>

          </Col>
          <Col
            md={4} className="myAvtar"
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
          >
            <img src={laptopImg} alt="about" className="img-fluid" />
          </Col>
        </Row>
        <Row className="about-section">
          <h1 className="project-heading">
            {/* Professional <strong className="purple">Skillset </strong> */}
            <strong className="purple">Languages</strong> and <strong className="purple">Tools</strong> 🛠️
          </h1>

          <Techstack />

          <Github />
        </Row>
        <Row className="justify-content-between">
          <Col md={6} className="home-about-description">
            <img alt="GitHub stats" src="https://github-readme-stats.vercel.app/api?username=kavindu-w&show_icons=true&theme=github_dark" />
          </Col>
          <Col md={5} className="home-about-description">
            <img alt="GitHub stats-Languages" src="https://github-readme-stats.vercel.app/api/top-langs/?username=kavindu-w&theme=github_dark&langs_count=8&layout=compact" />
          </Col>
        </Row>

        <Row>
          <Col md={12} className="home-about-social">
            <h1><span className="purple">Connect with me</span> 🤝</h1>
            <ul className="home-about-social-links">

              <li className="social-icons">
                <a
                  href="https://github.com/kavindu-w"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://linkedin.com/in/kavindu-warnakulasuriya"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              {/* <li className="social-icons">
                <a
                  href="https://kaggle.com/kavinduw"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaKaggle />
                </a>
              </li> */}
              <li className="social-icons">
                <a
                  href="https://x.com/kavindu_warna"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.facebook.com/kavindu.warnakulasuriya.9"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaFacebook />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/kavindu_warnakulasuriya_/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default HomeBody;
