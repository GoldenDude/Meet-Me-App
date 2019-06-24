import { StyleSheet, Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  button: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#222222'
  },
  smallText: {
    alignSelf: 'center',
    fontSize: 12,
    color: '#ffffff'
  },
  picker: {
    height: 30,
    width: 300,
    marginBottom: 15
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  HomePage: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e7e7e7',
    minHeight: height,
    minWidth: width
  },
  bordered: {
    borderBottomColor: '#6441a5',
    borderBottomWidth: 1,
    padding: 5,
    marginTop: 10
  },
  formItem: {
    marginTop: 30
  },
  missingCont: {
    color: '#ec5c6a',
    fontSize: 10,
    fontWeight: 'bold'
  },
  duration: {
    fontSize: 12,
    marginTop: 10
  },
  sync: {
    height: 30,
    width: 30,
    marginRight: 10
  },
  logo: {
    height: 60,
    width: 85,
    left: 150
  },
  logo2: {
    height: 60,
    width: 85,
    left: 95
  },
  snackSuccess: {
    backgroundColor: '#4bb543',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 25
  },
  snackFail: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#ee4238',
    marginBottom: 25
  },
  syncText: {
    fontSize: 18
  },
  title: {
    fontWeight: 'bold'
  },
  scrollList: {
    flexGrow: 1
  },
  listSize: {
    minHeight: height
  },
  input: {
    height: 65
  },
  syncInput: {
    height: 65,
    width: 150
  },
  timePhoto: {
    width: width - 30,
    marginTop: 15
  },
  timeButton: {
    marginTop: 10,
    width: width - 30
  },
  minWidth: {
    alignItems: 'center',
    minWidth: width,
    marginBottom: 25
  }
})

export default styles
