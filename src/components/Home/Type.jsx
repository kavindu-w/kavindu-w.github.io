import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Computer Science PhD Student",
          "Computer Science & Engineering Graduate",
          "Passionate Pianist",
        ],
        autoStart: true,
        loop: true,
        delay: 75,
        deleteSpeed: 60,
        cursor: "_",
      }}
    />
  );
}

export default Type;
