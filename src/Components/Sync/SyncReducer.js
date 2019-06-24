import {
  HANDLE_SYNC_SUCCESS,
  ADD_EVENTS,
  HANDLE_SYNC_VISIBLE,
  HANDLE_SYNC_LOADING,
  HANDLE_SYNC_MISSING_PHONE
} from './SyncActionTypes'

const initialState = {
  success: false,
  visible: false,
  isLoading: false,
  events: [],
  missingPhone: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_SYNC_SUCCESS:
      return {
        ...state,
        success: action.data
      }
    case HANDLE_SYNC_LOADING:
      return {
        ...state,
        isLoading: action.data
      }
    case ADD_EVENTS:
      return {
        ...state,
        events: action.data
      }
    case HANDLE_SYNC_VISIBLE:
      return {
        ...state,
        visible: action.data
      }
    case HANDLE_SYNC_MISSING_PHONE:
      return {
        ...state,
        missingPhone: action.data
      }
    default:
      return state
  }
}
