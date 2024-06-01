import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
// import pdf from "../../Assets/../Assets/Arachchige_Kavindu_Warnakulasuirya_CV.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const resumeLink =
  // "https://drive.google.com/file/d/1XKDGbuOrTQ826mg9PGOGfwHGGH-hITnq/view?usp=share_link"
  // "https://github.com/kavindu-w/kavindu-w.github.io/raw/master/src/Assets/Arachchige_Kavindu_Warnakulasuirya_CV.pdf"
  "https://raw.githubusercontent.com/kavindu-w/kavindu-w.github.io/master/src/Assets/Arachchige_Kavindu_Warnakulasuirya_CV.pdf";
function ResumeNew() {
  const [width, setWidth] = useState(1200);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="dark"
            // href={pdf}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>

        <Row className="resume">
          <Document file={resumeLink} className="d-flex justify-content-center"
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
            <div style={{ display: "flex", flexDirection: "column" }}>
            {/* <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6} /> */}
            {Array.apply(null, Array(numPages))
            .map((x, i)=>i+1)
            .map(page => <Page pageNumber={page} scale={width > 786 ? 1.7 : 0.6}/>)}
            </div>
          </Document>
        </Row>

        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="dark"
            // href={pdf}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
