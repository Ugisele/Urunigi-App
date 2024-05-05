import React from 'react';
import { View, Text, Image, ImageBackground, Pressable, } from "react-native";
import { LinearGradient } from "expo-linear-gradient"
import ButtonComp from './ButtonComp';

const Welcome = ({navigation}) => {
    return (
        <View className="flex-1 ">
            <LinearGradient colors={['#FEF1FF','#d082be',  ]}
                start={[0, 0]}
                end={[1, 1]} className="flex-1 justify-center items-center">

                <ImageBackground source={require('../assets/onboard.png')} className="flex-1 h-[vh] w-[vw]">
                    <View className="flex-1 flex flex-col justify-center items-center pt-28 mt-28">
                        <Text className="text-3xl font-bold text-white pl-6 pt-28 mt-10">Ikaze!</Text>
                        <Text className="text-lg font-bold text-white text-center mb-20">Subiza ibibazo bike tugukorere urubuga rugukwiriye </Text>
                        <Pressable onPress={() => 
                            navigation.navigate('start')}>
                            <ButtonComp title={"Komeza"} />
                        </Pressable>
                    </View>
                    <View className="justify-end">
                            <Text className="p-1  text-white text-xsm text-center" >Nukanda komeza uraba wemeje amategeko n’amabwiriza byo gukoresha uru rubuga</Text>
                        </View>
                   
                </ImageBackground>

            </LinearGradient>
        </View>
    )
}
export default Welcome;