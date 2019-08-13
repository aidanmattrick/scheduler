import _ from 'lodash';


export function newReplacedSubState(state, subState, cb) {
  const data = cb(state[subState], state);
  let newState = _.cloneDeep(state);
  _.set(newState, subState, _.cloneDeep(data));
  return newState;
}

export function newMergedSubState(state, subState, cb) {
  const data = cb(state[subState], state);
  const newState = _.merge({}, state, { [subState]: data });
  return newState;
}

// export function getSubState(state, subState) {
//   return () => state[subState];
// }