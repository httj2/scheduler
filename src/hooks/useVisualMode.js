import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
// setState is async
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory(history => [...history])
    } else {
      setHistory(history => [...history, mode]);
    }
    setMode(newMode)
  }
  const back = () => {

    if (history.length > 1) {
       setMode(history.pop())
    }
  }

  return { mode, transition, back};

} 

// take in an initial mode
// set the mode state with the initial mode provided
// return an object with a property mode

// Create a transition function within useVisualMode that will take in a new mode and update the mode state with the new value.

// We call transition(SECOND) but nothing changes.
// We call back() and it doesn't do anything either.
// We expect that mode is FIRST, but it never changed.