import React, {useEffect, useState} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const entireScreenWidth = Dimensions.get('window').width;
const REM = entireScreenWidth / 376;
const rem = n => n * REM;

function AddProductScreen({navigation}) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');

  var nameLength;
  var priceLength;
  var offerLength;
  var validOfferPrice;
  const buttonPress = () => {
    let randomId = (Math.random() + 1).toString(36).substring(2);
    console.log('random', randomId);
    console.log('Firebase write function');

    if (productName.length === 0) {
      nameLength = false;
      ToastAndroid.show('Please enter product name', ToastAndroid.LONG);
    } else {
      nameLength = true;
    }
    if (productPrice.length === 0) {
      priceLength = false;
      ToastAndroid.show('Please enter product price', ToastAndroid.LONG);
    } else {
      priceLength = true;
    }
    if (offerPrice.length === 0) {
      offerLength = false;
      ToastAndroid.show('Please enter offer price', ToastAndroid.LONG);
    } else {
      offerLength = true;
    }
    if (productPrice <= offerPrice && offerPrice !== '') {
      ToastAndroid.show(
        'Offer price should be less than actual price',
        ToastAndroid.LONG,
      );
      validOfferPrice = false;
    } else {
      validOfferPrice = true;
    }
    if (nameLength && priceLength && offerLength && validOfferPrice) {
      try {
        firestore()
          .collection('Product')
          .add({
            id: randomId,
            name: productName,
            price: productPrice,
            offerPrice: offerPrice,
          })
          .then(() => {
            console.log('Product added!');
            ToastAndroid.show('Product added', ToastAndroid.LONG);
            navigation.navigate('Product');
          });
      } catch (err) {
        console.log('This is firebase error', err);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Add Product</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setProductName(text)}
        value={productName}
        placeholder="Enter product name"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setProductPrice(text)}
        value={productPrice}
        placeholder="Enter product price"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setOfferPrice(text)}
        value={offerPrice}
        placeholder="Enter offer price"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={buttonPress}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AddProductScreen;

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
    backgroundColor: '#ffffff',
  },
  button: {
    height: rem(50),
    width: rem(220),
    margin: 12,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E86C1',
    borderRadius: rem(25),
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
