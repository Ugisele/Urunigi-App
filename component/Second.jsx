import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, Pressable, } from "react-native";
import { Picker } from '@react-native-picker/picker';
import ButtonComp from './ButtonComp';
import { WriteDays } from '../Firestore/Events';

const Second = ({ navigation }) => {
    const [number, setNumber] = useState();
    const [numberPicked, setNumberPicked] = useState(null);

    const HandlePicker= () =>  {
        if (numberPicked === null) {
            console.error('Number is not picked yet');
            return;
        }
        WriteDays(numberPicked, number);
        // navigation.navigate('Home')
    }
    return (
        <View className="flex-1 ">
            <ImageBackground 
            source={require('../assets/onboard2.png')} 
            className="flex-1 h-[vh] w-[vw]">
                <View className="flex-1 flex-col justify-center items-center ">
                    <Image source={require('../assets/swi.png')} className="w-[300px] h-[300px]" />
                </View>
                <View className="flex-1 flex-col items-center">
                    <Text className="text-lg font-bold text-white text-center ">Umara igihe kingana iki mu mihango ?</Text>
                   
                    <Picker  itemStyle={{fontSize:20,color:"white"}}
                        style={{ marginBottom:20,width:"80%"}}
                        selectedValue={numberPicked}
                        onValueChange={(itemNumber) => setNumberPicked(itemNumber)}>
                        {[1, 2, 3, 4, 5, 6, 7].map(num => (
                            <Picker.Item key={num} label={num.toString()} value={num.toString()} />
                        ))}
                    </Picker>
                </View>
                <Pressable className="pb-8" onPress={HandlePicker}>
                    <ButtonComp title={"Komeza"} />
                </Pressable>
            </ImageBackground>
        </View>
    )
}
export default Second;
