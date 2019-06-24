import { AUTH, ADD_PHONE_NUM, SET_GRANTED } from './HomePageActionTypes'
import AsyncStorage from '@react-native-community/async-storage'

const setAuth = isAuth => ({ type: AUTH, data: isAuth })
const addPhoneNum = phoneNum => ({ type: ADD_PHONE_NUM, data: phoneNum })
const setGranted = granted => ({ type: SET_GRANTED, data: granted })

const handleAuth = isAuth => async dispatch => {
  dispatch(setAuth(isAuth))
  await AsyncStorage.setItem(`isAuth`, isAuth)
}
const handleAddPhone = phoneNum => async dispatch => {
  dispatch(addPhoneNum(phoneNum))
  await AsyncStorage.setItem('phoneNum', phoneNum)
}
const handleSetGranted = granted => async dispatch => {
  dispatch(setGranted(granted))
}

export default {
  setAuth,
  addPhoneNum,
  setGranted,
  handleAuth,
  handleAddPhone,
  handleSetGranted
}
