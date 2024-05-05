import React from 'react';
import { Text,View } from 'react-native';

const ButtonComp = ({title}) => {
    return (
        <View className="justify-center items-center ">
            <Text className="bg-white text-black text-xl w-[325] h-[48] text-center pt-2 font-bold rounded-2xl">{title}</Text>
        </View>
    );
}

export default ButtonComp;