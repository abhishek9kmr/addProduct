import React, {useState} from 'react';
import {
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

function LoginScreen({navigation}) {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  var loginUserLength;
  var loginPasswordLength;

  let login = () => {
    if (userEmail.length === 0) {
      loginUserLength: false;
      ToastAndroid.show('Please enter email address', ToastAndroid.LONG);
    } else {
      loginUserLength = true;
    }

    if (password.length === 0) {
      loginPasswordLength = false;
      ToastAndroid.show('Please enter the password', ToastAndroid.LONG);
    } else {
      loginPasswordLength = true;
    }

    if (loginUserLength && loginPasswordLength) {
      auth()
        .signInWithEmailAndPassword(userEmail, password)
        .then(() => {
          console.log('signed in!');
          navigation.navigate('Product');
        })
        .catch(error => {
          console.log(error.code);

          if (error.code === 'auth/wrong-password') {
            ToastAndroid.show('Wrong password', ToastAndroid.LONG);
          }
          if (error.code === 'auth/user-not-found') {
            ToastAndroid.show(
              'No user with this email found',
              ToastAndroid.LONG,
            );
          }
          if (error.code === 'auth/invalid-email') {
            ToastAndroid.show('Please enter valid email', ToastAndroid.LONG);
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setUserEmail(text)}
        value={userEmail}
        placeholder="Enter email"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonText}>Signup screen</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: rem(50),
    width: rem(220),
    margin: 10,
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
  headText: {
    fontWeight: 'bold',
    fontSize: rem(20),
    color: '#000000',
  },
});
