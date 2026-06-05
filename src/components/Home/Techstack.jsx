import { CgCPlusPlus } from "react-icons/cg";
import { DiReact, DiNodejs, DiPython, DiGit, DiJava } from "react-icons/di";
import {
  SiPytorch,
  SiLinux,
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
];

function Techstack() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", paddingBottom: "20px" }}>
      {icons.map(({ Icon, label }) => (
        <div key={label} className="tech-icons">
          <Icon />
          <span className="tech-icon-tooltip">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default Techstack;
