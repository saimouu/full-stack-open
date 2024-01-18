import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const handleNextClick = () => {
    const randomAnecdoteIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomAnecdoteIndex)
  }

  const handleVoteClick = () => {
    const pointsCopy = [...points]        // copy of points
    pointsCopy[selected] += 1             // increase by one
    setPoints(pointsCopy)                 // set points with the new copy
  }

  const indexOfMostPoints = points.indexOf(Math.max(...points))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]} <br /> has {points[selected]} votes</p>
      <Button handleClick={handleVoteClick} text={"vote"} />
      <Button handleClick={handleNextClick} text={"next anecdote"} />
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[indexOfMostPoints]} <br /> has {points[indexOfMostPoints]} votes</p>
    </div>
  )
}

export default App