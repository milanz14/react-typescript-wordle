import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { words } from "./data/words";

import GuessLine from "./components/GuessLine";

function App(): JSX.Element {
  const [gameWord, setGameWord] = useState<string>("");
  const [guesses, setGuesses] = useState(Array(6).fill(""));
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  const guessInputRef = useRef<HTMLInputElement>(null);
  const gameWordRef = useRef<string | null>(null);
  const guessedWordRef = useRef<string>("");

  // save a random word on app mount
  useEffect(() => {
    const randIdx = Math.floor(Math.random() * words.length);
    const randWord = words[randIdx];
    gameWordRef.current! = randWord;
    setGameWord(randWord);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const wordForGuess: string = guessInputRef.current!.value;
    if (!wordForGuess) {
      alert("Must be a valid guess.");
    } else if (wordForGuess.length !== 6) {
      alert("Must be 6 letter word.");
    } else if (words.indexOf(wordForGuess) === -1) {
      return;
    } else {
      guessedWordRef.current = wordForGuess;
      checkGuessedWord();
    }
    guessInputRef.current!.value = "";
  };

  const checkGuessedWord = (): void => {
    if (guessedWordRef.current === gameWordRef.current) {
      handleGuesses();
      setIsGameOver(true);
      return;
    }
    handleGuesses();
  };

  const handleGuesses = (): void => {
    setCount((count) => count + 1);
    const newGuesses = [...guesses];
    newGuesses[guesses.findIndex((val) => val === "")] = guessedWordRef.current;
    setGuesses(newGuesses);
  };

  const handleGameReset = () => {
    guessedWordRef.current = "";
    setGuesses(Array(6).fill(""));
    setIsGameOver(false);
    setCount(0);
  };

  return (
    <div className="App">
      <h2>6Wordle</h2>
      <form className="guessesInput" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Input guess... "
          ref={guessInputRef}
          disabled={isGameOver}
        />
        <button type="submit" disabled={isGameOver}>
          Check Guess
        </button>
      </form>
      <div className="gameboard">
        {guesses.map((guess: string, idx) => {
          const isCurrentGuess =
            idx === guesses.findIndex((val) => val === null);
          return (
            <GuessLine
              guess={isCurrentGuess ? guessedWordRef.current : guess ?? ""}
              isFinal={!isCurrentGuess && guess !== ""}
              solution={gameWord}
              key={idx}
            />
          );
        })}
      </div>
      {isGameOver && (
        <div>
          <p>It took you {count} tries!</p>
          <button onClick={handleGameReset}>Reset</button>
        </div>
      )}
    </div>
  );
}

export default App;
