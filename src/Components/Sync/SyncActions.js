import {
  HANDLE_SYNC_SUCCESS,
  ADD_EVENTS,
  HANDLE_SYNC_VISIBLE,
  HANDLE_SYNC_LOADING,
  HANDLE_SYNC_MISSING_PHONE
} from './SyncActionTypes'
import RNCalendarEvents from 'react-native-calendar-events'
import moment from 'moment'

const setSuccess = success => ({ type: HANDLE_SYNC_SUCCESS, data: success })
const addEvents = events => ({ type: ADD_EVENTS, data: events })
const SetVisiable = visible => ({ type: HANDLE_SYNC_VISIBLE, data: visible })
const setLoading = loading => ({ type: HANDLE_SYNC_LOADING, data: loading })
const setMissingPhone = isMissing => ({ type: HANDLE_SYNC_MISSING_PHONE, data: isMissing })

const handleAddEvents = phoneNum => async dispatch => {
  dispatch(setLoading(true))
  await RNCalendarEvents.findCalendars().then(calendars => {
    const googleCal = []
    calendars.forEach(calendar => {
      if (calendar.allowsModifications === true && calendar.isPrimary === true) {
        googleCal.push(calendar.id)
      }
    })
    if (googleCal.length > 0) {
      RNCalendarEvents.fetchAllEvents(
        moment()
          .startOf('day')
          .toISOString(),
        moment()
          .startOf('day')
          .add(1, 'month')
          .toISOString(),
        googleCal
      ).then(async events => {
        dispatch(addEvents(events))
        const body = {
          id: phoneNum,
          events: []
        }

        events.forEach(event => {
          body.events.push({
            eventId: event.id,
            title: event.title,
            description: event.description,
            location: event.location,
            startDate: event.startDate,
            endDate: event.endDate
          })
        })
        await fetch('https://meet-me-mobile.herokuapp.com/addUser', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
          .then(res => res.json())
          .then(json => {
            if (json.result !== 'Success') {
              dispatch(setSuccess(false))
              dispatch(setLoading(false))
            } else {
              dispatch(setSuccess(true))
              dispatch(SetVisiable(true))
              dispatch(setLoading(false))
            }
          })
          .catch(() => {
            dispatch(setSuccess(false))
            dispatch(setLoading(false))
          })
      })
    }
  })
}
const handleSetVisiable = visible => async dispatch => {
  dispatch(SetVisiable(visible))
}
const handleSetMissingPhone = isMissing => async dispatch => {
  dispatch(setMissingPhone(isMissing))
}
const handleSetLoading = loading => async dispatch => {
  dispatch(setLoading(loading))
}

export default {
  setSuccess,
  addEvents,
  SetVisiable,
  setLoading,
  setMissingPhone,
  handleAddEvents,
  handleSetVisiable,
  handleSetLoading,
  handleSetMissingPhone
}
