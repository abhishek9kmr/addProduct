// import React from 'react';
// import {
//   SafeAreaView,
//   View,
//   FlatList,
//   StyleSheet,
//   Text,
//   StatusBar,
//   Image,
//   TouchableOpacity,
// } from 'react-native';

// const DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'First Item',
//     price: 100,
//     productImage: require('../Images/bike.jpg'),
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Second Item',
//     price: 200,
//     productImage: require('../Images/bike.jpg'),
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//     price: 300,
//     productImage: require('../Images/bike.jpg'),
//   },
// ];

// const Item = ({title, price, productImage}) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{title}</Text>
//     <Image source={productImage} style={{height: 100, width: 200}} />
//     <Text>{price}</Text>
//   </View>
// );

// const ProductScreen = ({navigation}) => {
//   let onPress = () => {
//     navigation.navigate('AddProduct');
//   };
//   const renderItem = ({item}) => (
//     <Item
//       title={item.title}
//       price={item.price}
//       productImage={item.productImage}
//     />
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={DATA}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//       />
//       <TouchableOpacity style={styles.button} onPress={onPress}>
//         <Text>Add Product</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     backgroundColor: '#f9c2ff',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
//   button: {
//     alignItems: 'center',
//     backgroundColor: '#DDDDDD',
//     padding: 10,
//   },
// });

// export default ProductScreen;

import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

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
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [products, setProducts] = useState([]); // Initial empty array of users

  useEffect(() => {
    const subscriber = firestore()
      .collection('Product')
      .onSnapshot(querySnapshot => {
        const products = [];

        querySnapshot.forEach(documentSnapshot => {
          products.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        console.log('products?????', products);
        setProducts(products);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  console.log('products????', products);

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });
  }, [navigation]);

  if (loading) {
    return <ActivityIndicator />;
  }

  // ...
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
