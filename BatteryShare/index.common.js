
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RNBatteryStatus } from 'NativeModules';

import firebase from './firebaseConnector';

function parseBatteryLevel(successMsg) {
  return parseFloat(
    successMsg.replace('Battery level is ', '').replace(' percent', '')).toFixed(2);
}

class RCTBattery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      batteryLevel: undefined,
      errorMessage: undefined,
    };
  }

  componentDidMount() {
    console.log('Component did mount.');

    const setBatteryLevel = (batteryLevel, errorMessage) => {
      console.log('Called setBatteryLevel ', batteryLevel, errorMessage);
      this.setState({
        batteryLevel,
        errorMessage,
      }, () => console.log(this.state));
    };

    RNBatteryStatus.batteryStatus(
      'getLevel', // getLevel, turnOff
      (errorResults) => {
        setBatteryLevel(undefined, errorResults.errMsg);
        console.log('JS Error: ', errorResults);
      },
      (successResults) => {
        setBatteryLevel(parseBatteryLevel(successResults.successMsg));
        console.log('JS Success: ', successResults);
      }
    );
  }

  render() {
    console.log('Render.');

    const batteryPercentString = this.state.batteryLevel
      ? `${this.state.batteryLevel}%`
      : `Unknown. ${this.state.errorMessage}`;

    return (
      <View style={styles.container}>
        <Text>
          Battery Level: {batteryPercentString}
        </Text>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

AppRegistry.registerComponent('BatteryShare', () => RCTBattery);

