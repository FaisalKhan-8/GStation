import {View, Text, Image} from 'react-native';
import React from 'react';

export default function VehicleCard({vehicle}) {
  return (
    <View className="bg-white p-4  w-[44%] m-3 h-[250px] self-center">
      <Image
        source={{
          uri: 'https://www.endurancewarranty.com/wp-content/uploads/2022/09/Tesla-Car_Dealership.png',
        }}
        className="h-[65%] w-full rounded-lg"
        resizeMode="cover"
      />
      <Text className="font-semibold font-nunito text-xl mt-2">
        {vehicle.name}
      </Text>
      <Text className="text-gray-600">
        Model: <Text className="font-medium">{vehicle.model}</Text>
      </Text>
      <Text className="text-gray-600">
        Plate: <Text className="font-medium">{vehicle.plate}</Text>
      </Text>
    </View>
  );
}
