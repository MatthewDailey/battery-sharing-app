
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { storeName } from './firebaseConnector';

let styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
        <TextInput
          placeholder="Who are you?"
          style={{
            height: 30,
            textAlign: 'center',
          }}
          onChangeText={storeName}
        />
        <Text>
          Hello
        </Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('BatteryShare', () => RCTBattery);

