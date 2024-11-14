import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tab from './Tab';
import Book from '../screens/home/searchscreen/Book';
const Stack = createNativeStackNavigator();
export default function HomeNav() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'simple_push',
            }}
            initialRouteName="Tab">
            <Stack.Screen name="Tab" component={Tab} />
            <Stack.Screen name="Book" component={Book} />

        </Stack.Navigator>
    );
}
