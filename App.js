import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import ProductScreen from './Screens/ProductScreen';
import SignupScreen from './Screens/SignupScreen';
import AddProductScreen from './Screens/AddProductScreen';
import EditProductScreen from './Screens/EditProductScreen';

<LoginScreen />;
<ProductScreen />;
<SignupScreen />;
<AddProductScreen />;
<EditProductScreen />;
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProductScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProduct"
          component={EditProductScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
