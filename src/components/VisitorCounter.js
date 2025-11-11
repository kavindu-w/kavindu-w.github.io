// filepath: src/components/VisitorCounter.js
import React, { useEffect, useState } from "react";
import { Counter } from 'counterapi';
const WORKSPACE = "kavindu-testers-team-1628";
const COUNTER = "first-counter-1628";

// Initialize the client
const client = new Counter({
    workspace: WORKSPACE,  // Your workspace name
});
function VisitorCounter({ className, style }) {
    const [count, setCount] = useState(null);
    const [error, setError] = useState(null);

    const loadCount = async () => {
        try {
            const res = await client.get(COUNTER);
            setCount(res.data.up_count);
        } catch (err) {
            console.error("GET error:", err);
            setError("");
        }
    };

    const incrementOncePerSession = async () => {
        try {
            if (sessionStorage.getItem("visited")) return;
            sessionStorage.setItem("visited", "1");

            const res = await client.up(COUNTER);
            setCount(res.data.up_count);
        } catch (err) {
            console.error("UP error:", err);
        }
    };

    useEffect(() => {
        loadCount();

        const handleClick = () => {
            incrementOncePerSession();
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

                    {Number(count) > 0 && (
                        <span>Intriguing Visitors: {count === null ? "…" : count}</span>
                    )}
                </small>
            )}
        </div>
    );
}

export default VisitorCounter;
