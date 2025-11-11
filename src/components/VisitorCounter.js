import React, { useEffect, useState } from "react";

const WORKSPACE = "kavindu-testers-team-1628";
const COUNTER_NAME = "first-counter-1628";
const BASE_URL = "https://api.counterapi.dev/v2";

function VisitorCounter({ className, style }) {
    const [count, setCount] = useState(null);
    const [error, setError] = useState(null);

    const fetchCount = async () => {
        try {
            const res = await fetch(`${BASE_URL}/${WORKSPACE}/${COUNTER_NAME}`, { cache: "no-store" });
            const json = await res.json();
            setCount(json.data.up_count);
        } catch (err) {
            console.error("GET error:", err);
            setError("Counter unavailable");
        }
    };

    const incrementCount = async () => {
        try {
            const res = await fetch(`${BASE_URL}/${WORKSPACE}/${COUNTER_NAME}/up`, { cache: "no-store" });
            const json = await res.json();
            setCount(json.data.up_count); // <- important: use json.data.up_count
            // console.log("Count incremented to:", json);
        } catch (err) {
            console.error("UP error:", err);
        }
    };

    useEffect(() => {
        fetchCount();

        const handleClick = async () => {
            // Ensure only once per session
            try {
                // sessionStorage.removeItem("site_visited"); NOTE for debugging (otherwise cannot test multiple times in one session)

                console.log("Checking session storage for site_visited", sessionStorage.getItem("site_visited"));

                if (sessionStorage.getItem("site_visited")) return;
                sessionStorage.setItem("site_visited", "1");
            } catch { }

            await incrementCount(); // wait for API response
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return (
        <div className={className} style={style}>
            {error ? (
                <small style={{ color: "rgba(255,255,255,0.9)" }}>{error}</small>
            ) : (
                <small style={{ color: "rgba(255,255,255,0.9)" }}>
                    Intriguing Visitors: {count === null ? "…" : count}
                </small>
            )}
        </div>
    );
}

export default VisitorCounter;
