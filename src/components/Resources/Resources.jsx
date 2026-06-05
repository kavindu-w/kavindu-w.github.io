import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Card, Button, Accordion } from "react-bootstrap";
import { FaGraduationCap, FaLayerGroup, FaBookOpen, FaSearch, FaTimes } from "react-icons/fa";
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

function countNotes(degree) {
  return (degree.notes?.length ?? 0) +
    (degree.semesters?.reduce((a, s) =>
      a + s.modules.reduce((b, m) => b + m.notes.length, 0), 0) ?? 0);
}

function flattenNotes(resources) {
  return resources.flatMap((degree) => [
    ...(degree.notes ?? []).map((note) => ({ ...note, context: degree.title })),
    ...(degree.semesters ?? []).flatMap((sem) =>
      sem.modules.flatMap((mod) =>
        mod.notes.map((note) => ({
          ...note,
          context: `${sem.title} › ${mod.title}`,
        }))
      )
    ),
  ]);
}

function Resources() {
  const [totalDownloads, hitDownload, , setDownloads] = useCounter(DOWNLOAD_COUNTER);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDegrees, setOpenDegrees] = useState(
    structuredResources.length > 0 ? ["deg-0"] : []
  );

  const [openSemesters, setOpenSemesters] = useState([]);
  const [openModules, setOpenModules] = useState([]);

  const allNotes = useMemo(() => flattenNotes(structuredResources), []);

  const { allSemesterKeys, allModuleKeys } = useMemo(() => {
    const semKeys = structuredResources.flatMap((deg, di) =>
      (deg.semesters ?? []).map((_, si) => `sem-${di}-${si}`)
    );
    const modKeys = structuredResources.flatMap((deg, di) =>
      (deg.semesters ?? []).flatMap((sem, si) =>
        sem.modules.map((_, mi) => `mod-${di}-${si}-${mi}`)
      )
    );
    return { allSemesterKeys: semKeys, allModuleKeys: modKeys };
  }, []);

  const filteredNotes = searchQuery.trim()
    ? allNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.context.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  const allExpanded =
    openDegrees.length === structuredResources.length &&
    openSemesters.length === allSemesterKeys.length &&
    openModules.length === allModuleKeys.length;

  const handleDegreeSelect = (key) => {
    setOpenDegrees((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleSemesterSelect = (key) => {
    setOpenSemesters((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleModuleSelect = (key) => {
    setOpenModules((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const toggleAll = () => {
    if (allExpanded) {
      setOpenDegrees([]);
      setOpenSemesters([]);
      setOpenModules([]);
    } else {
      setOpenDegrees(structuredResources.map((_, i) => `deg-${i}`));
      setOpenSemesters(allSemesterKeys);
      setOpenModules(allModuleKeys);
    }
  };

  return (
    <Container fluid className="project-section" style={{ paddingTop: 120, minHeight: "calc(100vh - 60px)" }}>
      <Container>
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

        {/* Search + toggle row */}
        <div className="resource-toolbar">
          <div className="resource-search-wrap">
            <FaSearch className="resource-search-icon" />
            <input
              type="text"
              className="resource-search"
              placeholder="Search notes or modules…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="resource-search-clear" onClick={() => setSearchQuery("")} aria-label="Clear search">
                <FaTimes />
              </button>
            )}
          </div>
          {!searchQuery && (
            <Button variant="outline-secondary" size="sm" onClick={toggleAll} className="resource-toggle-btn">
              {allExpanded ? "Collapse All" : "Expand All"}
            </Button>
          )}
        </div>

        {/* Search results */}
        {filteredNotes ? (
          filteredNotes.length === 0 ? (
            <p style={{ color: "#9b9b9b", marginTop: "1.5rem" }}>
              No notes found for &ldquo;{searchQuery}&rdquo;
            </p>
          ) : (
            <>
              <p style={{ color: "#9c6ac7", marginBottom: "1rem", fontSize: "0.9rem" }}>
                {filteredNotes.length} result{filteredNotes.length !== 1 ? "s" : ""}
              </p>
              <Row style={{ gap: "1rem" }}>
                {filteredNotes.map((note) => (
                  <Col key={note.id} xs={12} md={6} lg={4}>
                    <NoteCard note={note} context={note.context} hitDownload={hitDownload} setDownloads={setDownloads} />
                  </Col>
                ))}
              </Row>
            </>
          )
        ) : (
          /* Normal accordion */
          <Accordion
            alwaysOpen
            activeKey={openDegrees}
            onSelect={handleDegreeSelect}
            className="custom-accordion accordion-level-1"
          >
            {structuredResources.map((degree, degIdx) => (
              <Accordion.Item eventKey={`deg-${degIdx}`} key={degIdx}>
                <Accordion.Header>
                  <FaGraduationCap className="level-icon" />
                  {degree.title}
                  <span className="resource-badge">{countNotes(degree)} notes</span>
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
                    <Accordion alwaysOpen activeKey={openSemesters} onSelect={handleSemesterSelect} className="custom-accordion accordion-level-2">
                      {degree.semesters.map((sem, semIdx) => (
                        <Accordion.Item eventKey={`sem-${degIdx}-${semIdx}`} key={semIdx}>
                          <Accordion.Header>
                            <FaLayerGroup className="level-icon" />
                            {sem.title}
                            <span className="resource-badge">{sem.modules.length} modules</span>
                          </Accordion.Header>
                          <Accordion.Body>
                            <Accordion alwaysOpen activeKey={openModules} onSelect={handleModuleSelect} className="custom-accordion accordion-level-3">
                              {sem.modules.map((module, modIdx) => (
                                <Accordion.Item eventKey={`mod-${degIdx}-${semIdx}-${modIdx}`} key={modIdx}>
                                  <Accordion.Header>
                                    <FaBookOpen className="level-icon" />
                                    {module.title}
                                    <span className="resource-badge">{module.notes.length} notes</span>
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
        )}
      </Container>
    </Container>
  );
}

function NoteCard({ note, context, hitDownload, setDownloads }) {
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

  const isPdf = note.fileUrl?.toLowerCase().endsWith(".pdf");
  const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(note.fileUrl ?? "");

  return (
    <Card className="blog-card-view" style={{ height: "100%" }}>
      <Card.Body>
        {context && <div className="resource-search-context">{context}</div>}
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
            disabled={busy || likeCount === null}
            style={{ display: "inline-flex", alignItems: "center", gap: "6px", minWidth: 96 }}
          >
            {likeCount === null ? (
              <span className="skeleton-pill" />
            ) : (
              <>👍 {likeCount > 0 ? `Like (${likeCount})` : "Like"}</>
            )}
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
