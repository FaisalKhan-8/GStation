import {
  View,
  Text,
  StatusBar,
  Platform,
  ActivityIndicator,
  Image,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MapView, {Marker, Callout} from 'react-native-maps'; // Import Callout for custom pop-up
import {useDispatch, useSelector} from 'react-redux';
import {getLocation} from '../../../Store/actions/userActions';
import LottieView from 'lottie-react-native';
import {animation} from '../../assets/animation';
// Haversine formula to calculate distance in kilometers
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance.toFixed(2); // Return distance with 2 decimal places
};

export default function Search({navigation}) {
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);
  const location = useSelector(state => state.Reducers.location);

  // Dummy charging points data
  const chargingPoints = [
    {
      name: 'EV Charging Station 1',
      latitude: 19.997453,
      longitude: 73.789802,
      description: 'Fast charging station near Nashik Road Railway Station',
      type: 'Fast Charging',
      available_ports: 4,
    },
    {
      name: 'EV Charging Station 2',
      latitude: 19.96758,
      longitude: 73.743848,
      description: 'Regular charging station at City Center Mall',
      type: 'Regular Charging',
      available_ports: 6,
    },
    {
      name: 'EV Charging Station 3',
      latitude: 19.945418,
      longitude: 73.776839,
      description: 'Supercharging station at Pandit Colony',
      type: 'Supercharging',
      available_ports: 3,
    },
    {
      name: 'EV Charging Station 4',
      latitude: 20.007323,
      longitude: 73.68987,
      description: 'Regular charging station at Mumbai Naka',
      type: 'Regular Charging',
      available_ports: 5,
    },
    {
      name: 'EV Charging Station 5',
      latitude: 19.930853,
      longitude: 73.807043,
      description: 'Fast charging station near Saptashrungi Temple',
      type: 'Fast Charging',
      available_ports: 2,
    },
  ];

  React.useEffect(() => {
    dispatch(getLocation(setLoading, Platform.OS));
  }, [dispatch]);

  return (
    <View className="bg-white flex-1 justify-evenly items-center">
      <StatusBar barStyle={'dark-content'} translucent />
      {loading ? (
        <View className="flex justify-center items-center">
          <LottieView
            source={animation.search} // Add your Lottie file path here
            autoPlay
            loop
            style={{width: 100, height: 100}} // Adjust size as needed
          />
          <Text className="mt-4 text-center text-lg font-suse font-semibold text-gray-700">
            Searching for EV Charging Stations near you...
          </Text>
        </View>
      ) : (
        <MapView
          className="h-full w-full"
          provider="google"
          showsUserLocation={true}
          initialRegion={{
            latitude: location?.latitude || 19.9722245, // Fallback to provided location
            longitude: location?.longitude || 73.7269195, // Fallback to provided location
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {chargingPoints.map((point, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: point.latitude,
                longitude: point.longitude,
              }}
              // Use a custom marker icon or design
            >
              {/* Custom marker view */}
              <View className="flex justify-center items-center">
                <View className="p-3 bg-white rounded-full">
                  {/* Custom Icon - You can replace this with an Image */}
                  <Text className="text-white text-sm">
                    {point.type === 'Fast Charging' ? '⚡' : '🔋'}
                  </Text>
                </View>
              </View>

              {/* Custom Callout with detailed info including distance and "Book Slot" button */}
              <Callout
                onPress={() => {
                  navigation.navigate('Book');
                }}>
                <View className="p-2 w-[250px] space-y-2">
                  <Text className="font-bold">{point.name}</Text>
                  <Text>{point.description}</Text>
                  <Text>Type: {point.type}</Text>
                  <Text>Available Ports: {point.available_ports}</Text>
                  {/* Calculate and display distance */}
                  <Text>
                    Distance:{' '}
                    {getDistance(
                      location?.latitude || 19.9722245,
                      location?.longitude || 73.7269195,
                      point.latitude,
                      point.longitude,
                    )}{' '}
                    km
                  </Text>
                  {/* "Book Slot" Button */}
                  <TouchableOpacity className="bg-primary px-3 py-1">
                    <Text className=" text-white p-2 rounded-md text-center">
                      Book Slot
                    </Text>
                  </TouchableOpacity>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
}
