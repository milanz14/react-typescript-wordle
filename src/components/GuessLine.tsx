import React from "react";

const WORD_LENGTH = 6;

interface GuessLineProps {
  guess: string;
  isFinal: boolean;
  solution: string;
}

const GuessLine = ({
  guess,
  isFinal,
  solution,
}: GuessLineProps): JSX.Element => {
  const squares = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    const letter = guess[i]!;
    let className = "square";
    if (isFinal) {
      if (letter === solution[i]) {
        className += " correct";
      } else if (solution.includes(letter)) {
        className += " close";
      } else {
        className += " incorrect";
      }
    }
    squares.push(
      <div className={className} key={i}>
        {letter}
      </div>
    );
  }

  return <div className="line">{squares}</div>;
};

export default GuessLine;
