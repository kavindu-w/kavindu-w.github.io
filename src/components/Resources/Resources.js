// filepath: src/components/Resources/Resources.js
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Accordion } from "react-bootstrap";
import structuredResources from "../../data/resources";
import "./Resources.css";
import { Counter } from 'counterapi';

/* ------------------------ COUNTERAPI V2 CONFIG ------------------------ */
const DOWNLOAD_COUNTER = "downld";      // global downloads
const LIKE_COUNTER = "lkes";             // global likes
const WORKSPACE = "kavindu-testers-team-1628";

// Initialize the client
const client = new Counter({
    workspace: WORKSPACE,  // Your workspace name
});
/* ------------------------ CUSTOM COUNTER HOOK (SDK VERSION) ------------------------ */
function useCounter(key) {
    const [count, setCount] = useState(null);

    const fetchCount = async () => {
        try {
            const res = await client.get(key);  // ← SDK method
            setCount(res.data.up_count ?? 0);
        } catch (err) {
            console.error("CounterAPI GET error:", err);
            setCount(0);
        }
    };

    const increment = async () => {
        try {
            const res = await client.up(key);  // ← SDK method
            const newValue = res.data.up_count ?? count;
            setCount(newValue);
            return newValue;
        } catch (err) {
            console.error("CounterAPI UP error:", err);
            return count;
        }
    };

    useEffect(() => {
        fetchCount();
    }, []);

    return [count, increment, setCount];
}

/* ---------------------------- MAIN COMPONENT ---------------------------- */
function Resources() {
    const [totalDownloads, hitDownload, setDownloads] = useCounter(DOWNLOAD_COUNTER);
    const [totalLikes, hitLike, setLikes] = useCounter(LIKE_COUNTER);

    return (
        <Container fluid className="project-section" style={{ paddingTop: 120 }}>
            <h1 className="project-heading">
                <strong className="purple">Resources</strong>
            </h1>

            {/* ------------------- Description with live-updating global counters ------------------- */}
            <p style={{ color: "white" }}>
                Study guides, lecture notes, and other materials. Reach out{" "}
                <a href="mailto:akwarnakulasuriya@gmail.com" style={{ color: "#caa6ff" }}>
                    akwarnakulasuriya@gmail.com
                </a>{" "}
                for suggestions, additions, or corrections!
                <br />
                <strong style={{ color: "#caa6ff" }}>
                    {Number(totalLikes) > 0 || Number(totalDownloads) > 0 ? (
                        <>
                            {Number(totalLikes) > 0 && <span>{totalLikes} total likes 👍</span>}
                            {Number(totalLikes) > 0 && Number(totalDownloads) > 0 && " | "}
                            {Number(totalDownloads) > 0 && <span>{totalDownloads} total downloads 📥</span>}
                        </>
                    ) : null}
                </strong>

            </p>

            <Accordion alwaysOpen className="custom-accordion">
                {structuredResources.map((degree, degIdx) => (
                    <Accordion.Item eventKey={`deg-${degIdx}`} key={degIdx}>
                        <Accordion.Header>{degree.title}</Accordion.Header>
                        <Accordion.Body>

                            {degree.notes && (
                                <Row style={{ gap: "1rem" }}>
                                    {degree.notes.map((note) => (
                                        <Col key={note.id} xs={12} md={6} lg={4}>
                                            <NoteCard
                                                note={note}
                                                hitDownload={hitDownload}
                                                hitLike={hitLike}
                                                setDownloads={setDownloads}
                                                setLikes={setLikes}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            )}

                            {degree.semesters && (
                                <Accordion alwaysOpen className="custom-accordion">
                                    {degree.semesters.map((sem, semIdx) => (
                                        <Accordion.Item eventKey={`sem-${degIdx}-${semIdx}`} key={semIdx}>
                                            <Accordion.Header>{sem.title}</Accordion.Header>
                                            <Accordion.Body>
                                                <Accordion alwaysOpen className="custom-accordion">
                                                    {sem.modules.map((module, modIdx) => (
                                                        <Accordion.Item
                                                            eventKey={`mod-${degIdx}-${semIdx}-${modIdx}`}
                                                            key={modIdx}
                                                        >
                                                            <Accordion.Header>{module.title}</Accordion.Header>
                                                            <Accordion.Body>
                                                                <Row style={{ gap: "1rem" }}>
                                                                    {module.notes.map((note) => (
                                                                        <Col key={note.id} xs={12} md={6} lg={4}>
                                                                            <NoteCard
                                                                                note={note}
                                                                                hitDownload={hitDownload}
                                                                                hitLike={hitLike}
                                                                                setDownloads={setDownloads}
                                                                                setLikes={setLikes}
                                                                            />
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

/* ------------------------------- NOTE CARD ------------------------------- */
function NoteCard({ note, hitDownload, hitLike, setDownloads, setLikes }) {
    const [liked, setLiked] = useState(() => {
        try {
            return localStorage.getItem(`liked_${note.key}`) === "1";
        } catch {
            return false;
        }
    });

    const onDownload = async (e) => {
        e.preventDefault();
        const newVal = await hitDownload();
        setDownloads(newVal); // live update top counter
        window.open(note.fileUrl, "_blank");
    };

    const onLike = async () => {
        if (liked) return;
        const newVal = await hitLike();
        setLikes(newVal); // live update top counter
        localStorage.setItem(`liked_${note.key}`, "1");
        setLiked(true);
    };

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

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "0.75rem",
                        marginTop: 12,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Button variant={liked ? "success" : "outline-primary"} onClick={onLike} disabled={liked}>
                            {liked ? "Liked" : "Like"}
                        </Button>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Button variant="primary" onClick={onDownload}>
                            View/Download
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default Resources;
