import React, { useState } from 'react'

const Header = (props) => {
  return (
      <h1>
        {props.text}
      </h1>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
  )
}

const Statistics = ({good, neutral, bad, all}) => {

  const average = (good - bad) / all
  const positive = (good / all * 100) + " %"

  if (all === 0) {
    return (
    <div>
      <h1>Statistics</h1>
      <p>No feedback given</p>
      </div>
    )
  }

  return (
    <><h1>Statistics</h1>
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table></>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const setGoodValue = (newValue) => {
    setGood(newValue)
    setAll(all + 1)
  }

  const setNeutralValue = (newValue) => {
    setNeutral(newValue)
    setAll(all + 1)
  }

  const setBadValue = (newValue) => {
    setBad(newValue)
    setAll(all + 1)
  }

  return (
    <>
      <Header text="give feedback"/>
      <Button handleClick={() => setGoodValue(good + 1)} text="good"/>
      <Button handleClick={() => setNeutralValue(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBadValue(bad + 1)} text="bad"/>
      <Statistics good = {good} neutral = {neutral} bad = {bad} all = {all}/>
    </>
  )
}

export default App