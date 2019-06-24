import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../../src/rootReducer'
import SyncActions from '../../src/Components/Sync/SyncActions'
import SyncReducer from '../../src/Components/Sync/SyncReducer'

const middleware = applyMiddleware(thunk)
const composedEnhancers = compose(middleware)
const initialState = {}

describe('SyncReducer functionality', () => {
  test('initial state', () => {
    expect(SyncReducer(initialState, 'ACTION_DOES_NOT_EXIST')).toEqual(initialState)
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().Sync).toHaveProperty('success', false)
    expect(store.getState().Sync).toHaveProperty('visible', false)
    expect(store.getState().Sync).toHaveProperty('isLoading', false)
    expect(store.getState().Sync).toHaveProperty('events', [])
    expect(store.getState().Sync).toHaveProperty('missingPhone', false)
  })

  test('success changes correctly', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().Sync.success).toEqual(false)
    store.dispatch(SyncActions.setSuccess(true))
    expect(store.getState().Sync.success).toEqual(true)
  })
  test('visible changes correctly', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().Sync.visible).toEqual(false)
    store.dispatch(SyncActions.handleSetVisiable(true))
    expect(store.getState().Sync.visible).toEqual(true)
    store.dispatch(SyncActions.handleSetVisiable(false))
    expect(store.getState().Sync.visible).toEqual(false)
  })
  test('isLoading changes correctly', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().Sync.isLoading).toEqual(false)
    store.dispatch(SyncActions.handleSetLoading(true))
    expect(store.getState().Sync.isLoading).toEqual(true)
    store.dispatch(SyncActions.handleSetLoading(false))
    expect(store.getState().Sync.isLoading).toEqual(false)
  })
  test('events changes correctly', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().Sync.events).toEqual([])
    store.dispatch(SyncActions.handleAddEvents(['test', 'test2']))
    expect(store.getState().Sync.events).toEqual([])
    store.dispatch(SyncActions.addEvents(['test', 'test2']))
    expect(store.getState().Sync.events).toEqual(['test', 'test2'])
  })
  test('missingPhone changes correctly', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().Sync.missingPhone).toEqual(false)
    store.dispatch(SyncActions.handleSetMissingPhone(true))
    expect(store.getState().Sync.missingPhone).toEqual(true)
    store.dispatch(SyncActions.handleSetMissingPhone(false))
    expect(store.getState().Sync.missingPhone).toEqual(false)
  })
})
