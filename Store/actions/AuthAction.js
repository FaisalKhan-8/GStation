import axios from 'axios';
import axiosIns, {baseURL} from '../../src/Helper/Helper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Init = () => {
  return async dispatch => {
    try {
      let access = await AsyncStorage.getItem('access');
      dispatch({
        type: 'SET_ACCESS',
        payload: access,
      });
    } catch (error) {
      dispatch({
        type: 'SET_ACCESS',
        payload: null,
      });
    }
  };
};

export const UserRegister = (name, number, setLoading, navigation) => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axios.post(baseURL + '/v1/user/register/', {
        name: name,
        phone_number: '+91' + number,
      });
      Toast.show({
        type: 'success',
        text1: response?.data?.msg,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
      setTimeout(() => {
        navigation.navigate('Login', {
          number: number,
        });
        setLoading(false);
      }, 2000);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.msg,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
      setLoading(false);
    }
  };
};

export const getOtp = (number, setLoading, navigation) => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axios.post(baseURL + '/v1/user/login/', {
        phone_number: '+91' + number,
      });
      Toast.show({
        type: 'success',
        text1: response?.data?.msg,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
      setTimeout(() => {
        navigation.navigate('Otp', {
          number: number,
        });
        setLoading(false);
      }, 2000);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.msg,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
      setLoading(false);
    }
  };
};

export const verifyOtp = (otp, number, setLoading, navigation) => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axios.post(baseURL + '/v1/user/verify/', {
        phone_number: number,
        otp: otp,
      });
      Toast.show({
        type: 'success',
        text1: response?.data?.msg,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
      await AsyncStorage.setItem('access', response?.data?.tokens?.access);
      dispatch({
        type: 'ACCESS',
        payload: response?.data?.tokens?.access,
      });
      setTimeout(() => {
        navigation.replace(response?.data?.is_complete ? 'Tab' : 'Refer');
        setLoading(false);
      }, 2000);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.msg,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
      setLoading(false);
    }
  };
};

export const updateProfile = (name, setLoading, navigation) => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axiosIns.post(baseURL + '/complete-profile/', {
        name: name,
      });
      Toast.show({
        type: 'success',
        text1: 'Profile Updated Sucessfully',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
      dispatch({
        type: 'PROFILE',
        payload: response?.data,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.msg,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
      setLoading(false);
    }
  };
};

export const getProfile = (setLoading, navigation) => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axiosIns.get(baseURL + '/profile/');
      dispatch({
        type: 'PROFILE',
        payload: response?.data,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.msg,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
      setLoading(false);
    }
  };
};

export const LogoutAction = () => {
  return async dispatch => {
    await AsyncStorage.clear();
    dispatch({
      type: 'LOGOUT',
    });
  };
};
