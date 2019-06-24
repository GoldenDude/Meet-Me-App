import HANDLE_DAY_PICKED from './ResultActionTypes'

const initialState = {
  dayPicked: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_DAY_PICKED:
      return {
        ...state,
        dayPicked: action.data
      }
    default:
      return state
  }
}
