
const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

// Mozilla docs / Array.prototype.reduce()
const Total = ({ parts }) => {
  const sumOfExercises = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises, 0
  )
  return ( 
    <b>Total of {sumOfExercises} exercises</b>
  )
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </>
  )
}

const Course = ({ course }) => {
  return (
      <div>
          <Header course={course} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
      </div>
  )
}

export default Course