import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import { DiReact, DiNodejs, DiPython, DiGit, DiJava } from "react-icons/di";
import {
  SiPytorch,
  SiLinux,
  SiVscodium,
  SiMysql,
  SiC,
  SiGnubash,
  SiPandas,
  SiNumpy,
  SiKeras,
} from "react-icons/si";

const icons = [
  { Icon: DiPython, label: "Python" },
  { Icon: SiMysql, label: "MySQL" },
  { Icon: SiPandas, label: "Pandas" },
  { Icon: SiNumpy, label: "NumPy" },
  { Icon: SiKeras, label: "Keras" },
  { Icon: SiPytorch, label: "PyTorch" },
  { Icon: DiJava, label: "Java" },
  { Icon: DiGit, label: "Git" },
  { Icon: SiC, label: "C" },
  { Icon: CgCPlusPlus, label: "C++" },
  { Icon: DiReact, label: "React" },
  { Icon: DiNodejs, label: "Node.js" },
  { Icon: SiLinux, label: "Linux" },
  { Icon: SiGnubash, label: "GNU Bash" },
  { Icon: SiVscodium, label: "VS Code" },
];

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "20px" }}>
      {icons.map(({ Icon, label }) => (
        <Col key={label} xs={4} md={2} className="tech-icons">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>{label}</Tooltip>}
          >
            <span>
              <Icon />
            </span>
          </OverlayTrigger>
        </Col>
      ))}
    </Row>
  );
}

export default Techstack;
