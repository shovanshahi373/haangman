import React from "react";

const Word = ({ currentIteration, ...props }) => {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        {...props}
        style={{
          display: "flex",
          gridGap: "10px",
          fontSize: "2em",
          margin: "0 60px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {currentIteration.split("").map((letter) => {
          return (
            <span
              className='letterstyle'
              style={{
                borderBottom: letter === " " ? "none" : "2px solid green",
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>
    </section>
  );
};

export default Word;
