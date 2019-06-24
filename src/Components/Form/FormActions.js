import {
  HANDLE_CONTACT,
  HANDLE_MIN_HOUR,
  HANDLE_MAX_HOUR,
  HANDLE_DURATION,
  HANDLE_START_DATE,
  HANDLE_FREE_TIME,
  HANDLE_IS_MISSING,
  HANDLE_LOADING,
  HANDLE_SUCCESS,
  HANDLE_VISIBLE,
  HANDLE_PHONE_MISSING
} from './FormActionTypes'
const setContact = contact => ({ type: HANDLE_CONTACT, data: contact })
const setMinHour = date => ({ type: HANDLE_MIN_HOUR, data: date })
const setMaxHour = date => ({ type: HANDLE_MAX_HOUR, data: date })
const setDuration = duration => ({ type: HANDLE_DURATION, data: duration })
const setStartDate = date => ({ type: HANDLE_START_DATE, data: date })
const setFreeTime = freeTime => ({ type: HANDLE_FREE_TIME, data: freeTime })
const setMissingContact = isMissing => ({ type: HANDLE_IS_MISSING, data: isMissing })
const setLoading = isMissing => ({ type: HANDLE_LOADING, data: isMissing })
const setSuccess = success => ({ type: HANDLE_SUCCESS, data: success })
const setVisible = visible => ({ type: HANDLE_VISIBLE, data: visible })
const setMissingPhone = isMissing => ({ type: HANDLE_PHONE_MISSING, data: isMissing })

const handleSetContact = contact => async dispatch => {
  dispatch(setContact(contact))
}
const handleSetMinHour = date => async dispatch => {
  dispatch(setMinHour(date))
}
const handleSetStartDate = date => async dispatch => {
  dispatch(setStartDate(date))
}
const handleSetMaxHour = date => async dispatch => {
  dispatch(setMaxHour(date))
}
const handleSetDuration = duration => async dispatch => {
  dispatch(setDuration(duration))
}
const handleFormSubmit = formData => async dispatch => {
  dispatch(setLoading(true))
  try {
    const res = await fetch('https://meet-me-mobile.herokuapp.com/userEvents', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const json = await res.json()
    if (json.result === 'Failure') {
      dispatch(setSuccess(false))
      dispatch(setLoading(false))
      return false
    }
    dispatch(setSuccess(true))
    dispatch(setLoading(false))
    dispatch(setFreeTime(json))
    return true
  } catch {
    dispatch(setSuccess(false))
    dispatch(setLoading(false))
    return false
  }
}
const handleSetMissingContact = isMissing => async dispatch => {
  dispatch(setMissingContact(isMissing))
}
const handleSetMissingPhone = isMissing => async dispatch => {
  dispatch(setMissingPhone(isMissing))
}
const handleSetVisible = visible => async dispatch => {
  dispatch(setVisible(visible))
}

export default {
  setContact,
  setMinHour,
  setMaxHour,
  setDuration,
  setStartDate,
  setFreeTime,
  setMissingContact,
  setLoading,
  setSuccess,
  setVisible,
  setMissingPhone,
  handleSetContact,
  handleSetMinHour,
  handleSetMaxHour,
  handleSetDuration,
  handleSetStartDate,
  handleFormSubmit,
  handleSetMissingContact,
  handleSetVisible,
  handleSetMissingPhone
}
