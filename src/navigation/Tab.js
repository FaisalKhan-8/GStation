import {View, Text, Image, Platform} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Search from '../screens/home/Search';
import Vehical from '../screens/home/Vehical';
import {image} from '../assets/image';
import More from '../screens/home/More';
const BottomTab = createBottomTabNavigator();
export default function Tab() {
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Search') {
            iconName = focused ? image.station : image.station;
          } else if (route.name === 'Vehicle') {
            iconName = focused ? image.car : image.car;
          } else if (route.name === 'More') {
            iconName = focused ? image.menu : image.menu;
          }
          return (
            <View
              className={`space-y-2 justify-between flex-col w-auto items-center`}>
              {focused ? (
                <View className="h-[2px] w-[48px] bg-primary" />
              ) : null}
              <Image
                source={iconName}
                resizeMode={'cover'}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 25,
                  width: 25,
                  objectFit: 'contain',
                  // tintColor: focused ? "#bc3061" : "#000"
                }}
              />
              <Text
                className=" font-suse text-md text-center  w-[48px] "
                style={{
                  color: focused ? '#29b675' : '#000',
                  fontFamily: 'SUSE-Regular',
                }}>
                {route.name}
              </Text>
            </View>
          );
        },
        tabBarLabelStyle: {
          padding: 0,
          margin: 0,
        },
        tabBarStyle: {
          border: 'none',
          position: 'absolute',
          backgroundColor: '#fff',
          height: Platform.OS === 'ios' ? 97 : 80,
          // width: "93%",
          justifyContent: 'space-evenly',
          alignItems: 'center',
          // borderRadius: 100,
          alignSelf: 'center',
          // bottom: 25,
          // elevation: 1
        },
        // tabBarActiveTintColor: "#df633a",
        // tabBarInactiveTintColor: "#000000",
      })}>
      <BottomTab.Screen name="Search" component={Search} />
      <BottomTab.Screen name="Vehicle" component={Vehical} />
      <BottomTab.Screen name="More" component={More} />
    </BottomTab.Navigator>
  );
}
