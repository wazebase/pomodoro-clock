import React, { useState,useRef, useEffect } from "react";
import './SessionTimer.css';
import alarm from "./alarm.mp3"


const SessionTimer = ({ sessionTime, breakTime, isStarted, isPaused, setIsStarted
    , setIsPaused, timeLeft, setTimeLeft, setBreakTime, setSessionTime,
    sessionState, setSessionState, audioRef }) => {

    const accurateInterval = function (fn, time) {
        var cancel, nextAt, timeout, wrapper;
        nextAt = new Date().getTime() + time;
        timeout = null;
        wrapper = function () {
            nextAt += time;
            timeout = setTimeout(wrapper, nextAt - new Date().getTime());
            return fn();
        };
        cancel = function () {
            return clearTimeout(timeout);
        };
        timeout = setTimeout(wrapper, nextAt - new Date().getTime());
        return {
            cancel: cancel
        };
    };

    useEffect(() => {
        if (isStarted && !isPaused) {
            const timer = accurateInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1)
            }, 1000);
            return () => timer.cancel();
        }
    }, [isPaused, isStarted])

    useEffect(() => {
        if (!isStarted && !isPaused ) {
            let startTime = sessionTime * 60;
            setTimeLeft(startTime);
        }

        if (timeLeft === 0 && sessionState === "Session") {
            setTimeout(() => {
                setSessionState("Break");
                setTimeLeft(breakTime * 60);
            }, 1000);
            audioRef.current.play();
        }
        else if (timeLeft === 0 && sessionState === "Break") {
            setTimeout(() => {
                setSessionState("Session");
                setTimeLeft(sessionTime * 60);
            }, 1000);
            audioRef.current.play();
        }
    }, [isStarted, isPaused, timeLeft, sessionTime]);

    const resetTimer = () => {
        setIsPaused(false);
        setIsStarted(false);
        setBreakTime(5);
        setSessionTime(25);
        setSessionState("Session")
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    };

    useEffect(()=> {
        let time = document.getElementById("time-left");
        let display= document.getElementById("timer-display");
        let session = document.getElementById("timer-label")

        if(timeLeft ===0) {
            setTimeout(()=> {
                session.style.color="white";
                time.style.color ="whitesmoke";
                display.style.border="2.7px solid rgb(243, 245, 245)";
            },1000)
        }
        else if(timeLeft <60) {
            session.style.color="rgb(255, 232, 21)";
            time.style.color="rgb(255, 232, 21)"
            display.style.border="3px solid rgb(255, 232, 21)";
        }
        else if(timeLeft>60) {
            session.style.color="white";
            time.style.color ="whitesmoke";
            display.style.border="2.7px solid rgb(243, 245, 245)";
        }
       

    },[timeLeft,sessionState,resetTimer])

    const getClock = () => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft - minutes * 60;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return minutes + ":" + seconds;
    }

    return (
        <div id="timer-container">
            <div id="timer-display">
                <div id="timer-label">{sessionState}</div>
                <div id="time-left">{`${getClock()}`}</div>
            </div>
            <div id="start_stop">
                <div id="play_icon">
                    {!isStarted || isPaused ? (<i className="fa fa-play play_pause" onClick={() => {
                        setIsStarted(true);
                        setIsPaused(false)
                    }} />

                    ) : (

                            <i className="fa fa-pause play_pause" onClick={() => { setIsPaused(!isPaused) }} />
                        )}
                </div>
                <div id="reset">
                    <i className="fa fa-refresh" onClick={() => resetTimer()} />
                </div>
            </div>



            <audio id="beep" src={alarm} ref={audioRef} />
        </div>

    )
}

export default SessionTimer;