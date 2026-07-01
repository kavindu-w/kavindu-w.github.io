import GitHubCalendar from "react-github-calendar";
import { Row } from "react-bootstrap";

function Github() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "2px" }}>
      <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
        <strong className="purple">Github</strong> Stats
      </h1>
      <GitHubCalendar
        username="kavindu-w"
        blockSize={15}
        blockRadius={5}
        blockMargin={5}
        fontSize={16}
        style={{ color: "white" }}
        theme={{
          level0: "#cfe8f3",
          level1: "#73bfe2",
          level2: "#1696d2",
          level3: "#12719e",
          level4: "#0a4c6a",
        }}
      />
    </Row>
  );
}

export default Github;
