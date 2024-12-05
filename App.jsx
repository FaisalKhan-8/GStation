import React, {useEffect} from 'react';
import './global.css';
import {Provider} from 'react-redux';
import {store} from './Store';
import {
  PERMISSIONS,
  requestMultiple,
  checkMultiple,
  RESULTS,
} from 'react-native-permissions';
import {Platform} from 'react-native';
import IndexNav from './src/navigation/Index';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  // Request permissions only when the component is mounted and the app is attached to an Activity
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

        // Check if permissions are already granted before requesting
        const statuses = await checkMultiple(permissions);

        // If any permission is not granted, request them
        const missingPermissions = Object.entries(statuses).filter(
          ([_, status]) => status !== RESULTS.GRANTED,
        );

        if (missingPermissions.length > 0) {
          const permissionsToRequest = missingPermissions.map(
            ([permission]) => permission,
          );
          const requestStatuses = await requestMultiple(permissionsToRequest);
          console.log('Requested permissions statuses:', requestStatuses);
        } else {
          console.log('All required permissions are already granted.');
        }
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
