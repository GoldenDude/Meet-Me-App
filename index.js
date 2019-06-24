import App from './App'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import rootReducer from './src/rootReducer.js'
import { applyMiddleware, createStore, compose } from 'redux'

const middleware = applyMiddleware(thunk)
const composedEnhancers = compose(middleware)
const initialState = {}
const store = createStore(rootReducer, initialState, composedEnhancers)

class Application extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

AppRegistry.registerComponent(appName, () => Application)
