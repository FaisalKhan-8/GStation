import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import HomeNav from './HomeNav';
import AuthNav from './AuthNav';

export default function IndexNav() {
  const access = useSelector(state => state.Reducers.access);

  return (
    <NavigationContainer>
      {access != null ? <HomeNav /> : <AuthNav />}
    </NavigationContainer>
  );
}
