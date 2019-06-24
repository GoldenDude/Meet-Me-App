import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../../src/rootReducer'
import HomePageActions from '../../src/Components/HomePage/HomePageActions'
import HomePageReducer from '../../src/Components/HomePage/HomePageReducer'

const middleware = applyMiddleware(thunk)
const composedEnhancers = compose(middleware)
const initialState = {}

describe('HomePageReducer functionality', () => {
  test('initial state', () => {
    expect(HomePageReducer(initialState, 'ACTION_DOES_NOT_EXIST')).toEqual(initialState)
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().HomePage).toHaveProperty('isAuth', '')
    expect(store.getState().HomePage).toHaveProperty('phoneNum', '')
    expect(store.getState().HomePage).toHaveProperty('granted', undefined)
  })

  test('isAuth changes correctly', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().HomePage.isAuth).toEqual('')
    store.dispatch(HomePageActions.handleAuth('authorized'))
    expect(store.getState().HomePage.isAuth).toEqual('authorized')
  })
  test('phoneNum changes correctly', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().HomePage.phoneNum).toEqual('')
    store.dispatch(HomePageActions.handleAddPhone('0524674722'))
    expect(store.getState().HomePage.phoneNum).toEqual('0524674722')
  })
  test('granted changes correctly', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().HomePage.granted).toEqual(undefined)
    store.dispatch(HomePageActions.handleSetGranted(true))
    expect(store.getState().HomePage.granted).toEqual(true)
    store.dispatch(HomePageActions.handleSetGranted(false))
    expect(store.getState().HomePage.granted).toEqual(false)
  })
})
