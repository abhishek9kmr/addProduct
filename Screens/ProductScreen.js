import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getProduct} from '../Stores/startupStore';

const entireScreenWidth = Dimensions.get('window').width;
const REM = entireScreenWidth / 376;
const rem = n => n * REM;

function ProductScreen({navigation}) {
  const onPress = () => {
    navigation.navigate('AddProduct');
  };

  const onItemPress = item => {
    console.log('item', item);
    navigation.navigate('EditProduct', {item});
  };

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getProduct());
    }, [dispatch]),
  );

  const products = useSelector(state => state.reducer.products) || [];

  console.log('productsInScreen????', products);

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({item}) => (
          <View
            style={{
              height: rem(120),
              alignItems: 'flex-start',
              justifyContent: 'center',
              marginVertical: 5,
              marginHorizontal: 5,
              borderColor: 'black',
              borderWidth: 2,
              borderRadius: 10,
              backgroundColor: '#ffffff',
              paddingLeft: rem(25),
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={styles.text}>Product name: {item.name}</Text>
                <Text style={styles.text}>Price: {item.price}</Text>
                <Text style={styles.text}>Offer price: {item.offerPrice}</Text>
              </View>
              <TouchableOpacity
                style={{marginRight: rem(25), alignItems: 'center'}}
                onPress={() => onItemPress(item)}>
                <Image
                  source={require('../Images/edit.png')}
                  style={{height: 70, width: 70}}
                />
                <Text style={styles.text}>Edit or delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => {
          return item.id;
        }}
        extraData={products}
      />
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    height: rem(50),
    width: 'auto',
    alignItems: 'center',
    backgroundColor: '#2E86C1',
    padding: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: rem(20),
    color: '#ffffff',
  },
  text: {
    fontSize: rem(18),
    color: '#000000',
    padding: rem(2),
    fontWeight: 'bold',
  },
});

export default ProductScreen;
