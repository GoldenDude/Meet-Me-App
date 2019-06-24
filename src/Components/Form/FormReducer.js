import moment from 'moment'
import {
  HANDLE_CONTACT,
  HANDLE_START_DATE,
  HANDLE_MIN_HOUR,
  HANDLE_MAX_HOUR,
  HANDLE_DURATION,
  HANDLE_FREE_TIME,
  HANDLE_IS_MISSING,
  HANDLE_LOADING,
  HANDLE_SUCCESS,
  HANDLE_VISIBLE,
  HANDLE_PHONE_MISSING
} from './FormActionTypes'

const initialState = {
  contact: {},
  startDate: moment().startOf('day'),
  minHour: moment()
    .startOf('day')
    .set('hours', 8),
  maxHour: moment()
    .startOf('day')
    .set('hours', 22),
  freeTime: [],
  duration: 1,
  missingContact: false,
  loading: false,
  success: false,
  visible: false,
  missingPhone: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_CONTACT:
      return {
        ...state,
        contact: action.data,
        missingContact: false
      }
    case HANDLE_START_DATE:
      return {
        ...state,
        startDate: action.data
      }
    case HANDLE_MIN_HOUR:
      return {
        ...state,
        minHour: action.data
      }
    case HANDLE_MAX_HOUR:
      return {
        ...state,
        maxHour: action.data
      }
    case HANDLE_DURATION:
      return {
        ...state,
        duration: action.data
      }
    case HANDLE_FREE_TIME:
      return {
        ...state,
        freeTime: action.data
      }
    case HANDLE_IS_MISSING:
      return {
        ...state,
        missingContact: action.data
      }
    case HANDLE_LOADING:
      return {
        ...state,
        loading: action.data
      }
    case HANDLE_SUCCESS:
      return {
        ...state,
        success: action.data,
        visible: true
      }
    case HANDLE_VISIBLE:
      return {
        ...state,
        visible: action.data
      }
    case HANDLE_PHONE_MISSING:
      return {
        ...state,
        missingPhone: action.data
      }
    default:
      return state
  }
}
