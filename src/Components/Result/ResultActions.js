import HANDLE_DAY_PICKED from './ResultActionTypes'
const setDay = dayPicked => ({ type: HANDLE_DAY_PICKED, data: dayPicked })

const handleSetDay = dayPicked => async dispatch => {
  dispatch(setDay(dayPicked))
}
export default {
  setDay,
  handleSetDay
}
