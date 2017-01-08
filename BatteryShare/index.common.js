
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

require('./firebaseConnector');

let styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

class RCTBattery extends Component {
  render() {
    console.log('Render.');

    return (
      <View style={styles.container}>
        <Text>
          Hello
        </Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('BatteryShare', () => RCTBattery);

