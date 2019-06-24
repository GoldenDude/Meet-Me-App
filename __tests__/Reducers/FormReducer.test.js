import moment from 'moment'
import thunk from 'redux-thunk'
import rootReducer from '../../src/rootReducer'
import { applyMiddleware, createStore, compose } from 'redux'
import FormActions from '../../src/Components/Form/FormActions'
import FormReducer from '../../src/Components/Form/FormReducer'

const middleware = applyMiddleware(thunk)
const composedEnhancers = compose(middleware)
const initialState = {}
describe('FormReducer functionality', () => {
  test('initial state', () => {
    expect(FormReducer(initialState, 'ACTION_DOES_NOT_EXIST')).toEqual(initialState)
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().Form).toHaveProperty('contact', {})
    expect(store.getState().Form).toHaveProperty('startDate', moment().startOf('day'))
    expect(store.getState().Form).toHaveProperty(
      'minHour',
      moment()
        .startOf('day')
        .set('hours', 8)
    )
    expect(store.getState().Form).toHaveProperty(
      'maxHour',
      moment()
        .startOf('day')
        .set('hours', 22)
    )
    expect(store.getState().Form).toHaveProperty('freeTime', [])
    expect(store.getState().Form).toHaveProperty('duration', 1)
    expect(store.getState().Form).toHaveProperty('missingContact', false)
    expect(store.getState().Form).toHaveProperty('loading', false)
    expect(store.getState().Form).toHaveProperty('success', false)
    expect(store.getState().Form).toHaveProperty('visible', false)
    expect(store.getState().Form).toHaveProperty('missingPhone', false)
  })

  test('contact changes correctly', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().Form.contact).toEqual({})
    store.dispatch(FormActions.handleSetContact({ test: 'test' }))
    expect(store.getState().Form.contact).toEqual({ test: 'test' })
  })
  test('startDate changes correctly', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().Form.startDate).toEqual(moment().startOf('day'))
    store.dispatch(
      FormActions.handleSetStartDate(
        moment()
          .startOf('day')
          .add(1, 'day')
      )
    )
    expect(store.getState().Form.startDate).toEqual(
      moment()
        .startOf('day')
        .add(1, 'day')
    )
  })
  test('minHour changes correctly', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().Form.minHour).toEqual(
      moment()
        .startOf('day')
        .set('hours', 8)
    )
    store.dispatch(
      FormActions.handleSetMinHour(
        moment()
          .startOf('day')
          .set('hours', 15)
      )
    )
    expect(store.getState().Form.minHour).toEqual(
      moment()
        .startOf('day')
        .set('hours', 15)
    )
  })
  test('maxHour changes correctly', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().Form.maxHour).toEqual(
      moment()
        .startOf('day')
        .set('hours', 22)
    )
    store.dispatch(
      FormActions.handleSetMaxHour(
        moment()
          .startOf('day')
          .set('hours', 23)
      )
    )
    expect(store.getState().Form.maxHour).toEqual(
      moment()
        .startOf('day')
        .set('hours', 23)
    )
  })
  test('freeTime changes correctly', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().Form.freeTime).toEqual([])
    store.dispatch(FormActions.handleFormSubmit(['test1', 'test2']))
    expect(store.getState().Form.freeTime).toEqual([])
  })
  test('duration changes correctly', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().Form.duration).toEqual(1)
    store.dispatch(FormActions.handleSetDuration(2))
    expect(store.getState().Form.duration).toEqual(2)
  })
  test('missingContact changes correctly', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().Form.missingContact).toEqual(false)
    store.dispatch(FormActions.handleSetMissingContact(true))
    expect(store.getState().Form.missingContact).toEqual(true)
    store.dispatch(FormActions.handleSetMissingContact(false))
    expect(store.getState().Form.missingContact).toEqual(false)
  })
  test('loading changes correctly', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().Form.loading).toEqual(false)
    store.dispatch(FormActions.setLoading(true))
    expect(store.getState().Form.loading).toEqual(true)
    store.dispatch(FormActions.setLoading(false))
    expect(store.getState().Form.loading).toEqual(false)
  })
  test('success changes correctly', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().Form.success).toEqual(false)
    store.dispatch(FormActions.setSuccess(true))
    expect(store.getState().Form.success).toEqual(true)
    store.dispatch(FormActions.setSuccess(false))
    expect(store.getState().Form.success).toEqual(false)
  })
  test('visible changes correctly', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().Form.visible).toEqual(false)
    store.dispatch(FormActions.handleSetVisible(true))
    expect(store.getState().Form.visible).toEqual(true)
    store.dispatch(FormActions.handleSetVisible(false))
    expect(store.getState().Form.visible).toEqual(false)
  })
  test('missingPhone changes correctly', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(store.getState().Form.missingPhone).toEqual(false)
    store.dispatch(FormActions.handleSetMissingPhone(true))
    expect(store.getState().Form.missingPhone).toEqual(true)
    store.dispatch(FormActions.handleSetMissingPhone(false))
    expect(store.getState().Form.missingPhone).toEqual(false)
  })
})
