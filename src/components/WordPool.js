import React, { useCallback } from "react";
import { alphabets } from "../gamevariables";

const WordPool = ({ memoizedLetters }) => {
  const computeAlphabets = useCallback(() => {
    return alphabets.split("").map((alp) => {
      const item = memoizedLetters.find(({ letter }) => letter === alp);
      return (
        <span
          style={{
            opacity: !!item ? 1 : 0.3,
            fontSize: "35px",
            fontFamily: "redpen",
            fontWeight: "bolder",
          }}
          className={!!item ? "lineThrough" : null}
        >
          {alp}
        </span>
      );
    });
  }, [memoizedLetters]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(10,1fr)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {computeAlphabets()}
    </div>
  );
};

export default WordPool;
