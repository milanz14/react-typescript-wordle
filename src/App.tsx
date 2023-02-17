import { useEffect, useState, useRef } from "react";
import { Heading, Input, Button, Stack } from "@chakra-ui/react";
import "./App.css";
import { words } from "./data/words";

import GuessLine from "./components/GuessLine";
import Header from "./components/Header";

function App(): JSX.Element {
  const [gameWord, setGameWord] = useState<string>("");
  const [guesses, setGuesses] = useState(Array(6).fill(""));
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean>(false);

  const guessInputRef = useRef<HTMLInputElement>(null);
  const gameWordRef = useRef<string | null>(null);
  const guessedWordRef = useRef<string>("");

  // save a random word on app mount
  useEffect(() => {
    const randIdx = Math.floor(Math.random() * words.length);
    const randWord = words[randIdx];
    gameWordRef.current! = randWord;
    setGameWord(randWord);
    console.log(words.length);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const wordForGuess: string = guessInputRef.current!.value;
    if (!wordForGuess) {
      alert("Must be a valid guess.");
    } else if (wordForGuess.length !== 6) {
      alert("Must be 6 letter word.");
    } else if (words.indexOf(wordForGuess) === -1) {
      alert("Currently not a valid word in the list of possible words");
    } else {
      guessedWordRef.current = wordForGuess;
      checkGuessedWord();
    }
    guessInputRef.current!.value = "";
  };

  const checkGuessedWord = (): void => {
    if (guessedWordRef.current === gameWordRef.current) {
      handleGuesses();
      setIsCorrectAnswer(true);
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
    if (count === 5) {
      setIsGameOver(true);
      return;
    }
  };

  const handleResetGame = () => {
    console.log("resetting the game");
  };

  return (
    <div className="App">
      <Header />
      <form className="guessesInput" onSubmit={handleSubmit}>
        <Stack direction="row" align="center" justify="center">
          <Input
            type="text"
            placeholder="Input guess... "
            ref={guessInputRef}
            disabled={isGameOver}
            className="guess"
          />
          <Button
            type="submit"
            isDisabled={isGameOver}
            colorScheme="purple"
            className="btn">
            Check Guess
          </Button>
        </Stack>
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
      {isGameOver && isCorrectAnswer && (
        <div>
          <p>
            Correct! It took you {count} {count > 1 ? "tries" : "try"}
          </p>
        </div>
      )}
      {isGameOver && !isCorrectAnswer && (
        <div className="results-container">
          <p>Out of tries! Sorry!</p>
          <p>
            The word was <span className="word">{gameWord.toUpperCase()}</span>
          </p>
          <Button
            type="button"
            colorScheme="red"
            className="reset-btn"
            onClick={handleResetGame}>
            <span>Reset</span>
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
