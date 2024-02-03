import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Computer Science & Engineering Undergraduate",
          "Specializing in Data Science",
          "Passionate pianist",
        ],
        autoStart: true,
        loop: true,
        delay: 75,   // Set a delay of 75 milliseconds between each character
        deleteSpeed: 60,  // Set the delete speed to 50 milliseconds
        cursor: "_",  // Set the cursor symbol to underscore (_)
      
      }}
    />
  );
}

export default Type;
