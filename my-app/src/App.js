import React,{useState,useRef} from 'react';
import SessionControls from './components/SessionControls/SessionControls';
import SessionTimer from './components/SessionTimer/SessionTimer';

import './App.css';
import "./grid.css";

function App() {
  const [sessionTime,setSessionTime] = useState(25); 
  const [breakTime,setBreakTime] = useState(5); 
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isStarted, setIsStarted] = useState(false);
  const[isPaused,setIsPaused] = useState(false);
  const[sessionState,setSessionState] = useState("Session");
  const audioRef = useRef(null);

  

 return (
   <div id = "bigContainer">
<SessionControls sessionTime = {sessionTime} setSessionTime ={setSessionTime}
 breakTime = {breakTime} setBreakTime = {setBreakTime} timeLeft={timeLeft}
 setTimeLeft={setTimeLeft} isStarted={isStarted} isPaused={isPaused}
 setIsStarted={setIsStarted} setIsPaused={setIsPaused} sessionState={sessionState} /> 
 <SessionTimer sessionTime = {sessionTime} timeLeft={timeLeft} setTimeLeft= {setTimeLeft}
 isStarted= {isStarted} isPaused = {isPaused} audioRef={audioRef}
 breakTime = {breakTime} sessionState = {sessionState}
 setBreakTime = {setBreakTime} setSessionTime={setSessionTime} 
 setIsPaused={setIsPaused} setIsStarted = {setIsStarted} setSessionState = {setSessionState}/>
 </div>
 );
}


export default App;
