import { useState } from 'react'
import Button from './Button'
import Statistics from './Statistics'
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Button onClick={() => setGood(good + 1)} text={'good'} />
        <Button onClick={() => setNeutral(neutral + 1)} text={'neutral'} />
        <Button onClick={() => setBad(bad + 1)} text={'bad'} />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>

    </div>
  )
}

export default App