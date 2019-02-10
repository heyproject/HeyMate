import React from 'react';
import { ImageBackground, StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';

import firebase from 'react-native-firebase';
import { Formik } from 'formik';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());

    // await firebase.analytics().logEvent('foo', { bar: '123'});
  }

  render() {
    return (
    <ImageBackground source={require('./assets/img/background.png')} style={styles.container} >
      <ScrollView>
        <View style={styles.container}>
            <Image source={require('./assets/ReactNativeFirebase.png')} style={[styles.logo]}/>
            <Text style={styles.welcome}>
              Welcome to {'\n'} React Native Firebase
            </Text>
            <Text style={styles.instructions}>
              To get started, edit App.js
            </Text>
            {Platform.OS === 'ios' ? (
              <Text style={styles.instructions}>
                Press Cmd+R to reload,{'\n'}
                Cmd+D or shake for dev menu
              </Text>
            ) : (
              <Text style={styles.instructions}>
                Double tap R on your keyboard to reload,{'\n'}
                Cmd+M or shake for dev menu
              </Text>
            )}
        </View>
      </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 64,
    padding: 10,
    width: 135,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});
