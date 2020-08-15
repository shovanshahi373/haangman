import React, { useState } from "react";

const Modal = ({ startGame, inputSetter, userInput }) => {
  const [showInput, setShowInput] = useState(false);

  return (
    <section className='modal'>
      {showInput ? (
        <div className='slideRight'>
          <div>
            <input
              type='text'
              value={userInput}
              placeholder={"enter a word..."}
              onChange={(e) => inputSetter(e.target.value)}
            />
          </div>
          <button
            style={{
              display: "block",
              width: "100%",
              margin: "0",
            }}
            className='btn'
            onClick={() => startGame(1)}
          >
            submit
          </button>
        </div>
      ) : (
        <div className='slideRight'>
          <h1>Hangman</h1>
          <div
            style={{
              display: "flex",
            }}
          >
            <button className='btn' onClick={() => setShowInput(true)}>
              challenge a friend
            </button>
            <button className='btn' onClick={() => startGame(2)}>
              survival mode
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Modal;
