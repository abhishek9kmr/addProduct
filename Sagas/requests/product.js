import firestore from '@react-native-firebase/firestore';

export async function requestGetProduct(action) {
  let products = [];
  const querySnapshot = await firestore().collection('Product').get();
  querySnapshot.forEach(documentSnapshot => {
    products.push({
      ...documentSnapshot.data(),
      key: documentSnapshot.id,
    });
  });
  return products;
}
