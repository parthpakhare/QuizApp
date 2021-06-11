import React from 'react';

import classes from './Quiz.module.css';

const DispQuestions = (props) => {
  const {index, problem , setUsersChoice, userChoice} = props;
  if(!problem) {
    return <h1>Spinner</h1>;
  }

  const {question, choices} = problem;

  return (
    <>
      <div className={classes.Question}>
        <h3>{index + 1 + '. ' + question}</h3>
      </div>
      {choices.map((option, i) => (
        <form key={i.toString()} >
          <input
            id={i}
            type='radio'
            name={'radio' + i}
            checked={userChoice === i + 1}
            onChange={() => {
              setUsersChoice(index, i + 1);
            }}
          />
          <label htmlFor={i}>
            <p className={classes.Answers}>{option}</p>
          </label>
        </form>
      ))}
    </>
  );
}

export default DispQuestions;