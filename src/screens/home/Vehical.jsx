import { View, Text, StatusBar, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import React from 'react';
import VehicleCard from '../../components/VehicleCard';
import { image } from '../../assets/image';

export default function Vehical() {
    const vehicles = [
        { id: '1', name: 'Tesla Model S', model: '2021', plate: 'XYZ 1234' },
        { id: '2', name: 'Nissan Leaf', model: '2019', plate: 'ABC 5678' },
        { id: '3', name: 'Chevy Bolt', model: '2020', plate: 'LMN 9012' },
        { id: '4', name: 'BMW i3', model: '2018', plate: 'DEF 3456' },
        { id: '5', name: 'Audi e-tron', model: '2022', plate: 'GHI 7890' },
    ];

    return (
        <View className="bg-primary/20 flex-1 justify-normal items-center">
            <StatusBar backgroundColor={"#29B67501"} barStyle={"dark-content"} translucent />
            <View className='flex-row w-full justify-between pb-3 items-center pt-14 px-8'>
                <TouchableOpacity className='w-8 h-8'></TouchableOpacity>
                <Text className="text-xl font-suse font-semibold  text-gray-800">My Vehicle</Text>
                <TouchableOpacity className=''>
                    <Image source={image.plus} className='w-8 h-8' />
                </TouchableOpacity>
            </View>
            <FlatList
                className='w-full self-center'
                numColumns={2}
                data={vehicles}
                renderItem={({ item }) => (
                    <VehicleCard vehicle={item} />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={{
                    // alignItems: 'center', // Center items in the FlatList
                    justifyContent: 'center', // Center items vertically
                    paddingBottom: 90, // Optional: add some padding at the bottom
                }}
            />
        </View>
    );
}
