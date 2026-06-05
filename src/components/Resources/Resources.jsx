import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Accordion } from "react-bootstrap";
import { FaGraduationCap, FaLayerGroup, FaBookOpen } from "react-icons/fa";
import structuredResources from "../../data/resources.js";
import "../../styles/resources.css";
import { Counter } from "counterapi";

const DOWNLOAD_COUNTER = "downld";
const WORKSPACE = "kavindu-testers-team-1628";

const client = new Counter({ workspace: WORKSPACE });

function useCounter(key) {
  const [count, setCount] = useState(null);

  const fetchCount = async () => {
    try {
      const res = await client.get(key);
      setCount(res.data.up_count ?? 0);
    } catch {
      setCount(0);
    }
  };

  const increment = async () => {
    try {
      const res = await client.up(key);
      const newValue = res.data.up_count ?? count;
      setCount(newValue);
      return newValue;
    } catch {
      return count;
    }
  };

  const decrement = async () => {
    try {
      const res = await client.down(key);
      const newValue = res.data.up_count ?? count;
      setCount(newValue);
      return newValue;
    } catch {
      return count;
    }
  };

  useEffect(() => { fetchCount(); }, []);

  return [count, increment, decrement, setCount];
}

function Resources() {
  const [totalDownloads, hitDownload, , setDownloads] = useCounter(DOWNLOAD_COUNTER);

  return (
    <Container fluid className="project-section" style={{ paddingTop: 120, minHeight: "calc(100vh - 60px)" }}>
      <h1 className="project-heading">
        <strong className="purple">Resources</strong>
      </h1>
      <p style={{ color: "white" }}>
        Study guides, lecture notes, and other materials. Reach out{" "}
        <a href="mailto:akwarnakulasuriya@gmail.com" style={{ color: "#caa6ff" }}>
          akwarnakulasuriya@gmail.com
        </a>{" "}
        for suggestions, additions, or corrections!
        <br />
        <strong style={{ color: "#caa6ff" }}>
          {Number(totalDownloads) > 0 && <span>{totalDownloads} total downloads 📥</span>}
        </strong>
      </p>

      <Accordion alwaysOpen className="custom-accordion accordion-level-1">
        {structuredResources.map((degree, degIdx) => (
          <Accordion.Item eventKey={`deg-${degIdx}`} key={degIdx}>
            <Accordion.Header>
              <FaGraduationCap className="level-icon" />
              {degree.title}
            </Accordion.Header>
            <Accordion.Body>
              {degree.notes && (
                <Row style={{ gap: "1rem" }}>
                  {degree.notes.map((note) => (
                    <Col key={note.id} xs={12} md={6} lg={4}>
                      <NoteCard note={note} hitDownload={hitDownload} setDownloads={setDownloads} />
                    </Col>
                  ))}
                </Row>
              )}
              {degree.semesters && (
                <Accordion alwaysOpen className="custom-accordion accordion-level-2">
                  {degree.semesters.map((sem, semIdx) => (
                    <Accordion.Item eventKey={`sem-${degIdx}-${semIdx}`} key={semIdx}>
                      <Accordion.Header>
                        <FaLayerGroup className="level-icon" />
                        {sem.title}
                      </Accordion.Header>
                      <Accordion.Body>
                        <Accordion alwaysOpen className="custom-accordion accordion-level-3">
                          {sem.modules.map((module, modIdx) => (
                            <Accordion.Item eventKey={`mod-${degIdx}-${semIdx}-${modIdx}`} key={modIdx}>
                              <Accordion.Header>
                                <FaBookOpen className="level-icon" />
                                {module.title}
                              </Accordion.Header>
                              <Accordion.Body>
                                <Row style={{ gap: "1rem" }}>
                                  {module.notes.map((note) => (
                                    <Col key={note.id} xs={12} md={6} lg={4}>
                                      <NoteCard note={note} hitDownload={hitDownload} setDownloads={setDownloads} />
                                    </Col>
                                  ))}
                                </Row>
                              </Accordion.Body>
                            </Accordion.Item>
                          ))}
                        </Accordion>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}

function NoteCard({ note, hitDownload, setDownloads }) {
  const [liked, setLiked] = useState(() => {
    try { return localStorage.getItem(`liked_${note.key}`) === "1"; }
    catch { return false; }
  });
  const [likeCount, setLikeCount] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    client.get(`lk_${note.key}`)
      .then((res) => setLikeCount(res.data?.up_count ?? 0))
      .catch(() => setLikeCount(0));
  }, []);

  const onDownload = async (e) => {
    e.preventDefault();
    const newVal = await hitDownload();
    setDownloads(newVal);
    window.open(note.fileUrl, "_blank");
  };

  const onLike = async () => {
    if (busy) return;
    setBusy(true);
    if (liked) {
      setLikeCount((c) => Math.max(0, (c ?? 1) - 1));
      setLiked(false);
      localStorage.removeItem(`liked_${note.key}`);
      client.down(`lk_${note.key}`)
        .then((res) => setLikeCount(res.data?.up_count ?? 0))
        .catch(() => {})
        .finally(() => setBusy(false));
    } else {
      setLikeCount((c) => (c ?? 0) + 1);
      setLiked(true);
      localStorage.setItem(`liked_${note.key}`, "1");
      client.up(`lk_${note.key}`)
        .then((res) => setLikeCount(res.data?.up_count ?? 0))
        .catch(() => {})
        .finally(() => setBusy(false));
    }
  };

  const likeLabel = likeCount > 0 ? `Like (${likeCount})` : "Like";

  const isPdf = note.fileUrl?.toLowerCase().endsWith(".pdf");
  const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(note.fileUrl ?? "");

  return (
    <Card className="blog-card-view" style={{ height: "100%" }}>
      <Card.Body>
        <Card.Title>
          <strong className="purple">{note.title}</strong>
        </Card.Title>
        <div style={{ marginTop: 12 }}>
          {isPdf ? (
            <object
              data={`${note.fileUrl}#toolbar=0&navpanes=0`}
              type="application/pdf"
              width="100%"
              height={180}
              aria-label={`${note.title} preview`}
              style={{ borderRadius: 6, overflow: "hidden" }}
            >
              <a href={note.fileUrl} target="_blank" rel="noreferrer" style={{ color: "#caa6ff" }}>
                Open preview (PDF)
              </a>
            </object>
          ) : isImage ? (
            <img
              src={note.fileUrl}
              alt={`${note.title} preview`}
              style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 6 }}
            />
          ) : (
            <div style={{ color: "#9b9b9b" }}>No preview available</div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", marginTop: 12 }}>
          <Button
            variant={liked ? "success" : "outline-primary"}
            onClick={onLike}
            disabled={busy}
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            👍 {likeLabel}
          </Button>
          <Button variant="primary" onClick={onDownload}>
            View / Download
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Resources;
