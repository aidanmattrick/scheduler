import _ from 'lodash';


export function setSubState(state, setState, subState) {
  return (cb) => {
    const data = cb(state[subState], state);
    let newState = _.cloneDeep(state);
    _.set(newState, subState, _.cloneDeep(data));
    setState(newState);
    return newState;
  }
}

export function mergeSubState(state, setState, subState) {
  return (cb) => {
    const data = cb(state[subState], state);
    const newState = _.merge({}, state, { [subState]: data });
    setState(newState);
    return newState;
  }
}

// export function getSubState(state, subState) {
//   return () => state[subState];
// }