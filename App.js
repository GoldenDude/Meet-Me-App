import Result from './src/Components/Result/Result'
import Sync from './src/Components/Sync/Sync'
import HomePage from './src/Components/HomePage/HomePage.android'
import DayView from './src/Components/Result/DayView'
import { createStackNavigator, createAppContainer } from 'react-navigation'
// // had to disable this one in order that the app wont crash
// // eslint-disable-next-line no-console
// console.reportErrorsAsExceptions = false
const MainNavigator = createStackNavigator(
  {
    HomePage: { screen: HomePage },
    Result: { screen: Result },
    Sync: { screen: Sync },
    DayView: { screen: DayView }
  },
  {
    initialRouteName: 'HomePage'
  }
)

const App = createAppContainer(MainNavigator)

export default App
