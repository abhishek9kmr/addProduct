import React, {useState} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const entireScreenWidth = Dimensions.get('window').width;
const REM = entireScreenWidth / 376;
const rem = n => n * REM;

function SignupScreen({navigation}) {
  const [signupUser, setSignupUser] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');

  var signupPasswordLength;
  var passwordNoMatch;

  const buttonPress = () => {
    if (signupPassword.length < 6) {
      ToastAndroid.show(
        'Password should be minimum of 6 digits',
        ToastAndroid.LONG,
      );
      signupPasswordLength = false;
    } else {
      signupPasswordLength = true;
    }
    if (signupPassword !== reenterPassword) {
      passwordNoMatch = false;
      ToastAndroid.show(
        'Re-entered password does not match',
        ToastAndroid.LONG,
      );
    } else {
      passwordNoMatch = true;
    }

    if (signupPasswordLength && passwordNoMatch) {
      auth()
        .createUserWithEmailAndPassword(signupUser, signupPassword)
        .then(() => {
          console.log('User account created & signed in!');
          ToastAndroid.show('User account created!', ToastAndroid.LONG);
          auth()
            .signOut()
            .then(() => console.log('User signed out!'));
          navigation.navigate('Login');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            ToastAndroid.show(
              'That email address is already in use!',
              ToastAndroid.LONG,
            );
          }

          if (error.code === 'auth/invalid-email') {
            ToastAndroid.show('invalid-email!', ToastAndroid.LONG);
            console.log('That email address is invalid!');
          }
          console.error(error);
        });
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setSignupUser(text)}
        value={signupUser}
        placeholder="Enter username"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setSignupPassword(text)}
        value={signupPassword}
        placeholder="Enter password"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setReenterPassword(text)}
        value={reenterPassword}
        placeholder="Enter password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={buttonPress}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: rem(50),
    width: rem(220),
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: rem(50),
    width: rem(220),
    margin: 12,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E86C1',
    borderRadius: 25,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: rem(20),
    color: '#ffffff',
  },
});
