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
        blockMargin={5}
        color="#3333ff"
        fontSize={16}
      />
    </Row>
  );
}

export default Github;
