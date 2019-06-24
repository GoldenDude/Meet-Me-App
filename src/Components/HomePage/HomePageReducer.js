import { AUTH, ADD_PHONE_NUM, SET_GRANTED } from './HomePageActionTypes'

const initialState = {
  isAuth: '',
  phoneNum: '',
  granted: undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        isAuth: action.data
      }
    case ADD_PHONE_NUM:
      return {
        ...state,
        phoneNum: action.data
      }
    case SET_GRANTED:
      return {
        ...state,
        granted: action.data
      }
    default:
      return state
  }
}
