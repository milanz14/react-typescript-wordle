import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { words } from "./data/words";

import GuessLine from "./components/GuessLine";

function App(): JSX.Element {
  const [gameWord, setGameWord] = useState("");
  const [guessedWord, setGuessedWord] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));

  const guessInputRef = useRef<HTMLInputElement>(null);
  const gameWordRef = useRef("");

  // save a random word on app mount
  useEffect(() => {
    const makeGameWord = () => {
      const randIdx = Math.floor(Math.random() * words.length);
      const randWord = words[randIdx];
      setGameWord(randWord);
      gameWordRef.current = randWord;
    };
    makeGameWord();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // console.log(guessInputRef.current!.value);
    const wordForGuess: string = guessInputRef.current!.value;
    if (!wordForGuess) {
      alert("Must be a valid guess");
    } else if (wordForGuess.length !== 6) {
      alert("Must be 6 letter word");
    } else if (words.indexOf(wordForGuess) === -1) {
      alert("Not a valid 6 letter word");
    } else {
      setGuessedWord(wordForGuess);
    }
    checkGuessedWord();
    // guessInputRef.current!.value = "";
  };

  const checkGuessedWord = () => {
    console.log(guessedWord);
    console.log(gameWordRef);
  };

  return (
    <div className="App">
      <h2>6Wordle</h2>
      {gameWord}
      <form className="guessesInput" onSubmit={handleSubmit}>
        <input type="text" placeholder="Input guess... " ref={guessInputRef} />
        <button type="submit">Check Guess</button>
      </form>
      <div className="gameboard">
        {guesses.map((guess: string, idx) => {
          return <GuessLine guess={guess ?? ""} key={idx} />;
        })}
      </div>
    </div>
  );
}

export default App;
