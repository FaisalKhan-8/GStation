import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import User from '../screens/auth/User';
import Verify from '../screens/auth/Verify';
const Stack = createNativeStackNavigator();
export default function AuthNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'simple_push',
      }}
      initialRouteName="User">
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Verify" component={Verify} />
    </Stack.Navigator>
  );
}
