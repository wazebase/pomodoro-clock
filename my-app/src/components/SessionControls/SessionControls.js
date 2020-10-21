import React,{useState, useEffect} from "react";
import './SessionControls.css';


const SessionControls = ({setBreakTime,setSessionTime,setIsStarted,setIsPaused,sessionTime,
  breakTime,isPaused,isStarted,timeLeft,setTimeLeft,sessionState}) => {
  

    useEffect(()=> {
      if((isStarted && isPaused) && sessionState==="Session") {
        setTimeLeft(sessionTime*60);
        console.log(sessionTime);
      }
    },[sessionTime])

    useEffect(() => {
      if((isStarted && isPaused) && sessionState==="Break") {
        console.log(sessionState);
        setTimeLeft(breakTime*60);
      }
    },[breakTime]);

    const handleBreakPlus = () =>{
      (isStarted===false || isPaused===true) && breakTime < 60 ? setBreakTime(breakTime=>breakTime+1) 
      : setBreakTime(breakTime);
    }
    const handleBreakMinus = () => {
      (isStarted===false || isPaused===true) && breakTime > 1 ? setBreakTime(breakTime=>breakTime-1) 
      : setBreakTime(breakTime)
    }
    const handleSessionPlus = () => {
      (isStarted===false || isPaused===true) && sessionTime<60 ? setSessionTime(sessionTime=>sessionTime+1) 
      : setSessionTime(sessionTime);
    }
    const handleSessionMinus = () => {
      (isStarted===false || isPaused===true) && sessionTime >1 ? setSessionTime(sessionTime=>sessionTime-1)
      : setSessionTime(sessionTime);
    }
    return (
      <div id="controls-container">
        <div id="break-box">
          <p id="break-label">Break time</p>
               <button  id="break-increment" onClick={handleBreakPlus}>
              <i className="fa fa-plus" aria-hidden="true" />
              </button>
              <div id="break-length">
             {breakTime}
              </div>
              
              <button id="break-decrement"  onClick={handleBreakMinus}>
              <i className="fa fa-minus" aria-hidden="true" 
             />
             </button>
              </div>
        <div id="session-box">
          <p id="session-label">Session time</p>
         
              <button id="session-increment" onClick={handleSessionPlus}>
              <i className="fa fa-plus fa-1.6x"  aria-hidden="true" />
              </button>
              <div id="session-length">
              {sessionTime}
              </div>
              <button id="session-decrement"  onClick={handleSessionMinus}>
              <i className="fa fa-minus fa-1.6x" aria-hidden="true"
               />
               </button>
          
       </div>
      </div>
    ); 
  }

  export default SessionControls;
