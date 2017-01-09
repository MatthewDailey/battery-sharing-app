
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

const storeNameSafely = newText => storeName(newText).catch(console.error);

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
          onChangeText={storeNameSafely}
        />
        <Text>
          Hello
        </Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('BatteryShare', () => RCTBattery);

