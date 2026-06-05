import { useState, useEffect } from "react";

function Pre() {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("preloaded")) return;
    setLoad(true);
    const timer = setTimeout(() => {
      setLoad(false);
      sessionStorage.setItem("preloaded", "1");
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return <div id={load ? "preloader" : "preloader-none"}></div>;
}

export default Pre;
