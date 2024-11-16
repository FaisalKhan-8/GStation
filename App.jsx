import React, {useEffect} from 'react';
import './global.css';
import {Provider} from 'react-redux';
import {store} from './Store';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import {Platform} from 'react-native';
import IndexNav from './src/navigation/Index';

export default function App() {
  useEffect(() => {
    const requestPermissions = async () => {
      try {
        setTimeout(async () => {
          const statuses = await requestMultiple(
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
                ],
          );
          console.log(statuses);
        }, 1000); // 1-second delay
      } catch (error) {
        console.error('Permission request error:', error);
      }
    };

    requestPermissions();
  }, []);

  return (
    <Provider store={store}>
      <IndexNav />
    </Provider>
  );
}
