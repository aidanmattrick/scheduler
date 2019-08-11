import { useState, useEffect } from "react";


export default function useVisualMode(initialMode) {
  let result = {};
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);
  result.mode = mode;



  const back = function back() {
    if (history.length > 1) {
      history.pop()
      setHistory(history);
    }
    setMode(history[history.length - 1]);
    //setting the present to the last item in mode history
  };

  const transition = function transition(newMode, replace = false) {
    if (replace) history.pop();
    history.push(newMode);
    setHistory(history);
    setMode(history[history.length - 1]);
    //setting the present to the last item in mode history
  }

  result.back = back.bind(result);
  result.transition = transition.bind(result);
  //stores a copy of the function into result
  //Where "this" in the function is always result
  return result;
};
