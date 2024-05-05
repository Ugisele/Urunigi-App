import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, Pressable, TouchableOpacity, } from "react-native";
import { LinearGradient } from "expo-linear-gradient"
import ButtonComp from './ButtonComp';
import { RadioButton } from 'react-native-paper';


const Start = ({ navigation }) => {
    const [category, setCategory] = useState('')
    const [color, setColor] = useState("w-5 h-5 rounded-2xl border-4 border-white bg-white ")
    return (
        <View className="flex-1 ">
            <ImageBackground source={require('../assets/onboard2.png')} className="flex-1 h-[vh] w-[vw]">
                <View className="flex-1 flex-col justify-center items-center ">
                    <Image source={require('../assets/on.png')} className="w-[300px] h-[300px]" />
                </View>
                <View className="flex-1 flex-col items-center">
                    <Text className="text-lg font-bold text-white text-center mb-12">Ubarizwa mukihe cy’icyiciro</Text>
                    <View className='pb-24'>
                        <RadioButton.Group onValueChange={newValue => setCategory(newValue)} value={category}>
                            
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton.Android value="Ingaragu" color='white' uncheckedColor='white'/>
                                <Text className="text-white font-bold text-[16px]">Urishimye</Text>
                                
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton.Android value="Urubatse" color='white' uncheckedColor='white'/>
                                <Text className="text-white font-bold text-[16px]">Urababaye</Text>
                               
                            </View>

                        </RadioButton.Group>
                    </View>
                    <Pressable onPress={() =>
                        navigation.navigate('Login')}>
                        <ButtonComp title={"Komeza"} />
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    )
}
export default Start;