
import React, { Component } from 'react';
import {
  ListView,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { storeName, listenToAllUserPhoneData } from './firebaseConnector';

let styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
  }
});

const storeNameSafely = newText => storeName(newText).catch(console.error);

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

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
    };
  }

  componentDidMount() {
    const storeUserState = (users) => {
      this.setState({ users }, () => console.log(this.state));
    };

    listenToAllUserPhoneData(storeUserState);
  }

  render() {
    console.log('Render.');

    return (
      <View style={styles.container}>
        <TextInput
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

