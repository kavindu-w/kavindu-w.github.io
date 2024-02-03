import React from "react";
import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import {
  DiReact,
  DiNodejs,
  DiPython,
  DiGit,
  // DiSqllite,
  DiJava
} from "react-icons/di";
import {
  SiPytorch,
  SiLinux,
  SiVisualstudiocode,
  SiOracle,
  // SiMysql,
  // SiJava,
  SiC,
  SiGnubash,
  SiPandas, SiNumpy, SiKeras
} from "react-icons/si";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "20px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip-python" style={{ color: "white" }}>Python</Tooltip>}
        >
          <span><DiPython /></span>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-oracle"  className="show" style={{ color: "white" }}>Oracle</Tooltip>}
        >
        <span><SiOracle /></span>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-pandas" style={{ color: "white" }}>Pandas</Tooltip>}
        >
          <span><SiPandas /></span>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-numpy" style={{ color: "white" }}>NumPy</Tooltip>}
        >
          <span><SiNumpy /></span>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-keras" style={{ color: "white" }}>Keras</Tooltip>}
        >
          <span><SiKeras /></span>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-pytorch" style={{ color: "white" }}>PyTorch</Tooltip>}
        >
          <span><SiPytorch /></span>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-java" style={{ color: "white" }}>Java</Tooltip>}
        >
          <span><DiJava /></span>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-git" style={{ color: "white" }}>Git</Tooltip>}
        >
          <span><DiGit /></span>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-cplusplus" style={{ color: "white" }}>C</Tooltip>}
        >
          <span><SiC /></span>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-cplusplus" style={{ color: "white" }}>C++</Tooltip>}
        >
          <span><CgCPlusPlus /></span>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-react" style={{ color: "white" }}>React</Tooltip>}
        >
          <span><DiReact /></span>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-nodejs" style={{ color: "white" }}>Node.js</Tooltip>}
        >
          <span><DiNodejs /></span>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-linux" style={{ color: "white" }}>Linux</Tooltip>}
        >
          <span><SiLinux /></span>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-gnubash" style={{ color: "white" }}>GNU Bash</Tooltip>}
        >
         <span> <SiGnubash /></span>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-visualstudiocode" style={{ color: "white" }}>Visual Studio Code</Tooltip>}
        >
         <span> <SiVisualstudiocode /></span>
        </OverlayTrigger>
      </Col>
    </Row>
  );
}

export default Techstack;
