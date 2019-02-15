import React from 'react';
import { ImageBackground,
          StyleSheet,
          Platform,
          Image,
          Text,
          View,
          SafeAreaView,
          Keyboard,
          KeyboardAvoidingView,
          TouchableWithoutFeedback,
          Modal,
          FlatList,
          TouchableOpacity } from 'react-native';
// native base imports
import {
  Container,
  Item,
  Input,
} from 'native-base';
import { Icon } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { Formik, FormikProps, Form, Field } from 'formik';

import data from './Countries';

// Default render of country flag
const defaultFlag = data.filter(
  obj => obj.name === 'Australia'
  )[0].flag

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {flag: defaultFlag,
      modalVisible: false,
      phoneNumber: '',};
  }

  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());

    // await firebase.analytics().logEvent('foo', { bar: '123'});
  }

  async selectCountry(country) {
    // Get data from Countries.js
    const countryData = await data
    try {
      // Get the country code
      const countryCode = await countryData.filter(
        obj => obj.name === country
      )[0].dial_code
      // Get the country flag
      const countryFlag = await countryData.filter(
        obj => obj.name === country
      )[0].flag
      // Update the state then hide the Modal
      this.setState({ phoneNumber: countryCode, flag: countryFlag })
      await this.hideModal()
    }
    catch (err) {
      console.log(err)
    }
  }

  showModal() {
    this.setState({ modalVisible: true })
  }

  hideModal() {
    this.setState({ modalVisible: false })
    this.refs.PhoneInput._root.focus()
  }

  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }

  render() {
    const countryData = data
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
                    {/* Modal for country code and flag */}
                    <Modal
                      animationType="slide"
                      transparent={false}
                      visible={this.state.modalVisible}>
                      <View style={{ flex: 1 }}>
                        <View style={{ flex: 7, marginTop: 80 }}>
                          {/* Render the list of countries */}
                          <FlatList
                            data={countryData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={
                              ({ item }) =>
                                <TouchableWithoutFeedback onPress={() =>       this.selectCountry(item.name)}>
                                  <View style={styles.countryStyle}>
                                    <Text style={styles.textStyle}>
                                      {item.flag} {item.name} ({item.dial_code})
                                    </Text>
                                  </View>
                                </TouchableWithoutFeedback>
                            }
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() => this.hideModal()}
                          style={styles.closeButtonStyle}>
                          <Text style={styles.textCloseStyle}>
                            Cancel
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </Modal>
                      <Icon
                          raised
                          name='phone'
                          type='font-awesome'
                          color='#f50'
                      />
                      {/* country flag */}
                      <View><Text style={styles.inputCountry}>{this.state.flag}</Text></View>
                      <Icon
                        name='caret-down'
                        type='font-awesome'
                        color='#dfdfdf'
                        onPress={() => this.showModal()}
                      />
                      <Input placeholder='+61451554433'
                               placeholderTextColor='#adb4bc'
                               keyboardType={'phone-pad'}
                               returnKeyType='done'
                               autoCapitalize='none'
                               autoCorrect={false}
                               secureTextEntry={false}
                               style={styles.inputStyle}
                               value={this.state.phoneNumber}
                               ref='PhoneInput'
                               onChangeText={(val) => this.onChangeText('phoneNumber', val)}/>
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
   inputCountry: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 5,
  },
    textStyle: {
      padding: 5,
      fontSize: 18,
      color: '#fff'
    },
    textCloseStyle:{
      padding: 5,
      fontSize: 18,
    },
    countryStyle: {
      flex: 1,
      backgroundColor: '#383D41',
      padding: 12,
    },
    closeButtonStyle: {
      flex: 1,
      padding: 12,
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: '#211f',
      backgroundColor: '#fff3',
    }
});
