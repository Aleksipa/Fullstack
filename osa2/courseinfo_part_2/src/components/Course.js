import React from 'react'

const Course = ({ course }) => {
    return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts} />
    </>
    )}
  
  
    const Header = ({ course }) => {
      return (
        <h2>{course}</h2>
      )
    }
  
    const Content = ({ parts }) => {
      return (
        <div>
          {parts.map(({id, name, exercises}) => (
            <Part key={id} name={name} exercises={exercises}/>
          ))}
        </div>
      )
    }
  
    const Total = ({ total }) => {
  
      const sum = total.reduce((sum, parts) => sum + parts.exercises, 0)
  
      return(
        <p><strong>Number of exercises {sum}</strong></p>
      ) 
    }
  
    const Part = ({name, exercises}) => {
      return (
        <p>
          {name} {exercises}
        </p>    
      )
    }

export default Course