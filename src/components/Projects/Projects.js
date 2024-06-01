import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import busprj from "../../Assets/Projects/busprj.png";
import teddybear from "../../Assets/Projects/teddybear.png";
import attrition from "../../Assets/Projects/attrition.png";
import dasboard from "../../Assets/Projects/dashboard.jpg";
import mail from "../../Assets/Projects/mail.jpg";
import cpu from "../../Assets/Projects/cpu.jpg";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          {/* Here are a few projects I've worked on recently. */}
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={busprj}
              isBlog={false}
              title="Bus Arrival Time Prediction App"
              p1="● Optimized passenger experiences and satisfaction by delivering precise arrival time"
              p2="● Enhanced state-of-the-art machine learning models for improved accuracy, achieving a 0%
              misclassification rate when classifying bus stop types as either brief, moderate, or prolonged"
              p3="● Automated the extraction of 15 crucial topological features and crafted a dashboard for streamlined
              data visualization and management."
              demoButtonName="Development Milestone Presentation"
              demoLink="https://www.canva.com/design/DAFrS80anvg/1F-LTIis4lfpM7_b6b4J7A/view?utm_content=DAFrS80anvg&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink"
              techStack="Python, MySql, R Shiny"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={teddybear}
              isBlog={false}
              title="E-Commerce Platform - DBMS Project"
              p1="● Created an online shopping website in comparison to Amazon, with a custom backend from scratch
              "
              ghLink="https://github.com/joelsathi/DBMS-project"
              techStack=" MySql, FastAPI - Python, Node, Vite - TypeScript"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={attrition}
              isBlog={false}
              title="Employee Attrition Analysis Project"
              p1="● Empowered management decision-making on employee retention at Marvelous Construction by
              identifying four key areas of insights influencing employee attrition
              "
              ghLink="https://github.com/kavindu-w/Employee-Attrition-Analysis-Solo-Project"
              techStack="Power BI, Tableau, Python (NumPy, Pandas, Scikit-learn, Seaborn"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={dasboard}
              isBlog={false}
              title="Kickstarter Technology Projects Dashboard"
              p1="● Developed an insightful dashboard by employing various data visualization techniques, condensing
              16 technology subcategories into five informative charts"
              ghLink="https://github.com/kavindu-w/Kickstarter-Technology-Projects-Dashboard"
              techStack="Power BI, Tableau"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={mail}
              isBlog={false}
              title="Email Client App"
              p1="● Sending emails, recipient list management, and self-triggered birthday messages"
              p2="● Email object serialization, daily reports generation, utilized OOP principles and design patterns"
              ghLink="https://github.com/kavindu-w/Email-Client-Project"
              techStack="Java"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={cpu}
              isBlog={false}
              title="8-bit Nano Processor Design Project"
              p1="●8-bit register support, 6+ instructions support, optimized component usage reduction from 268 to 62"
              ghLink="https://github.com/kavindu-w/Nano-Processor-Design-Project"
              techStack="Vivado Xilinx s/w, VHDL-very high-speed IC h/w description language"
            />
          </Col>
        </Row>
      </Container>
      <Particle />

    </Container>

  );
}

export default Projects;
