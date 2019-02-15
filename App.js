import React from 'react';
import { ImageBackground, StyleSheet, Platform, Image, Text, View, SafeAreaView, Keyboard,
                                                                                   KeyboardAvoidingView,
                                                                                   TouchableWithoutFeedback } from 'react-native';
// native base imports
import {
  Container,
  Item,
  Input,
} from 'native-base';
import { Icon } from 'react-native-elements'
import firebase from 'react-native-firebase';
import { Formik, FormikProps, Form, Field } from 'formik';


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
    <ImageBackground source={require('./assets/img/background.png')} style={styles.containerBackground} >
        <SafeAreaView style={styles.container}>
          <Image source={require('./assets/ReactNativeFirebase.png')} style={[styles.logo]}/>
          <KeyboardAvoidingView
               style={styles.container}
               behavior='padding' enabled >
              <TouchableWithoutFeedback
                style={styles.container}
                onPress={Keyboard.dismiss}>
                <View style={styles.bottom}>
                    {/* Phone input with native-base */}
                    <Item rounded style={styles.itemStyle}>
                      <Icon
                          raised
                          name='phone'
                          type='font-awesome'
                          color='#f50'
                      />
                      <Input placeholder='+61451554433'
                               placeholderTextColor='#adb4bc'
                               keyboardType={'phone-pad'}
                               returnKeyType='done'
                               autoCapitalize='none'
                               autoCorrect={false}
                               secureTextEntry={false} style={styles.inputStyle}/>
                    </Item>
                  </View>
                </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  containerBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 64,
    padding: 10,
    width: 135,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
    width: 300,
  },
  iconStyle: {
    color: '#fff',
    fontSize: 28,
    marginLeft: 15,
  },
  itemStyle: {
    position: 'absolute',
    bottom:0,
  },
  inputStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
});
