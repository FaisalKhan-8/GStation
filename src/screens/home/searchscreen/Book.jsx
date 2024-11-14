import { View, Text, StatusBar, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import React from 'react'
import { image } from '../../../assets/image'

export default function Book({
    navigation
}) {
    return (
        <View className="bg-white flex-1 justify-start items-center">
            <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} translucent />
            <View className='flex-row w-full justify-between items-center mt-14 px-8'>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <Image source={image.previous} className='w-8 h-8' />
                </TouchableOpacity>
                <Text className="text-primary text-center font-suse text-2xl font-bold">Book Reservation</Text>
                <TouchableOpacity className='w-8 h-8' >
                </TouchableOpacity>
            </View>
        </View>
    )
}