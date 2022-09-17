import React, { useEffect } from 'react';

import './App.css';

import {words} from "./data/words"

function App() {

  useEffect(() => {
    const randIdx = Math.floor(Math.random() * words.length)
    const randWord = words[randIdx]
    console.log(randWord)

  },[])

  return (
    <div className="App">
     <h1>Placeholder</h1>
    </div>
  );
}

export default App;
