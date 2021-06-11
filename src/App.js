import React, { useState } from 'react';

import Quiz from './Components/Quiz';
import classes from './App.module.css';

const App = () => {

  const [begin, setBegin] = useState(false)
  
  const beginhandler = () => {
    setBegin(true)
  }

  return (
    <div className={classes.App}>
      <div className={classes.Container}>
        {!begin ? 
          <div className={classes.Content}>
            <h1>Do you want to begin with the QUIZ ?</h1>
            <button onClick={beginhandler} >START</button>
          </div>
          :
          <Quiz/>
        }
      </ div> 
    </div>
  );
}

export default App;
