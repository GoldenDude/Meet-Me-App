import PropTypes from 'prop-types'
import styles from '../../../styles'
import { connect } from 'react-redux'
import SyncActions from './SyncActions'
import React, { Component } from 'react'
import HomePageActions from '../HomePage/HomePageActions'
import { Button, Snackbar, TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'
import { View, TouchableOpacity, Text, Image } from 'react-native'

const mapStateToProps = ({ Sync, HomePage }) => {
  return {
    phoneNum: HomePage.phoneNum,
    visible: Sync.visible,
    success: Sync.success,
    isLoading: Sync.isLoading,
    missingPhone: Sync.missingPhone
  }
}

class Sync extends Component {
  constructor(props) {
    super(props)

    this.state = {
      phoneNum: ''
    }
    this.handleSyncCalendar = this.handleSyncCalendar.bind(this)
    this.handleSetPhoneNumber = this.handleSetPhoneNumber.bind(this)
  }
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Image source={require('../../Images/logo2.png')} style={styles.logo2} />,
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

  async componentDidMount() {
    const { phoneNum, handleAddPhone } = this.props
    let res
    if (!phoneNum) {
      res = await AsyncStorage.getItem('phoneNum')
      handleAddPhone(res)
      this.setState({ phoneNum: res })
    } else this.setState({ phoneNum })
  }

  async handleSetPhoneNumber(phoneNum) {
    const { handleAddPhone, handleSetMissingPhone } = this.props
    this.setState({ phoneNum })
    handleAddPhone(phoneNum)
    handleSetMissingPhone(false)
  }

  async handleSyncCalendar() {
    const { handleAddEvents, handleSetMissingPhone } = this.props
    const { phoneNum } = this.props
    if (!phoneNum) {
      handleSetMissingPhone(true)
      return
    }
    handleAddEvents(phoneNum)
  }

  render() {
    const { success, visible, isLoading, handleSetVisiable, missingPhone } = this.props
    const style = success ? styles.snackSuccess : styles.snackFail
    return (
      <View style={[styles.container, styles.HomePage]}>
        <TextInput
          label="Phone Number"
          style={styles.syncInput}
          value={this.state.phoneNum}
          onChangeText={phoneNum => this.handleSetPhoneNumber(phoneNum)}
          keyboardType={'numeric'}
          error={missingPhone}
        />
        {missingPhone && <Text style={styles.missingCont}>This field is required</Text>}
        <Text style={styles.syncText}>Sync your calendar with our database.</Text>
        <Text style={styles.syncText}>Remember to keep it up to date :)</Text>
        <Button
          mode={isLoading ? 'contained' : 'outlined'}
          onPress={this.handleSyncCalendar}
          loading={isLoading}
        >
          {isLoading ? 'Syncing In Progress...' : 'Sync Now!'}
        </Button>

        <Snackbar
          visible={visible}
          duration={1500}
          onDismiss={() => handleSetVisiable(false)}
          style={style}
        >
          <Text style={styles.smallText}>{success ? 'Synced Successfully!' : 'Sync Failed'}</Text>
        </Snackbar>
      </View>
    )
  }
}

Sync.propTypes = {
  phoneNum: PropTypes.string,
  success: PropTypes.bool,
  visible: PropTypes.bool,
  isLoading: PropTypes.bool,
  handleAddEvents: PropTypes.func,
  handleSetVisiable: PropTypes.func,
  missingPhone: PropTypes.bool,
  handleAddPhone: PropTypes.func,
  handleSetMissingPhone: PropTypes.func
}

export default connect(
  mapStateToProps,
  { ...SyncActions, ...HomePageActions }
)(Sync)
