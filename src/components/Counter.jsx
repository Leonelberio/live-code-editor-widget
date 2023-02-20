import React, { useState, useEffect, useRef } from "react";
import soundfile from '../assets/sounds/switch-on.mp3'
import useSound from 'use-sound';


function Counter({ initialTime, onTimerEnd, clearOnEnd, setInputValue }) {
  const [time, setTime] = useState(initialTime);
  const inputRef = useRef(null);

  useEffect(() => {
    let timer;
    if (time > 0) {
      timer = setTimeout(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      onTimerEnd();
      if (clearOnEnd) {
        setInputValue("");
      }
      
    }
    return () => {
      clearTimeout(timer);
    };
  }, [time]);


  const [play] = useSound(
    soundfile,
      { volume: 1 }
    );

  useEffect(() => {
    if (time <= 10) {
        play();
  document.getElementById("count").style.color = "red";
    }
  }, [time]);

  return <div id="count">Time left : {time} secondes</div>;
}

export default Counter;