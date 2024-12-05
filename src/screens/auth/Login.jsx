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
export default function Login({navigation, route}) {
  const [mobile, setMobile] = React.useState('');
  console.log(mobile);
  return (
    <View className=" bg-primary/20 flex-1 justify-evenly items-center">
      <SafeAreaView className="w-full h-full justify-evenly space-y-8 mt-8 items-center">
        <StatusBar
          backgroundColor={'#29B67501'}
          barStyle={'dark-content'}
          translucent
        />

        <View className="flex-row justify-evenly items-center w-full">
          <View className="w-[25%] h-[1px] bg-black" />
          <View className="w-[60px] h-[60px] rounded-full border-2 " />
          <View className="w-[25%] h-[1px] bg-black" />
        </View>
        <KeyboardAwareScrollView className="w-full self-center space-y-10">
          <View className="self-center w-[88%]">
            <Text className="text-4xl font-suse font-semibold text-left w-[88%] text-gray-800">
              Login
            </Text>
            <Text className="text-xl font-suse font-semibold text-left w-[88%] text-gray-800">
              Let's continue!
            </Text>
          </View>
          <View className="w-[88%] bg-white h-[300px] self-center items-center justify-evenly shadow-lg">
            <View className="w-[92%] self-end">
              <Text className="text-base font-suse font-medium text-left w-[100%] text-gray-800">
                Phone
              </Text>
              <TextInput
                keyboardType="number-pad"
                maxLength={10}
                placeholder="9123456789"
                className="border-b-2 tracking-widest text-xl font-suse font-medium h-[50px] border-gray-800"
                value={mobile}
                onChangeText={setMobile}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Verify', {
                  phone_number: mobile,
                });
              }}
              className="bg-black w-[88%] h-[50px] shadow-lg rounded-md justify-center items-center">
              <Text className="text-base font-suse font-medium  text-white">
                Send OTP
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text className="text-base font-bold font-suse  text-black">
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}
