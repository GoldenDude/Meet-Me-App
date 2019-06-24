import React, { Component } from 'react'
import styles from '../../../styles'
import { connect } from 'react-redux'
import HomePageActions from './HomePageActions'
import PropTypes from 'prop-types'
import {
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  PermissionsAndroid,
  Text,
  ScrollView
} from 'react-native'
import Form from '../Form/Form'
import FormActions from '../Form/FormActions'

const mapStateToProps = ({ HomePage }) => {
  return {
    isAuth: HomePage.isAuth,
    events: HomePage.events,
    phoneNum: HomePage.phoneNum,
    granted: HomePage.granted
  }
}

class HomePage extends Component {
  async componentDidMount() {
    await this.requestPermissions()
  }

  async requestPermissions() {
    const { handleSetGranted } = this.props
    const permissions = [
      PermissionsAndroid.PERMISSIONS.READ_CALENDAR,
      PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE
    ]
    try {
      const grantedArray = await PermissionsAndroid.requestMultiple(permissions)
      if (
        grantedArray['android.permission.READ_CALENDAR'] !== 'granted' ||
        grantedArray['android.permission.READ_CONTACTS'] !== 'granted' ||
        grantedArray['android.permission.READ_PHONE_STATE'] !== 'granted' ||
        grantedArray['android.permission.WRITE_CALENDAR'] !== 'granted'
      ) {
        await handleSetGranted(false)
      }
    } catch (err) {
      await handleSetGranted(false)
    }
    await handleSetGranted(true)
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Image source={require('../../Images/logo3.png')} style={styles.logo} />,
    headerStyle: {
      backgroundColor: '#6441a5',
      height: 60
    },

    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('Sync')}>
        <Image source={require('../../Images/syncw.png')} style={styles.sync} />
      </TouchableOpacity>
    )
  })

  render() {
    const { granted } = this.props
    return granted === undefined ? (
      <Text>Loading...</Text>
    ) : granted ? (
      <SafeAreaView>
        <StatusBar backgroundColor="#4C317F" barStyle="light-content" />
        <ScrollView>
          <Form navigation={this.props.navigation} />
        </ScrollView>
      </SafeAreaView>
    ) : (
      <Text>MISSING PERMISSIONS</Text>
    )
  }
}

HomePage.propTypes = {
  handleSetGranted: PropTypes.func,
  granted: PropTypes.bool,
  navigation: PropTypes.object
}

export default connect(
  mapStateToProps,
  { ...FormActions, ...HomePageActions }
)(HomePage)
