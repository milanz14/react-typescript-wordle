import React, { useEffect, useState } from "react";
import "./App.css";
import { words } from "./data/words";

import GuessLine from "./components/GuessLine";

function App() {
  const [gameWord, setGameWord] = useState("");
  const [guessedWord, setGuessedWord] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));

  // save a random word on app mount
  useEffect(() => {
    const randIdx = Math.floor(Math.random() * words.length);
    const randWord = words[randIdx].toUpperCase();
    setGameWord(randWord);
  }, []);

  return (
    <div className="App">
      {gameWord}
      <div className="guessesInput">
        <input type="text" placeholder="Input guess... " />
        <button>Check Guess</button>
      </div>
      <div className="gameboard">
        {guesses.map((guess) => {
          return <GuessLine guess={guess} />;
        })}
      </div>
    </div>
  );
}

export default App;
