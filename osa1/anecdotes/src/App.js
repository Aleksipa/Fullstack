import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Anecdote = ({title, anecdote, points}) => {
  return (
      <div>
        <h1>{title}</h1>
        <p>
          {anecdote}
        </p>
        <p>
          has {points} votes
        </p>
      </div>
  )
}

const setAnecdote = ({ setSelected }) => {
  setSelected(Math.floor(Math.random()*7))
}

const setVote = ({ setVotes, votes, selected}) => {
  const updatedVotes = [...votes]
  updatedVotes[selected] += 1
  setVotes(updatedVotes)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ] 

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(7).fill(0))

  const indexOfMaxVotes = votes.indexOf(Math.max(...votes))

  
  return (
    <>
      <Anecdote title={'Anecdote of the day'} anecdote={anecdotes[selected]} points={votes[selected]}/>
      <Button handleClick={() => setVote({setVotes, votes, selected})} text="vote"/>
      <Button handleClick={() => setAnecdote({setSelected})} text="next anecdote"/>
      <Anecdote title={'Anecdote with most votes'} anecdote={anecdotes[indexOfMaxVotes]} points={votes[indexOfMaxVotes]}/>
    </>
  )
}

export default App




