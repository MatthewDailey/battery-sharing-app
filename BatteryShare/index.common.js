
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
} from 'react-native';

import { RNBatteryStatus } from 'NativeModules';

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
    }
  }

  componentDidMount() {
    console.log('Component did mount.');

    const setBatteryLevel = (batteryLevel, errorMessage) => {
      console.log('Called setBatteryLevel ', batteryLevel, errorMessage);
      this.setState({
        batteryLevel,
        errorMessage
      }, () => console.log(this.state));
    };

    RNBatteryStatus.batteryStatus(
      "getLevel", // getLevel, turnOff
      function errorCallback(results) {
        setBatteryLevel(undefined);
        console.log('JS Error: ', results);
      },
      function successCallback(results) {
        setBatteryLevel(parseBatteryLevel(results.successMsg));
        console.log('JS Success: ', results);
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

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

AppRegistry.registerComponent('BatteryShare', () => RCTBattery);
  