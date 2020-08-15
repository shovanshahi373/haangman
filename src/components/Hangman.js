import React, { useState, useEffect, useRef } from "react";
import Figure from "./Figure";
import WordPool from "./WordPool";
import Word from "./Word";
import { difficultyMap } from "../gamevariables";

const myCustomWord = "the greatest story";

export default function Hangman({ userInput, customWord }) {
  const winlossRef = useRef();
  const [word, setWord] = useState(userInput);
  const [loading, setLoading] = useState(false);
  const [memoizedLetters, setMemoizedLetters] = useState([]);
  const [currentIteration, setCurrentIteration] = useState(userInput);
  const [progress, setProgress] = useState(0);
  const [wrongs, setWrongs] = useState(0);
  const [positiveSpree, setPositiveSpree] = useState(0);
  const [negativeSpree, setNegativeSpree] = useState(0);
  const difficulty = useRef(difficultyMap["expert"]);
  const [showScore, setShowScore] = useState(false);
  const cancelTokenRef = useRef();
  //only run in initial render

  const arrangeWords = () => {
    let clone = word.split("");
    let wordsLeft = Math.floor(
      word.replace(" ", "").length * difficulty.current.initialWords
    );
    while (wordsLeft !== 0) {
      const rng = Math.floor(Math.random() * clone.length);
      const seletedLetter = clone[rng];
      if (seletedLetter !== " " && seletedLetter !== "*") {
        clone[rng] = "*";
        wordsLeft -= 1;
      }
    }
    setCurrentIteration(clone.join(""));
  };

  const handleKeyUp = (e) => {
    clearTimeout(cancelTokenRef.current);
    if (!e.key.match(/[a-zA-Z]/) || e.key.length !== 1) return;
    const isExist = [...memoizedLetters].findIndex(
      (item) => e.key === item.letter
    );
    if (isExist === -1) {
      console.log("you pressed a new letter!");
      setMemoizedLetters((prev) => [
        ...prev,
        {
          letter: e.key,
          remark: word.includes(e.key) ? "right" : "wrong",
        },
      ]);
    } else {
      console.log("you already pressed " + e.key);
    }
  };

  const resetVars = () => {
    setPositiveSpree(0);
    setPositiveSpree(0);
    setWrongs(0);
    setProgress(0);
    clearTimeout(cancelTokenRef.current);
    cancelTokenRef.current = null;
  };

  useEffect(() => {
    console.log("am i called everytime - memoized array");
    if (!memoizedLetters.length) return;
    let winfactor = positiveSpree;
    let losefactor = negativeSpree;
    const { letter: newkey } = [...memoizedLetters].pop();
    const index = word.indexOf(newkey);
    if (index === -1) {
      if (winlossRef.current !== null && winlossRef.current === "win") {
        winfactor = 0;
      }
      losefactor += 1;

      //logic for handling incorrect letter for the word
      setWrongs(wrongs + 1);
      winlossRef.current = "loss";
    } else {
      if (winlossRef.current !== null && winlossRef.current === "win") {
        losefactor = 0;
      }
      winfactor += 1;

      let c = progress * word.replace(" ", "").length;
      const newci = currentIteration
        .split("")
        .map((l, i) => {
          console.log(l);
          if (word[i] === newkey) {
            c = c + 1;
            return newkey;
          } else return l;
        })
        .join("");
      setProgress(c / word.replace(" ", "").length);
      setCurrentIteration(newci);
      winlossRef.current = "win";
    }
    setPositiveSpree(winfactor);
    setNegativeSpree(losefactor);
  }, [memoizedLetters]);

  const fetchWord = async () => {
    setMemoizedLetters([]);
    setLoading(true);
    try {
      const data = await fetch(
        `https://random-word-api.herokuapp.com/word?number=1&swear=0`
      );
      const result = await data.json();
      setWord(result.pop());
    } catch (err) {
      setWord(myCustomWord);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (customWord) return;
    fetchWord();
  }, []);

  // on initial render, the function handlekeyup captured the initial value of memoizedletters,everytime, so calling this function would never actually do the update defined in it as desired and never properly..
  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  });

  useEffect(() => {
    if (progress === 1 || wrongs === 6) {
      setShowScore(true);
      setTimeout(() => {
        setShowScore(false);
        fetchWord().then(() => resetVars());
      }, 3000);
      // fetchWord().then(() => resetVars());
    }
  }, [progress, wrongs]);

  useEffect(() => {
    arrangeWords();
  }, [word]);

  return (
    <div className='container App'>
      <header
        style={{
          position: "relative",
          minHeight: "100px",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <div className='scibble-image' />
        <h1 className='logo'>Hangman</h1>
      </header>
      {!loading ? (
        <>
          <Word currentIteration={currentIteration} className='fadeIn' />
          <section className='figure-section'>
            <div className='score-container'>
              {showScore ? (
                <div className='score stamp'>
                  <span>
                    {Math.floor(progress * word.replace(" ", "").length)}
                  </span>
                  <svg
                    style={{
                      height: "1px",
                      width: "100%",
                      stroke: "black",
                      strokeWidth: "5px",
                    }}
                  >
                    <line x1='25%' y1='0' x2='100%' y2='0' />
                  </svg>
                  <span>{word.replace(" ", "").length}</span>
                </div>
              ) : null}
            </div>
            <Figure
              wrongs={wrongs}
              progress={progress}
              positiveSpree={positiveSpree}
              negativeSpree={negativeSpree}
              cancelToken={cancelTokenRef.current}
            />
          </section>
          <WordPool memoizedLetters={memoizedLetters} />
        </>
      ) : (
        <div className='loading' />
      )}
    </div>
  );
}
