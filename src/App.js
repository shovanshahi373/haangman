import React, { useState, useRef } from "react";
import Hangman from "./components/Hangman";
import "./App.css";
import Modal from "./components/Modal";
import { difficultyMap } from "./gamevariables";

export default function App() {
  const [loadHangman, setLoadHangman] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [hasUserDefinedInput, setHasUserDefinedInput] = useState(false);
  const [difficulty, setDifficulty] = useState(difficultyMap["expert"]);
  const gameModeRef = useRef();

  const startGame = (mode) => {
    setLoadHangman(true);
  };

  const inputSetter = (val) => {
    setUserInput(val);
    setHasUserDefinedInput(true);
  };

  if (loadHangman)
    return (
      <Hangman
        userInput={userInput}
        customWord={hasUserDefinedInput}
        difficulty={difficulty}
      />
    );
  return (
    <Modal
      startGame={startGame}
      inputSetter={inputSetter}
      userInput={userInput}
      setDifficulty={setDifficulty}
    />
  );
}
