import { combineReducers } from 'redux'
import HomePageReducer from './Components/HomePage/HomePageReducer'
import SyncReducer from './Components/Sync/SyncReducer'
import FormReducer from './Components/Form/FormReducer'
import ResultReducer from './Components/Result/ResultReducer'

export default combineReducers({
  HomePage: HomePageReducer,
  Form: FormReducer,
  Sync: SyncReducer,
  Result: ResultReducer
})
