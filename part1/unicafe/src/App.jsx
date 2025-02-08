import { useState } from 'react'
import Button from './Button'
import Statistics from './Statistics'
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)
  
  const handleGood = () => {
    const updatedGood = good + 1
    const newAvg = (updatedGood - bad) / (updatedGood + neutral + bad)
    const newPositive = updatedGood / (updatedGood + neutral + bad)
    setGood(updatedGood)
    setAll(updatedGood + neutral + bad)
    setAvg(newAvg)
    setPositive(newPositive)
  }
  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    const newAvg = (good - bad) / (good + updatedNeutral + bad)
    const newPositive = good / (good + updatedNeutral + bad)
    setNeutral(updatedNeutral)
    setAll(good + updatedNeutral + bad)
    setAvg(newAvg)
    setPositive(newPositive)
  }
  const handleBad = () => {
    const updatedBad = bad + 1
    const newAvg = (good - updatedBad) / (good + neutral + updatedBad)
    const newPositive = good / (good + neutral + updatedBad)
    setBad(updatedBad)
    setAll(good + neutral + updatedBad)
    setAvg(newAvg)
    setPositive(newPositive)
  }
  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Button onClick={handleGood} text={'good'} />
        <Button onClick={handleNeutral} text={'neutral'} />
        <Button onClick={handleBad} text={'bad'} />
        <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg} positive={positive} />
      </div>

    </div>
  )
}

export default App