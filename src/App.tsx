import React, { useEffect, useState } from 'react';

import './App.css';

import {words} from "./data/words"

function App() {

  const [ gameWord, setGameWord ] = useState('')

  useEffect(() => {
    const randIdx = Math.floor(Math.random() * words.length)
    const randWord = words[randIdx]
    setGameWord(randWord)
  },[])

  return (
    <div className="App">
     {gameWord}
    </div>
  );
}

export default App;
