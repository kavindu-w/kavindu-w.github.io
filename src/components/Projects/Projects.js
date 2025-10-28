import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import busprj from "../../Assets/Projects/busprj.png";
import teddybear from "../../Assets/Projects/teddybear.png";
import attrition from "../../Assets/Projects/attrition.png";
import dasboard from "../../Assets/Projects/dashboard.jpg";
import mail from "../../Assets/Projects/mail.jpg";
import cpu from "../../Assets/Projects/cpu.jpg";
import fyp from "../../Assets/Projects/fyp.png";
import caesarean from "../../Assets/Projects/caesarean.png";
import churn from "../../Assets/Projects/churn.png";

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
          <Col md={6} className="project-card">
            <ProjectCard
              imgPath={fyp}
              isBlog={false}
              title="Evolution of Cooperation in LLM-Agent Societies: A Preliminary Study Using Different Punishment Strategies"
              p1="● Final year research project studying normative reasoning abilities of LLM agents in social dilemmas using the Smallville multi-agent simulation environment, under the supervision of Prof. Stephen Cranefield (Otago, NZ), Prof. Tony Savarimuthu (Otago, NZ), Dr. Surangika Ranathunga (Massey, NZ), and Dr. Nisansa de Silva (UoM, SL)"
              p2="● Modified the Smallville environment to model and simulate the diner's dilemma scenario, including implementing the dilemma scenario logic, agent scheduling, developing and fine-tuning the logic for punishment mechanisms, implementing detailed dilemma decisions and reasoning logging to capture decisions, including punishment actions, strategy changes, and utility updates for analysis"
              p3="● Lead the paper writing by drafting the abstract, literature review, and conclusion. Revised and enhanced the sections on experimentation and discussion, and contributed to refining the paper based on the supervisor's comments"
              p4="● Accepted and presented the paper, “Evolution of Cooperation in LLM-Agent Societies: A Preliminary Study Using Different Punishment Strategies”, at the International COINE Workshop (C-ranked), co-located with AAMAS 2025, held in Detroit, Michigan, USA, 20th May 2025"
              demoButtonName="Paper"
              demoLink="https://arxiv.org/abs/2504.19487"
              demoButtonName2="Video Presentation"
              demoLink2="https://www.youtube.com/watch?v=1EWWBLulPhY"
              techStack="Python, Tiled Map Editor, Vertex API, Groq API"
            />
          </Col>

          <Col md={6} className="project-card">
            <ProjectCard
              imgPath={busprj}
              isBlog={false}
              title="Explainable Bus Arrival Time Prediction Model with Improved Features Related to Topography and Points of Interest"
              p1="● This research project has been accepted and presented (on 26th September 2024) at the prestigious 27th IEEE International Conference on Intelligent Transportation Systems (ITSC) 2024 in Edmonton, Canada (Current h-index of 85, Annual flagship conference of the IEEE Intelligent Transportation Systems Society (ITSS))"
              p2="● Optimised passenger experiences and satisfaction by improving bus arrival time predictions by incorporating topographical data (elevation, road bends, etc.) and Points of Interest (tourist attractions, healthcare, public spaces, etc.), all aimed at addressing the complexities of predicting bus arrival times in heterogeneous traffic conditions"
              p3="● Automated the extraction of 5 topographical and 12 POIs-related features and crafted a dashboard for streamlined data visualisation and management"
              demoButtonName="Paper"
              demoLink="https://ieeexplore.ieee.org/abstract/document/10920146"
              ghLink="https://github.com/kavindu-w/Explainable-Bus-Arrival-Time-Prediction-Model-with-Improved-Features-Related-to-Topography-and-POIs"
              demoLink2="https://www.canva.com/design/DAGMa9LvHi8/HRpSvp8GDlnvLirMcaRIMQ/view?utm_content=DAGMa9LvHi8&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hdba8d84ee8"
              demoButtonName2="Presentation"
              techStack="Python, MySql, R Shiny"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={caesarean}
              isBlog={false}
              title="Model Calibration for Birth Delivery Mode Prediction: Caesarean Section Prediction"
              p1="● Recreating and validating the model through calibration studies and employing uncertainty quantification to enhance predictive reliability in this critical medical domain"
              techStack="Pandas, NumPy, SciPy, scikit-learn - Python"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={churn}
              isBlog={false}
              title="Churn Analyzer App"
              p1="● Empowered management decision-making on employee retention by developing a customer churn analyzing app with key insights influencing employee attrition"
              ghLink="https://github.com/kavindu-w/churn-analyzer"
              techStack="Pandas, Seaborn - Python, H2O Wave"
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
{/* 
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
          </Col> */}
        </Row>
      </Container>
      <Particle />

    </Container>

  );
}

export default Projects;
