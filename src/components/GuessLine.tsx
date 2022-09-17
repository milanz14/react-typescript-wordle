import React from "react";

const WORD_LENGTH = 6;

interface GuessLineProps {
  guess: string;
}

const GuessLine = ({ guess }: GuessLineProps) => {
  const squares = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    const letter = guess[i];
    squares.push(
      <div className="square" key={i}>
        {letter}
      </div>
    );
  }

  return <div className="line">{squares}</div>;
};

export default GuessLine;
