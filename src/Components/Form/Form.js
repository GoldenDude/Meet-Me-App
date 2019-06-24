import moment from 'moment'
import PropTypes from 'prop-types'
import styles from '../../../styles'
import { connect } from 'react-redux'
import FormActions from './FormActions'
import React, { Component } from 'react'
import HomePageActions from '../HomePage/HomePageActions'
import { View, TouchableOpacity, Text } from 'react-native'
import ContactsWrapper from 'react-native-contacts-wrapper'
import DateTimePicker from 'react-native-modal-datetime-picker'
import AsyncStorage from '@react-native-community/async-storage'
import { Button, Snackbar, List, TextInput, HelperText } from 'react-native-paper'

const mapStateToProps = ({ HomePage, Form }) => {
  return {
    phoneNum: HomePage.phoneNum,
    granted: HomePage.granted,
    contact: Form.contact,
    duration: Form.duration,
    minHour: Form.minHour,
    maxHour: Form.maxHour,
    startDate: Form.startDate,
    freeTime: Form.freeTime,
    missingContact: Form.missingContact,
    missingPhone: Form.missingPhone,
    loading: Form.loading,
    success: Form.success,
    visible: Form.visible
  }
}

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDatePickerVisible: false,
      isMinTimePickerVisible: false,
      isMaxTimePickerVisible: false,
      missingContact: false,
      expanded: false,
      phoneNum: ''
    }
    this.handleExpended = this.handleExpended.bind(this)
    this.handleDatePicked = this.handleDatePicked.bind(this)
    this.handleSetPhoneNumber = this.handleSetPhoneNumber.bind(this)
    this.handleFormSubmitFunc = this.handleFormSubmitFunc.bind(this)
    this.handleShowDatePicker = this.handleShowDatePicker.bind(this)
    this.handleHideDatePicker = this.handleHideDatePicker.bind(this)
    this.handleShowTimePicker = this.handleShowTimePicker.bind(this)
    this.handleHideTimePicker = this.handleHideTimePicker.bind(this)
    this.handleOnButtonPressed = this.handleOnButtonPressed.bind(this)
  }

  async componentDidMount() {
    const { phoneNum, handleAddPhone } = this.props
    let res
    if (!phoneNum) {
      res = await AsyncStorage.getItem('phoneNum')
      handleAddPhone(res)
      res && this.setState({ phoneNum: res })
    }
  }

  async handleSetPhoneNumber(phoneNum) {
    const { handleAddPhone, handleSetMissingPhone } = this.props
    this.setState({ phoneNum })
    handleAddPhone(phoneNum)
    handleSetMissingPhone(false)
  }

  handleShowDatePicker() {
    this.setState({ isDatePickerVisible: true })
  }

  handleHideDatePicker() {
    this.setState({ isDatePickerVisible: false })
  }

  handleDatePicked(date) {
    const { handleSetStartDate } = this.props
    const startDate = moment(date).startOf('day')
    handleSetStartDate(startDate)
    this.handleHideDatePicker()
  }

  handleShowTimePicker(min) {
    min
      ? this.setState({ isMinTimePickerVisible: true })
      : this.setState({ isMaxTimePickerVisible: true })
  }

  handleHideTimePicker(min) {
    min
      ? this.setState({ isMinTimePickerVisible: false })
      : this.setState({ isMaxTimePickerVisible: false })
  }

  handleTimePicked(date, min) {
    const { handleSetMaxHour, handleSetMinHour } = this.props

    min ? handleSetMinHour(moment(date)) : handleSetMaxHour(moment(date))
    this.handleHideTimePicker(min)
  }

  async handleFormSubmitFunc() {
    const {
      handleFormSubmit,
      handleSetMissingContact,
      handleSetMissingPhone,
      startDate,
      minHour,
      maxHour,
      duration,
      phoneNum,
      contact,
      navigation
    } = this.props
    if (!contact.phone) {
      handleSetMissingContact(true)
      return
    }
    if (!phoneNum) {
      handleSetMissingPhone(true)
      return
    }
    const formData = {
      idFirst: phoneNum,
      idSecond: contact.phone,
      startDate,
      duration,
      minHour: minHour.hours(),
      maxHour: maxHour.hours()
    }
    const result = await handleFormSubmit(formData)
    if (result) {
      setTimeout(() => {
        navigation.navigate('Result')
      }, 1500)
    }
  }

  handleOnButtonPressed() {
    const { handleSetContact } = this.props
    ContactsWrapper.getContact()
      .then(contact => {
        handleSetContact(contact)
      })
      .catch(err => {
        return err
      })
  }

  handleExpended() {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const {
      startDate,
      minHour,
      maxHour,
      duration,
      contact,
      missingContact,
      loading,
      success,
      visible,
      missingPhone
    } = this.props
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const eventName = [
      'Buisness Meeting',
      'Fine Dinning',
      'Watch a Movie',
      'Crack a Cold One With The Boyz'
    ]
    const { handleSetDuration, handleSetVisible } = this.props
    const style = success ? styles.snackSuccess : styles.snackFail
    const stringDate = ` ${days[startDate.day()]}, ${
      startDate.date() < 10 ? `0${startDate.date()}` : startDate.date()
    }/${
      startDate.month() < 10 ? `0${startDate.month() + 1}` : startDate.month() + 1
    }/${startDate.year()}`

    const stringMinTime = `${minHour.hours() < 10 ? `0${minHour.hours()}` : minHour.hours()}:${
      minHour.minutes() < 10 ? `0${minHour.minutes()}` : minHour.minutes()
    }`

    const stringMaxTime = `${maxHour.hours() < 10 ? `0${maxHour.hours()}` : maxHour.hours()}:${
      maxHour.minutes() < 10 ? `0${maxHour.minutes()}` : maxHour.minutes()
    }`

    return (
      <View style={styles.HomePage}>
        <View>
          <TextInput
            label="Phone Number"
            style={styles.input}
            value={this.state.phoneNum}
            onChangeText={phoneNum => this.handleSetPhoneNumber(phoneNum)}
            keyboardType={'numeric'}
            error={missingPhone}
          />
          {missingPhone && <Text style={styles.missingCont}>This field is required</Text>}
          <HelperText type="error" visible={!this.state.phoneNum.match(/^[0-9]+$/)}>
            Phone Number Must Contain Numbers Only
          </HelperText>
          <View style={styles.formItem}>
            <Text style={styles.title}>Who Do You Want to Meet?</Text>
            <TouchableOpacity onPress={this.handleOnButtonPressed}>
              <Text style={styles.bordered}>{contact.name ? contact.name : 'Click to Choose'}</Text>
            </TouchableOpacity>
            {missingContact && <Text style={styles.missingCont}>A Contact Must Be Chosen</Text>}
          </View>
          <View style={styles.formItem}>
            <Text style={styles.title}>What Do You Want To Do?</Text>
            <TouchableOpacity onPress={this.handleExpended} style={style.picker}>
              <List.Section>
                <List.Accordion
                  title={eventName[duration - 1]}
                  expanded={this.state.expanded}
                  style={styles.picker}
                  onPress={this.handleExpended}
                >
                  <TouchableOpacity
                    onPress={() => {
                      handleSetDuration(1)
                      this.handleExpended()
                    }}
                  >
                    <List.Item title="Buisness Meeting" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      handleSetDuration(2)
                      this.handleExpended()
                    }}
                  >
                    <List.Item title="Fine Dinning" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      handleSetDuration(3)
                      this.handleExpended()
                    }}
                  >
                    <List.Item title="Watch a Movie" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      handleSetDuration(4)
                      this.handleExpended()
                    }}
                  >
                    <List.Item title="Crack a Cold One With The Boyz" />
                  </TouchableOpacity>
                </List.Accordion>
              </List.Section>
            </TouchableOpacity>
            <Text style={styles.duration}>
              About {duration}
              {duration === 1 ? ' Hour' : ' Hours'}
            </Text>
          </View>
          <View style={styles.formItem}>
            <Text style={styles.title}>Choose a Starting Date</Text>
            <TouchableOpacity onPress={this.handleShowDatePicker}>
              <Text style={styles.bordered}>{stringDate}</Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isDatePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.handleHideDatePicker}
              minimumDate={new Date()}
            />
          </View>

          <View style={styles.formItem}>
            <Text style={styles.title}>Not Before</Text>
            <TouchableOpacity onPress={() => this.handleShowTimePicker(true)}>
              <Text style={styles.bordered}>{stringMinTime}</Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isMinTimePickerVisible}
              onConfirm={date => this.handleTimePicked(date, true)}
              onCancel={() => this.handleHideTimePicker(true)}
              mode={'time'}
            />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.title}>Not After</Text>
            <TouchableOpacity onPress={() => this.handleShowTimePicker(false)}>
              <Text style={styles.bordered}>{stringMaxTime}</Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isMaxTimePickerVisible}
              onConfirm={date => this.handleTimePicked(date, false)}
              onCancel={() => this.handleHideTimePicker(false)}
              mode={'time'}
            />
          </View>
        </View>
        <View style={styles.formItem}>
          <Button
            onPress={this.handleFormSubmitFunc}
            mode={loading ? 'contained' : 'outlined'}
            loading={loading}
          >
            {loading ? 'Chillax While Matching...' : 'Match Us!'}
          </Button>
        </View>

        <Snackbar
          visible={visible}
          duration={success ? 1500 : 2000}
          onDismiss={() => handleSetVisible(false)}
          style={style}
        >
          <Text style={styles.smallText}>
            {success
              ? 'Matched Successfully! Loading Results...'
              : 'Match Failed. Does your contact use MeetMe?'}
          </Text>
        </Snackbar>
      </View>
    )
  }
}

Form.propTypes = {
  handleSetVisible: PropTypes.func,
  startDate: PropTypes.instanceOf(moment),
  minHour: PropTypes.instanceOf(moment),
  maxHour: PropTypes.instanceOf(moment),
  duration: PropTypes.number,
  contact: PropTypes.object,
  handleSetMinHour: PropTypes.func,
  handleSetMaxHour: PropTypes.func,
  handleSetDuration: PropTypes.func,
  handleFormSubmit: PropTypes.func,
  handleAddPhone: PropTypes.func,
  handleSetStartDate: PropTypes.func,
  handleSetMissingContact: PropTypes.func,
  phoneNum: PropTypes.string,
  handleSetContact: PropTypes.func,
  missingContact: PropTypes.bool,
  loading: PropTypes.bool,
  success: PropTypes.bool,
  visible: PropTypes.bool,
  navigation: PropTypes.object,
  handleSetMissingPhone: PropTypes.func,
  missingPhone: PropTypes.bool
}

export default connect(
  mapStateToProps,
  { ...FormActions, ...HomePageActions }
)(Form)
