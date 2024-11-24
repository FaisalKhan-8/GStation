import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useDispatch} from 'react-redux';

export default function Verify() {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  // Handle input change
  const handleInputChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleBackspace = (value, index) => {
    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Paste OTP from clipboard
  const pasteOTP = async () => {
    try {
      const otpFromClipboard = await Clipboard.getString();
      if (otpFromClipboard && otpFromClipboard.length === otp.length) {
        setOtp(otpFromClipboard.split(''));
        Alert.alert('Success', 'OTP pasted successfully!');
      } else {
        Alert.alert('Error', 'Invalid OTP in clipboard!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to paste OTP. Please try again.');
    }
  };

  // Handle OTP verification
  const verifyOtp = () => {
    const enteredOtp = otp.join('');
    console.log('Entered OTP:', enteredOtp);

    if (enteredOtp.length === otp.length) {
      dispatch({
        type: 'SET_ACCESS',
        payload: 'Access Token Dummy',
      });
      Alert.alert('Success', 'OTP Verified!');
    } else {
      Alert.alert('Error', 'Please enter a valid OTP.');
    }
  };

  return (
    <View className="bg-primary/20 flex-1 justify-evenly items-center">
      <SafeAreaView className="w-full h-full justify-evenly space-y-8 mt-8 items-center">
        <StatusBar
          backgroundColor={'#29B67501'}
          barStyle={'dark-content'}
          translucent
        />
        {/* Top Progress Indicator */}
        <View className="flex-row justify-evenly items-center w-full">
          <View className="w-[25%] h-[1px] bg-black" />
          <View className="w-[60px] h-[60px] rounded-full border-2" />
          <View className="w-[25%] h-[1px] bg-black" />
        </View>

        {/* OTP Form */}
        <View className="w-[88%] self-center">
          <Text className="text-4xl font-suse font-semibold text-left w-[88%] text-gray-800">
            Verify
          </Text>
          <Text className="text-xl font-suse font-semibold text-left w-[88%] text-gray-800">
            Let's verify your OTP
          </Text>
        </View>

        {/* OTP Input Fields */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={el => (inputRefs.current[index] = el)}
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={value => handleInputChange(value, index)}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  handleBackspace('', index);
                }
              }}
            />
          ))}
        </View>

        {/* Buttons */}
        <View className="w-[88%] self-center space-y-4">
          <TouchableOpacity onPress={verifyOtp} style={styles.button}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={pasteOTP}
            style={[styles.button, {backgroundColor: '#d3d3d3'}]}>
            <Text style={[styles.buttonText, {color: '#000'}]}>Paste OTP</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    width: '80%',
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    fontFamily: 'SUSE Regular',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
