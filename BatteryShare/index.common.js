
import React, { Component } from 'react';
import {
  ListView,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import BackgroundFetch from 'react-native-background-fetch';

import { storeName, listenToAllUserPhoneData, onInitialSignIn, readBatteryAndStore }
  from './firebaseConnector';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

const storeNameSafely = newText => storeName(newText).catch(console.error);

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class UserBatteryList extends Component {
  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={ds.cloneWithRows(Object.keys(this.props.users))}
        renderRow={(uid) => {
          return (
            <View key={uid} style={{ padding: 5 }}>
              <Text>{this.props.users[uid].name}</Text>
              <Text>{this.props.users[uid].batteryLevel}</Text>
            </View>
           );
        }}
      />
    );
  }
}

class RCTBattery extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: {},
      signInComplete: false,
      myName: undefined,
    };
  }

  componentDidMount() {
    this.backgroundCallback();
    const storeUserState = (users) => {
      this.setState({ users }, () => console.log(this.state));
    };

    listenToAllUserPhoneData(storeUserState);

    const setSignInComplete = (user) => {
      console.log('DISPLAY NAME', user.displayName);
      this.setState({
        myName: user.displayName,
        signInComplete: true,
      }, () => console.log(this.state));
    };

    onInitialSignIn(setSignInComplete);
  }

  backgroundCallback() {
    console.log('[app] Registering background callback.');
    BackgroundFetch.configure({
      stopOnTerminate: false,
    }, () => {
      console.log('[js] Received background-fetch event');
      readBatteryAndStore();
      // To signal completion of your task to iOS, you must call #finish!
      // If you fail to do this, iOS can kill your app.
      BackgroundFetch.finish();
    }, (error) => {
      console.log('[js] RNBackgroundFetch failed to start', error);
    });
  }

  render() {
    console.log('Render.');

    if (!this.state.signInComplete) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <TextInput
          defaultValue={this.state.myName}
          placeholder="Who are you?"
          style={{
            height: 100,
            textAlign: 'center',
          }}
          onChangeText={storeNameSafely}
        />
        <UserBatteryList users={this.state.users} />
      </View>
    );
  }
}

AppRegistry.registerComponent('BatteryShare', () => RCTBattery);
