import PropTypes from 'prop-types'
import styles from '../../../styles'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import ResultActions from './ResultActions'
import SyncActions from '../Sync/SyncActions'
import { Button, Title } from 'react-native-paper'
import { View, TouchableOpacity, Image, ScrollView } from 'react-native'

const mapStateToProps = ({ Form }) => {
  return {
    freeTime: Form.freeTime
  }
}

class Result extends Component {
  constructor(props) {
    super(props)
    this.picked = {}

    this.eachDay = this.eachDay.bind(this)
    this.handleDayPicked = this.handleDayPicked.bind(this)
    this.handleHideDialog = this.handleHideDialog.bind(this)
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Image source={require('../../Images/logo3.png')} style={styles.logo2} />,
    headerStyle: {
      backgroundColor: '#6441a5',
      height: 60
    },
    headerTintColor: '#FFFFFF',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('Sync')}>
        <Image source={require('../../Images/syncw.png')} style={styles.sync} />
      </TouchableOpacity>
    )
  })

  handleHideDialog() {
    this.setState({ dialogVisible: false })
  }

  handleDayPicked(dayPicked) {
    const { navigation, handleSetDay } = this.props
    handleSetDay(dayPicked)
    navigation.navigate('DayView')
  }

  eachDay(eachDay, i) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const day = new Date(eachDay.day)
    const stringDate = ` ${days[day.getDay()]}, ${
      day.getDate() < 10 ? `0${day.getDate()}` : day.getDate()
    }/${day.getMonth() < 10 ? `0${day.getMonth() + 1}` : day.getMonth() + 1}/${day.getFullYear()}`
    return eachDay.freeTime.length ? (
      <Button
        mode={'contained'}
        style={styles.timeButton}
        key={`Button${i}`}
        onPress={() => this.handleDayPicked(eachDay)}
      >
        {stringDate}
      </Button>
    ) : null
  }

  render() {
    const { freeTime } = this.props
    return (
      <View style={styles.HomePage}>
        <Title>Pick a Day To See Available Options</Title>
        <ScrollView>{freeTime.map(this.eachDay)}</ScrollView>
      </View>
    )
  }
}

Result.propTypes = {
  freeTime: PropTypes.array,
  contact: PropTypes.shape({ name: PropTypes.string, phone: PropTypes.string }),
  navigation: PropTypes.object,
  handleSetDay: PropTypes.func
}

export default connect(
  mapStateToProps,
  { ...SyncActions, ...ResultActions }
)(Result)
