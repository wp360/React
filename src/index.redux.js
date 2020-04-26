const ADD = 'add'
const REDUCE = 'reduce'
// reducer
export function counter(state = 10, action) {
  // console.log(state)
  switch (action.type) {
    case ADD:
      return state + 1
    case REDUCE:
      return state - 1
    default:
      return state
  }
}
// action creator
export function add() {
  return {
    type: ADD
  }
}

export function reduce() {
  return {
    type: REDUCE
  }
}

export function addAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}