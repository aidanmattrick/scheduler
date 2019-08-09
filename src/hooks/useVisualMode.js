import { useState, useEffect } from "react";


export default function useVisualMode(initialMode) {
  let result = {};
  const [mode, setMode] = useState(initialMode);
  result.mode = mode;

  let modeHistory = [];
  if (initialMode) modeHistory.push(initialMode);
  
  const back = function back() {
    if (modeHistory.length > 1) modeHistory.pop();
    setMode(modeHistory[modeHistory.length - 1]);
    //setting the present to the last item in mode history
  };

  const transition = function transition(newMode, replace = false) {
    if (replace) {
      modeHistory[modeHistory.length - 1] = newMode;
    } else {
      modeHistory.push(newMode);
    }
    setMode(modeHistory[modeHistory.length - 1]);
    //setting the present to the last item in mode history
  }

  result.back = back.bind(result);
  result.transition = transition.bind(result);
  //stores a copy of the function into result
  //Where "this" in the function is always result
  return result;
}

  
//   const [mode, setMode] = useState("");

//   useEffect(() => {
//     setMode(arg);
//     return(() => {
//     return {mode};
//     });
//   },[arg, mode]);

// }