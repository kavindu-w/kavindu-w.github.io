// filepath: src/components/Resources/Resources.js

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Accordion } from "react-bootstrap";
import structuredResources from "../../data/resources";
import "./Resources.css";

// CountAPI namespace for likes & downloads
const NAMESPACE = "kavindu-w-resources";

/* ------------------------ CUSTOM COUNTER HOOK ------------------------ */
function useCount(key) {
    const [count, setCount] = useState(null);

    useEffect(() => {
        let mounted = true;

        fetch(`https://api.countapi.xyz/get/${NAMESPACE}/${key}`)
            .then((r) => r.json())
            .then((data) => mounted && setCount(data?.value ?? 0))
            .catch(() => mounted && setCount(0));

        return () => (mounted = false);
    }, [key]);

    const hit = async () => {
        try {
            const res = await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${key}`);
            const data = await res.json();
            setCount(data?.value ?? count);
            return data?.value ?? count;
        } catch {
            return count;
        }
    };

    return [count, hit, setCount];
}

/* ---------------------------- MAIN COMPONENT ---------------------------- */
function Resources() {
    return (
        <Container fluid className="project-section" style={{ paddingTop: 120 }}>
            <h1 className="project-heading">
                <strong className="purple">Resources</strong>
            </h1>

            <p style={{ color: "white" }}>
                Study guides, lecture notes, and other materials. Reach out to{" "}
                <a href="mailto:akwarnakulasuriya@gmail.com" style={{ color: "#caa6ff" }}>
                    akwarnakulasuriya@gmail.com
                </a>{" "}
                for suggestions, additions, or corrections!
            </p>

            {/* ====================== DEGREE LEVEL ====================== */}
{/* ====================== DEGREE LEVEL ====================== */}
<Accordion alwaysOpen className="custom-accordion">
    {structuredResources.map((degree, degIdx) => (
        <Accordion.Item eventKey={`deg-${degIdx}`} key={degIdx}>
            <Accordion.Header>{degree.title}</Accordion.Header>
            <Accordion.Body>

                {/* CASE 1: Simple direct notes */}
                {degree.notes && (
                    <Row style={{ gap: "1rem" }}>
                        {degree.notes.map((note) => (
                            <Col key={note.id} xs={12} md={6} lg={4}>
                                <NoteCard note={note} />
                            </Col>
                        ))}
                    </Row>
                )}

                {/* CASE 2: Full nested academic structure */}
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
                                                                <NoteCard note={note} />
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
function NoteCard({ note }) {
    const downloadKey = `${note.key}-downloads`;
    const likeKey = `${note.key}-likes`;

    const [downloadCount, hitDownload] = useCount(downloadKey);
    const [likeCount, hitLike, setLikeCount] = useCount(likeKey);

    const [liked, setLiked] = useState(() => {
        try {
            return localStorage.getItem(`liked_${note.key}`) === "1";
        } catch {
            return false;
        }
    });

    /* Increment download count then open file */
    const onDownload = async (e) => {
        e.preventDefault();
        await hitDownload();
        window.open(note.fileUrl, "_blank");
    };

    /* Like button handler */
    const onLike = async () => {
        if (liked) return;
        const v = await hitLike();
        setLikeCount(v);
        localStorage.setItem(`liked_${note.key}`, "1");
        setLiked(true);
    };

    /* Detect preview type */
    const isPdf = note.fileUrl?.toLowerCase().endsWith(".pdf");
    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(note.fileUrl ?? "");

    return (
        <Card className="blog-card-view" style={{ height: "100%" }}>
            <Card.Body>
                <Card.Title>
                    <strong className="purple">{note.title}</strong>
                </Card.Title>

                {/* ------------------------ PREVIEW SECTION ------------------------ */}
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
                            <a
                                href={note.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: "#caa6ff" }}
                            >
                                Open preview (PDF)
                            </a>
                        </object>
                    ) : isImage ? (
                        <img
                            src={note.fileUrl}
                            alt={`${note.title} preview`}
                            style={{
                                width: "100%",
                                height: 180,
                                objectFit: "cover",
                                borderRadius: 6,
                            }}
                        />
                    ) : (
                        <div style={{ color: "#9b9b9b" }}>No preview available</div>
                    )}
                </div>

                {/* ------------------------ LIKE & DOWNLOAD BUTTONS ------------------------ */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "0.75rem",
                        marginTop: 12,
                    }}
                >
                    {/* Like */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Button variant={liked ? "success" : "outline-primary"} onClick={onLike} disabled={liked}>
                            {liked ? "Liked" : "Like"}
                        </Button>

                        <span style={{ color: "white" }}>
                            {likeCount === null ? "…" : likeCount} likes
                        </span>
                    </div>

                    {/* Download */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Button variant="primary" onClick={onDownload}>
                            View/Download
                        </Button>

                        <span style={{ color: "white" }}>
                            {downloadCount === null ? "…" : downloadCount} downloads
                        </span>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default Resources;
