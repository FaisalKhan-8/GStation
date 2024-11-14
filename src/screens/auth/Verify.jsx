import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';

export default function Verify() {
  const dispatch = useDispatch();
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
              Verify
            </Text>
            <Text className="text-xl font-suse font-semibold text-left w-[88%] text-gray-800">
              Let's verify your OTP
            </Text>
          </View>
          <View className="w-[88%] self-center bg-white h-[250px] items-center justify-evenly shadow-lg">
            <OTPInputView
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={code => {
                console.log(`Code is ${code}, you are good to go!`);
              }}
              autoFocusOnLoad={false}
              style={{width: '80%', height: 100}}
              pinCount={4}
              placeholderTextColor="#000000"
            />
            <TouchableOpacity
              onPress={() => {
                dispatch({
                  type: 'SET_ACCESS',
                  payload: 'Access Token Dummy',
                });
              }}
              className="bg-black w-[88%] h-[50px] shadow-lg rounded-md justify-center items-center">
              <Text className="text-base font-suse font-medium  text-white">
                Verify OTP
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  borderStyleBase: {
    width: 40,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 40,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: '#000000',
    fontFamily: 'SUSE Regular',
  },

  underlineStyleHighLighted: {
    borderColor: '#29B675',
  },
});
