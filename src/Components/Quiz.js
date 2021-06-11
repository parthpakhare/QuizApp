import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';

import classes from './Quiz.module.css'
import DispQuestions from './Dispquestion';

import PreviousArrow from './Assets/back.svg';
import NextArrow from './Assets/next.svg'

const randomShuffle = (q) => {
  for(let i = q.length-1 ; i>0 ; i--) {
    let ind=Math.floor(Math.random()*(i+1));
    let temp=q[i];
    q[i]=q[ind];
    q[ind]=temp;
  }
  return q;
}


const Timer = (props) => {
  const {time} = props;
  return (
    <>
      <p className={classes.ProgressBar}>
        {time===0
          ?"Time's up !!"
          :time+" seconds left"}
      </p>
      <progress max={100} value={100-time} color="danger"/>
    </>
  );
}


const Quiz = (props) => {
  const [time, setTime] = useState(100);
  const [active, setActive] = useState(true); 
  const [problems, setProblems] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState([]);

  const finishQuiz = (props) => {
    setActive(false);
    let score=0;
    for(let i=0; i<problems.length; i++){
        if(problems[i].correct===selected[i]){
          score+=10;
        }
      }
      alert('Congrats! Your score is'+score+" out of 100");
      window.location.reload(false);
    }

  const setUsersChoice = (index, choice) => {
    let t=selected;
    t[index]=choice;
    setSelected(t);
  }
  
  useEffect(() => {
    if (time === 0) {
      finishQuiz();
    }
    if(time!==0)
    {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [time]);
  
  useEffect(() => {
    setProblems(randomShuffle(props.questions).splice(0,10));
  },[]);
  
  return (
    <div className={classes.Container}>
      <Timer time={time} />
      <br />
      <DispQuestions
        index={current}
        problem={!problems ? null : problems[current]}
        active={active}
        userChoice={selected[current]}
        setUsersChoice={setUsersChoice}
      />
      <div className={classes.Btns}>
        <div className={classes.Prev}>
          {current !== 0 ? (
            <>
              <button
                data-visible={toString(current !== 0)}
                color='info'
                onClick={(e) => {
                  setCurrent(current - 1);
                }}
              >
                <img src={PreviousArrow} style={{marginLeft: '-4px'}} alt="Prev" />
              </button>
            </>
          ) : (
            <button className={classes.Hide}><img src={PreviousArrow} style={{marginLeft: '-4px'}} alt="Prev" /></button>
          )}
        </div>
        <div className={classes.Next}>
          {current !== 9 ? (
            <>
              <button
                color='info'
                onClick={(e) => {
                  setCurrent(current + 1);
                }}
              >
                <img src={NextArrow} style={{marginRight: '-4px'}} alt="Next" />
              </button>{' '}
            </>
          ) : (
            <button className={classes.Hide}><img src={NextArrow} style={{marginRight: '-4px'}} alt="Next" /></button>
            )}
        </div>
      </div>
      <div className={classes.Submit}>
        {
          current === 9 ? (
            <button
              color='info'
              onClick={() => {
                finishQuiz();
              }} 
            >
              SUBMIT
            </button>      
          ):( " " )
        }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    questions: state.quiz
  }
}

export default connect(mapStateToProps)(Quiz);