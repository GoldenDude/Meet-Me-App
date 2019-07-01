import moment from 'moment'
import PropTypes from 'prop-types'
import styles from '../../../styles'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import SyncActions from '../Sync/SyncActions'
import RNCalendarEvents from 'react-native-calendar-events'
import { View, TouchableOpacity, Image, ScrollView, Text } from 'react-native'
import { Portal, Dialog, Button, Provider, Snackbar } from 'react-native-paper'

const mapStateToProps = ({ Form, Result }) => {
  return {
    duration: Form.duration,
    contact: Form.contact,
    dayPicked: Result.dayPicked
  }
}

class DayView extends Component {
  constructor(props) {
    super(props)
    this.picked = {}
    this.success = false

    this.state = {
      dialogVisible: false,
      snackVisible: false,
      morning: false,
      noon: false,
      evening: false,
      night: false
    }

    this.eachFree = this.eachFree.bind(this)
    this.addToCalendar = this.addToCalendar.bind(this)
    this.handleEventAdded = this.handleEventAdded.bind(this)
    this.handleHideDialog = this.handleHideDialog.bind(this)
  }

  componentDidMount() {
    const { dayPicked } = this.props
    let starting = 0
    dayPicked.freeTime.map(free => {
      const start = new Date(free.start)
      if (start.getUTCHours() >= 6 && start.getUTCHours() < 12) {
        starting = 6
      }
      if (start.getUTCHours() >= 12 && start.getUTCHours() < 17) {
        starting = 12
      }
      if (start.getUTCHours() >= 17 && start.getUTCHours() < 20) {
        starting = 17
      }
      if (start.getUTCHours() >= 20 && start.getUTCHours() < 24) {
        starting = 20
      }
      switch (starting) {
        case 6:
          if (this.state.morning === false) this.setState({ morning: true })
          break
        case 12:
          if (this.state.noon === false) this.setState({ noon: true })
          break
        case 17:
          if (this.state.evening === false) this.setState({ evening: true })
          break
        case 20:
          if (this.state.night === false) this.setState({ night: true })
          break
      }

      return null
    })
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

  handleEventAdded() {
    const { navigation } = this.props
    this.setState({ snackVisible: false })
    this.success && navigation.navigate('HomePage')
  }
  handleHideDialog() {
    this.setState({ dialogVisible: false })
  }

  async addToCalendar(eventType) {
    const { contact } = this.props
    const start = moment(this.picked.start).subtract(3, 'hours')
    const finish = moment(this.picked.finish).subtract(3, 'hours')
    const isoStart = new Date(start).toISOString()
    const isoFinish = new Date(finish).toISOString()

    try {
      await RNCalendarEvents.saveEvent(eventType, {
        startDate: isoStart,
        endDate: isoFinish,
        description: `With: ${contact.name}, ${contact.phone}`
      })
      this.success = true
      this.setState({ snackVisible: true })
      this.handleHideDialog()
    } catch (err) {
      this.success = false
      this.setState({ snackVisible: true })
      this.handleHideDialog()
    }
  }

  eachFree(free, starting, to, i) {
    const start = new Date(free.start)
    const finish = new Date(free.finish)
    const startHour = start.getUTCHours() === 0 ? 24 : start.getUTCHours()

    if (startHour < starting || startHour >= to) {
      return
    }

    const from = `${start.getUTCHours() < 10 ? `0${start.getUTCHours()}` : start.getUTCHours()}:${
      start.getMinutes() < 10 ? `0${start.getMinutes()}` : start.getMinutes()
    }`
    const untill = `${
      finish.getUTCHours() < 10 ? `0${finish.getUTCHours()}` : finish.getUTCHours()
    }:${finish.getMinutes() < 10 ? `0${finish.getMinutes()}` : finish.getMinutes()}`

    return (
      <View key={`${free.start}${i}`} style={styles.timeButton}>
        <Button
          onPress={() => {
            this.picked = free
            this.setState({ dialogVisible: true })
          }}
          mode="outlined"
        >
          From: {from}, Untill: {untill}
        </Button>
      </View>
    )
  }

  render() {
    const { dayPicked, contact, duration } = this.props
    const start = new Date(this.picked.start)
    const finish = new Date(this.picked.finish)
    const eventTypes = [
      'Buisness Meeting',
      'Fine Dinning',
      'Watch a Movie',
      'Crack a Cold One With The Boyz'
    ]
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    start.setHours(start.getHours())
    finish.setHours(finish.getHours())
    const from = `${start.getUTCHours() < 10 ? `0${start.getUTCHours()}` : start.getUTCHours()}:${
      start.getMinutes() < 10 ? `0${start.getMinutes()}` : start.getMinutes()
    }`
    const untill = `${
      finish.getUTCHours() < 10 ? `0${finish.getUTCHours()}` : finish.getUTCHours()
    }:${finish.getMinutes() < 10 ? `0${finish.getMinutes()}` : finish.getMinutes()}`
    const date = `${days[start.getDay()]}, ${
      start.getDate() < 10 ? `0${start.getDate()}` : start.getDate()
    }/${
      start.getMonth() < 10 ? `0${start.getMonth() + 1}` : start.getMonth() + 1
    }/${start.getFullYear()}`

    const style = this.success ? styles.snackSuccess : styles.snackFail

    return (
      <View style={styles.HomePage}>
        <ScrollView>
          <View style={styles.minWidth}>
            <Image style={styles.timePhoto} source={require('../../Images/morning.png')} />
            {this.state.morning ? (
              dayPicked.freeTime.map((free, i) => this.eachFree(free, 6, 12, i))
            ) : (
              <Text>NO MATCH FOUND :(</Text>
            )}
            <Image style={styles.timePhoto} source={require('../../Images/noon.png')} />
            {this.state.noon ? (
              dayPicked.freeTime.map((free, i) => this.eachFree(free, 12, 17, i))
            ) : (
              <Text>NO MATCH FOUND :(</Text>
            )}

            <Image style={styles.timePhoto} source={require('../../Images/evening.png')} />
            {this.state.evening ? (
              dayPicked.freeTime.map((free, i) => this.eachFree(free, 17, 20, i))
            ) : (
              <Text>NO MATCH FOUND :(</Text>
            )}

            <Image style={styles.timePhoto} source={require('../../Images/night.png')} />
            {this.state.night ? (
              dayPicked.freeTime.map((free, i) => this.eachFree(free, 20, 24, i))
            ) : (
              <Text>NO MATCH FOUND :(</Text>
            )}
          </View>
        </ScrollView>
        <Provider>
          <Portal>
            <Dialog visible={this.state.dialogVisible} onDismiss={this.handleHideDialog}>
              <Dialog.Title>Add to Calendar?</Dialog.Title>
              <Dialog.Content>
                <Text>{eventTypes[duration - 1]}</Text>
                <Text>{date}</Text>
                <Text>
                  {from} - {untill}
                </Text>
                <Text>With {contact.name}</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={async () => await this.addToCalendar(eventTypes[duration - 1])}>
                  Confirm!
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </Provider>

        <Snackbar
          visible={this.state.snackVisible}
          duration={1500}
          onDismiss={this.handleEventAdded}
          style={style}
        >
          <Text style={styles.smallText}>
            {this.success ? 'Horray! Event added :)' : 'Failed to add event... Sorry :('}
          </Text>
        </Snackbar>
      </View>
    )
  }
}

DayView.propTypes = {
  duration: PropTypes.number,
  contact: PropTypes.shape({ name: PropTypes.string, phone: PropTypes.string }),
  dayPicked: PropTypes.object,
  navigation: PropTypes.object
}

export default connect(
  mapStateToProps,
  { ...SyncActions }
)(DayView)
