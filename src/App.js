import React from 'react'
import useWordGame from "./hooks/useWordGame"

function App() {

  const {
    inputRef, 
    handleChange, 
    text, 
    isTimeRunning, 
    timeRemaining, 
    startGame, 
    wordCount
  } = useWordGame(30)

  return (
    <>
      <h1>Typing Speed Test</h1>
      <textarea 
        onChange={handleChange}
        value={text}
        disabled={!isTimeRunning}
        ref={inputRef}
      />
      <h4>Time Remaining: {timeRemaining}</h4>
      <button onClick={startGame} disabled={isTimeRunning}> START </button>
      <h1> Speed: {wordCount} WPM</h1>
    </>
  )
}

export default App;