import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {UserRegister} from '../../../Store/actions/AuthAction';
import {useState} from 'react';
import Toast from 'react-native-toast-message';

export default function Register({navigation, route}) {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: '',
    phone_number: '',
    user_type: route?.params?.user_type,
  });

  const [loading, setLoading] = useState(false);

  // Handle form submission
  const HandleSubmit = () => {
    if (!data.name || !data.phone_number) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill in all fields.',
        visibilityTime: 2000,
      });
      return;
    }
    if (data.phone_number.length !== 10) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please enter a valid 10-digit phone number.',
        visibilityTime: 2000,
      });
      return;
    }

    // Dispatch the register action
    dispatch(
      UserRegister(data.name, data.phone_number, setLoading, navigation),
    );
  };

  return (
    <View className="bg-primary/20 flex-1 justify-evenly items-center">
      <SafeAreaView className="w-full h-full justify-evenly space-y-8 mt-8 items-center">
        <StatusBar
          backgroundColor={'#29B67501'}
          barStyle={'dark-content'}
          translucent
        />

        {/* Header */}
        <View className="flex-row justify-evenly items-center w-full">
          <View className="w-[25%] h-[1px] bg-black" />
          <View className="w-[60px] h-[60px] rounded-full border-2" />
          <View className="w-[25%] h-[1px] bg-black" />
        </View>

        <KeyboardAwareScrollView className="w-full self-center space-y-10">
          {/* Form Header */}
          <View className="self-center w-[88%]">
            <Text className="text-4xl font-suse font-semibold text-left w-[88%] text-gray-800">
              Register
            </Text>
            <Text className="text-xl font-suse font-semibold text-left w-[88%] text-gray-800">
              Let's continue the Journey!
            </Text>
          </View>

          {/* Input Fields */}
          <View className="w-[88%] bg-white h-[400px] self-center items-center justify-evenly shadow-lg">
            <View className="w-[92%] self-end">
              <Text className="text-base font-suse font-medium text-left w-[100%] text-gray-800">
                Name
              </Text>
              <TextInput
                keyboardType="ascii-capable"
                placeholder="John Doe"
                className="border-b-2 font-suse h-[50px] text-xl border-gray-800"
                value={data.name}
                onChangeText={text => setData({...data, name: text})}
              />
            </View>

            <View className="w-[92%] self-end">
              <Text className="text-base font-suse font-medium text-left w-[100%] text-gray-800">
                Phone
              </Text>
              <TextInput
                keyboardType="number-pad"
                maxLength={10}
                placeholder="9123456789"
                className="border-b-2 h-[50px] tracking-widest font-suse text-xl border-gray-800"
                value={data.phone_number}
                onChangeText={text => setData({...data, phone_number: text})}
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              className="bg-black w-[88%] h-[50px] shadow-lg rounded-md justify-center items-center"
              onPress={HandleSubmit} // Call HandleSubmit here
              disabled={loading}>
              <Text className="text-base font-suse font-medium text-white">
                {loading ? 'Sending...' : 'Send OTP'}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}
