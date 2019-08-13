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

// let obj1 = { a: 1, b: 2 }
// let obj2 = { b: 3, c: 4 };

//merge: data in obj 2 takes precedence over obj 1
//replace: data in obj2 is all that exists, obj is completely overwritten
