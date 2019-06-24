import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../../src/rootReducer'
import ResultActions from '../../src/Components/Result/ResultActions'
import ResultReducer from '../../src/Components/Result/ResultReducer'

const middleware = applyMiddleware(thunk)
const composedEnhancers = compose(middleware)
const initialState = {}

describe('ResultReducer functionality', () => {
  test('initial state', () => {
    expect(ResultReducer(initialState, 'ACTION_DOES_NOT_EXIST')).toEqual(initialState)
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().Result).toHaveProperty('dayPicked', {})
  })

  test('dayPicked changes correctly', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().Result.dayPicked).toEqual({})
    store.dispatch(ResultActions.handleSetDay({ day: 'test' }))
    expect(store.getState().Result.dayPicked).toEqual({ day: 'test' })
  })
})
