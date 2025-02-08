import Total from "./Total"
import Header from "./Header"
import Content from "./Content"
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content part1={parts[0].name} part2={parts[1].name} part3={parts[2].name}  exercises1={ parts[0].exercises} exercises2={ parts[1].exercises} exercises3={ parts[2].exercises} />
      <Total exercises1={ parts[0].exercises} exercises2={ parts[1].exercises} exercises3={ parts[2].exercises} />
    </div>
  )
}

export default App