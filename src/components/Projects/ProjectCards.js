import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsGithub } from "react-icons/bs";
import { CgWebsite, CgPlayList } from "react-icons/cg"; 

function ProjectCards(props) {
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title><strong className="purple">{props.title} </strong></Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.p1}
        </Card.Text>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.p2}
        </Card.Text>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.p3}
        </Card.Text>
        {props.p4 && (
          <Card.Text style={{ textAlign: "justify" }}>
            {props.p4}
          </Card.Text>
        )}
        <Card.Text style={{ textAlign: "center" }}>
          <strong >Technologies Used:</strong> <strong className="purple">{props.techStack}</strong>
        </Card.Text>
        {props.ghLink && (

          <Button variant="primary" href={props.ghLink} target="_blank">
            <BsGithub /> &nbsp;
            {props.isBlog ? "Blog" : "GitHub"}
          </Button>
        )}

        {"\n"}
        {"\n"}

        {/* If the component contains Demo link and if it's not a Blog then, it will render the below component  */}

        {!props.isBlog && props.demoLink && (
          <Button
            variant="primary"
            href={props.demoLink}
            target="_blank"
          >
            <CgWebsite /> &nbsp;
            {props.demoButtonName}
          </Button>
        )}

        {props.demoLink2 && (
          <>
            {"\n"}
            <Button
              variant="primary"
              href={props.demoLink2}
              target="_blank"
            >
              <CgPlayList /> &nbsp;
              {props.demoButtonName2}
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}
export default ProjectCards;