import React, { useEffect, useState } from "react";

/*
    Simple visitor counter using CountAPI (https://countapi.xyz).
    It fetches current value on mount, and when user clicks anywhere on the page
    for the first time in this browser session it will increment the counter.
    The counter key/namespace are safe to change if you want another counter.
*/

const NAMESPACE = "kavindu-w-github-io"; // change if you want a different counter
const KEY = "visitor_count";

function VisitorCounter({ className, style }) {
    const [count, setCount] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;

        // get current value (doesn't increment)
        fetch(`https://api.countapi.xyz/get/${NAMESPACE}/${KEY}`)
            .then((r) => {
                if (!r.ok) throw new Error("no value");
                return r.json();
            })
            .then((data) => {
                if (mounted) setCount(data.value ?? 0);
            })
            .catch(() => {
                // if not found or other error, show 0
                if (mounted) setCount(0);
            });

        // Handler to increment once per session
        const handleFirstClick = () => {
            try {
                if (sessionStorage.getItem("site_visited")) return;
            } catch (e) {
                // sessionStorage could be disabled, still attempt to increment but avoid repeated hits
            }

            // increment (hit) endpoint - will create key if missing
            fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`)
                .then((r) => r.json())
                .then((data) => {
                    if (mounted) setCount(data.value ?? count);
                    try {
                        sessionStorage.setItem("site_visited", "1");
                    } catch (e) { }
                })
                .catch((err) => {
                    if (mounted) setError("Counter unavailable");
                    console.error("CountAPI error:", err);
                });

            // remove listener after first increment attempt
            document.removeEventListener("click", handleFirstClick);
        };

        document.addEventListener("click", handleFirstClick, { once: true });

        return () => {
            mounted = false;
            document.removeEventListener("click", handleFirstClick);
        };
    }, []); // run once

    return (
        <div className={className} style={style}>
            {error ? (
                <small style={{ color: "rgba(255,255,255,0.9)" }}>{error}</small>
            ) : (
                <small style={{ color: "rgba(255,255,255,0.9)" }}>
                    Intriguing Vistors: {count === null ? "…" : count}
                </small>
            )}
        </div>
    );
}

export default VisitorCounter;