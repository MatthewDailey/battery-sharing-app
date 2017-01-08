
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

RNBatteryStatus.batteryStatus(
  "getLevel", // getLevel, turnOff

  function errorCallback(results) {
    console.log('JS Error: ' + results['errMsg']);
  },

  function successCallback(results) {
    console.log('JS Success: ' + results['successMsg']);
  }
);


class RCTBattery extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Hello
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
  