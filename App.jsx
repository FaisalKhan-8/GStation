import React, {useEffect} from 'react';
import './global.css';
import {Provider} from 'react-redux';
import {store} from './Store';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import {Platform} from 'react-native';
import IndexNav from './src/navigation/Index';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const permissions =
          Platform.OS === 'ios'
            ? [
                PERMISSIONS.IOS.CAMERA,
                PERMISSIONS.IOS.PHOTO_LIBRARY,
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
                PERMISSIONS.IOS.LOCATION_ALWAYS,
              ]
            : [
                PERMISSIONS.ANDROID.CAMERA,
                PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
              ];

        const statuses = await requestMultiple(permissions);
        console.log('Permissions statuses:', statuses);
      } catch (error) {
        console.error('Permission request error:', error);
      }
    };

    requestPermissions();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <IndexNav />
      </SafeAreaProvider>
    </Provider>
  );
}
