import GetLocation from 'react-native-get-location';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

export const getLocation = (setLoading, type) => {
  setLoading(true);
  return async dispatch => {
    if (type === 'ios') {
      Geolocation.getCurrentPosition(
        async position => {
          await axios
            .get(
              `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&apiKey=328fd33ba9f0413d9b38d214f042e36c`,
            )
            .then(res => {
              const city = res.data.features[0].properties.city;
              const pin_code = res.data.features[0].properties.postcode;
              const state = res.data.features[0].properties.state;
              const country = res.data.features[0].properties.country;
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              dispatch({
                type: 'GET_LOCATION',
                payload: {
                  city: city,
                  state: state,
                  country: country,
                  pin_code: pin_code,
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 5,
                  longitudeDelta: 5,
                },
              });
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            });
        },
        error => {
          console.log(error.code, error.message);
          setLoading(false);
        },
        {enableHighAccuracy: true, timeout: 60000},
      );
    } else {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      })
        .then(location => {
          axios
            .get(
              `https://api.geoapify.com/v1/geocode/reverse?lat=${location?.latitude}&lon=${location?.longitude}&apiKey=328fd33ba9f0413d9b38d214f042e36c`,
            )
            .then(res => {
              const city = res.data.features[0].properties.city;
              const pin_code = res.data.features[0].properties.postcode;
              const state = res.data.features[0].properties.state;
              const country = res.data.features[0].properties.country;
              const latitude = location.latitude;
              const longitude = location.longitude;
              dispatch({
                type: 'GET_LOCATION',
                payload: {
                  city: city,
                  state: state,
                  country: country,
                  pin_code: pin_code,
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 5,
                  longitudeDelta: 5,
                },
              });
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            });
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        });
    }
  };
};
