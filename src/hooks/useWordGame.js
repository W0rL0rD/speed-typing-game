import { useState, useEffect, useRef } from 'react'

function useWordGame(startingTime = 5) {
	const [text, setText] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(startingTime)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const inputRef = useRef(null)

  function handleChange(e) {
    const {value} = e.target // value contains the user input data in textarea.
    setText(value) // Updates the state variable with value.
  }

	function startGame() {
    setIsTimeRunning(true)
    setTimeRemaining(startingTime) 
    setText("")
		setWordCount(0)
    inputRef.current.disabled = false
    inputRef.current.focus()
  }

  function endGame() {
    setIsTimeRunning(false)
    setWordCount(calculateWordCount(text))
  }

  // useEffect() runs every time timeRemaining or isTimeRunning changes but what we do is that we wait one second and then decrememnt the time which changes timeRemaining and thus causes useEffect to run.
  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
        setTimeout(() => {
            setTimeRemaining(time => time - 1)
        }, 1000)
    } else if (timeRemaining === 0) {
        endGame()
    }
  }, [timeRemaining, isTimeRunning])

  function calculateWordCount(text) {
    // trim() ensures that white space is not counted as 
    const wordsArr = text.trim().split(" ")

    // Returns the length of the array of words that are not white spaces 
    return wordsArr.filter(word => word !== "").length
  }

	return {inputRef, handleChange, text, isTimeRunning, timeRemaining, startGame, wordCount}
}

export default useWordGame