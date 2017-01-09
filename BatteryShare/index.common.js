
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

require('./firebaseConnector');
import { RNBatteryStatus } from 'NativeModules';
import BackgroundFetch from "react-native-background-fetch";


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
  backgroundCallback() {
    console.log("[app] Registering background callback.");
    BackgroundFetch.configure({
      stopOnTerminate: false
    }, function() {
      console.log("[js] Received background-fetch event");

      // To signal completion of your task to iOS, you must call #finish!
      // If you fail to do this, iOS can kill your app.
      BackgroundFetch.finish();
    }, function(error) {
      console.log("[js] RNBackgroundFetch failed to start");
    });
  }

  componentDidMount() {
    this.backgroundCallback()
  }

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
