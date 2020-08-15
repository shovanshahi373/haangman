import React, { useEffect, useRef } from "react";
import { speechBubbles } from "../gamevariables";

const strokeStyle = {
  strokeWidth: "2px",
  stroke: "black",
  fill: "none",
  transition: "all 2s",
  strokeDasharray: "400px 400px",
  strokeDashoffset: "400px",
  animationName: "stroke",
  animationDuration: "1s",
  animationFillMode: "forwards",
};

const svgcontainer = {
  height: "200px",
  width: "200px",
  marginTop: "100px",
};

const bodyParts = {
  1: <circle cx='70%' cy='30%' r='20' style={strokeStyle} />,
  2: <line x1='70%' y1='40%' x2='70%' y2='60%' style={strokeStyle} />,
  3: <line x1='70%' y1='45%' x2='60%' y2='60%' style={strokeStyle} />,
  4: <line x1='70%' y1='45%' x2='80%' y2='60%' style={strokeStyle} />,
  5: <line x1='70%' y1='60%' x2='60%' y2='80%' style={strokeStyle} />,
  6: <line x1='70%' y1='60%' x2='80%' y2='80%' style={strokeStyle} />,
};

const bodyPartsPath = [
  <circle
    cx='70%'
    cy='30%'
    r='20'
    style={{ ...strokeStyle, stroke: "rgba(0,0,0,0.2)" }}
  />,
  <line
    x1='70%'
    y1='40%'
    x2='70%'
    y2='60%'
    style={{ ...strokeStyle, stroke: "rgba(0,0,0,0.2)" }}
  />,
  <line
    x1='70%'
    y1='45%'
    x2='60%'
    y2='60%'
    style={{ ...strokeStyle, stroke: "rgba(0,0,0,0.2)" }}
  />,
  <line
    x1='70%'
    y1='45%'
    x2='80%'
    y2='60%'
    style={{ ...strokeStyle, stroke: "rgba(0,0,0,0.2)" }}
  />,
  <line
    x1='70%'
    y1='60%'
    x2='60%'
    y2='80%'
    style={{ ...strokeStyle, stroke: "rgba(0,0,0,0.2)" }}
  />,
  <line
    x1='70%'
    y1='60%'
    x2='80%'
    y2='80%'
    style={{ ...strokeStyle, stroke: "rgba(0,0,0,0.2)" }}
  />,
];

const Figure = ({
  wrongs,
  progress,
  positiveSpree,
  negativeSpree,
  cancelToken,
}) => {
  const speechRef = useRef();
  const cricleStroke = new Audio("/audio/pencilStroke -circle.mp3");
  const lineStroke = new Audio("/audio/pencilStroke-line.mp3");

  const playAudio = () => {
    let pencilStroke;
    if (Math.random() > 0.5) pencilStroke = cricleStroke;
    else pencilStroke = lineStroke;
    pencilStroke.play();
  };

  const speakThought = (target = "") => {
    // clearTimeout(cancelToken);
    clearTimeout(cancelToken);
    if (!target && !speechRef && speechRef.current === null) return;
    const id = setTimeout(() => {
      if (speechRef === null || speechRef.current === null) return;
      console.log(speechRef, speechRef.current);
      speechRef.current.classList.remove("pop-animation");
      // speechRef.current.classList.add("pop-animation");
      speechRef.current.style.backgroundImage = `none`;
    }, 13000);
    cancelToken = id;
    speechRef.current.classList.add("pop-animation");
    speechRef.current.style.backgroundImage = `url(${speechBubbles[target].url})`;
  };

  useEffect(() => {
    speakThought("start");
    // speechRef.current.style.backgroundImage = `url(${speechBubbles(start.url)})`
  }, []);

  useEffect(() => {
    if (positiveSpree && positiveSpree % 3 === 0) {
      speakThought("winning");
    }
  }, [positiveSpree]);

  useEffect(() => {
    if (negativeSpree && negativeSpree % 2 === 0) {
      speakThought("losing");
    }
    if (negativeSpree && negativeSpree % 3 === 0) {
      speakThought("angry");
    }
  }, [negativeSpree]);

  useEffect(() => {
    if (wrongs) {
      playAudio();
    }
    if (wrongs === 4) {
      speakThought("dead");
    }
    if (wrongs === 5) {
      speakThought("dead");
    }
  }, [wrongs]);

  useEffect(() => {
    if (progress.toFixed(1) === "0.7") {
      speakThought("winning");
    }
    return () => {
      console.log("this runs also when old values change....");
    };
  }, [progress]);
  return (
    <div
      style={{
        position: "relative",
        // marginRight: "3vw",
        alignSelf: "flex-end",
      }}
    >
      <div className='speech' ref={speechRef}></div>
      <svg style={svgcontainer}>
        {bodyPartsPath}
        {/* hang-pole */}
        <path
          d='M80 20 L140 20 L140 40 M80 20 L80 195 M40 195 L100 195'
          style={{ ...strokeStyle, strokeDasharray: "0px 0px" }}
        ></path>
        {Array(wrongs)
          .fill(0)
          .map((space, i) => {
            return bodyParts[i + 1];
          })}
      </svg>
    </div>
  );
};

export default Figure;
