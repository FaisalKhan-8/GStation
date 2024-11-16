/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {BaseToast, ErrorToast} from 'react-native-toast-message';

export const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: '#228B22'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: '#000',
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: 'red'}}
      text1Style={{
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: 'red',
      }}
    />
  ),
};
