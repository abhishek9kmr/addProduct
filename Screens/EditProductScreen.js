import React, {useState} from 'react';
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

function AddProductScreen({navigation, route}) {
  const {item} = route.params;
  const [editName, setEditName] = useState(item.name);
  const [editPrice, setEditPrice] = useState(item.price);
  const [editOfferPrice, setEditOfferPrice] = useState(item.offerPrice);
  console.log('navigated data', item);

  var editNameLength;
  var editPriceLength;
  var editOfferLength;
  var validEditOfferPrice;
  const buttonPress = () => {
    if (editName.length === 0) {
      ToastAndroid.show('Please enter product name', ToastAndroid.LONG);
      editNameLength = false;
    } else {
      editNameLength = true;
    }

    if (editPrice.length === 0) {
      ToastAndroid.show('Please enter product price', ToastAndroid.LONG);
      editPriceLength = false;
    } else {
      editPriceLength = true;
    }

    if (editOfferPrice.length === 0) {
      ToastAndroid.show('Please enter offer price', ToastAndroid.LONG);
      editOfferLength = false;
    } else {
      editOfferLength = true;
    }
    if (editOfferPrice >= editPrice) {
      ToastAndroid.show(
        'Offer price should be less than actual price',
        ToastAndroid.LONG,
      );
      validEditOfferPrice = false;
    } else {
      validEditOfferPrice = true;
    }

    if (
      editNameLength &&
      editPriceLength &&
      editOfferLength &&
      validEditOfferPrice
    ) {
      firestore()
        .collection('Product')
        .doc(item.key)
        .update({
          name: editName,
          price: editPrice,
          offerPrice: editOfferPrice,
        })
        .then(() => {
          console.log('Product updated!');
          ToastAndroid.show('Product updated', ToastAndroid.LONG);
          navigation.navigate('Product');
        });
    }
  };
  const buttonDelete = () => {
    firestore()
      .collection('Product')
      .doc(item.key)
      .delete()
      .then(() => {
        console.log('Product deleted!');
        ToastAndroid.show('Product deleted', ToastAndroid.LONG);
      });
    navigation.navigate('Product');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Update Product</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setEditName(text)}
        value={editName}
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setEditPrice(text)}
        value={editPrice}
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setEditOfferPrice(text)}
        value={editOfferPrice}
      />
      <TouchableOpacity style={styles.button} onPress={buttonPress}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={buttonDelete}>
        <Text style={styles.buttonText}>Delete</Text>
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
