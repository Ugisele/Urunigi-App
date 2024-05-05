import React, { useState } from 'react';
import { View, Text, Pressable, Switch, ImageBackground, } from 'react-native';
import { Agenda, Calendar } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import { AntDesign, } from '@expo/vector-icons';
import tw from 'twrnc';

export default function Fertile() {
    const [nextPeriod, setNextPeriod] = useState('')
    const [userData, setUserData] = useState('')
    const [ovulDate, setOvulDate] = useState('')
  
    const user  = getItemAsync("user")
   
   const [userExists, setUserExists] = useState([])
    getItemAsync('userId').then((dat) => {
      setUserExists(dat)
    }).catch((err) => {
      console.log(err)
    });
  
    useEffect(() => {
      setUserData(userExists);
      handleFecth(userExists);
  }, [userExists])
  const handleFecth = async (userData) => {
      try {
          const result = await getDoc(doc(DB, "user", userData))
          const resultData = result.data()
          setNextPeriod(resultData.nextDate)
          setOvulDate(resultData.ovulDate)
  
  
      } catch (error) {
          console.log(error);
      }
  }
    return (
        <View className='flex-1 bg-[#f97fb6] flex-col w-[vw] h-[vh] px-1' >
            {/* <ImageBackground source={require('../assets/onboard2.png')}> */}
            
            <View className="flex-row  bg-[#f471ab] mb-12  pt-16 gap-10">
                <AntDesign name='left' size={23} color='white' style={tw` text-2xl font-bold`} />
                <Text className="text-2xl font-bold text-white text-center  pb-1">Uburumbuke</Text>
            </View>
            <View className="flex flex-col gap-6">
                <View className="bg-[#fa99c4] flex-col w-[380] px-2  py-1 gap-2">
                    <View className="flex-row justify-between  items-center gap-1 border-b-2 border-[#fcc8e0]">
                        <Text className="text-white py-1  font-bold">Itagiriro ry'imihango</Text>
                        <Pressable>
                            <Switch thumbColor={'white'}/>
                        </Pressable>
                    </View>

                    <View className="flex-row justify-between border-b-2 border-[#fcc8e0]">
                        <Text className="text-white py-1 font-bold">{nextPeriod}</Text>

                    </View>
                    <View className="flex-column justify-between border-b-2 border-[#fcc8e0]">
                        <Text className="text-white py-1 font-bold">Icyibukwa</Text>
                        <Text className=" text-white  font-bold">Itegure, Iminsi y'Uburumbuke iregereje</Text>
                    </View>

                </View>
                <View className="bg-[#fa99c4] flex-col w-[380] px-2  py-1 gap-2 ">
                    <View className="flex-row justify-between  items-center gap-1 border-b-2 border-[#fcc8e0]">
                        <Text className="text-white py-1  font-bold">Itagiriro ry'imisemburo</Text>
                        <Pressable>
                            <Switch thumbColor={'white'}/>
                        </Pressable>
                    </View>

                    <View className="flex-row justify-between border-b-2 border-[#fcc8e0]">
                        <Text className="text-white py-1 font-bold">{ovulDate}</Text>

                    </View>
                    
                    <View className="flex-column justify-between border-b-2 border-[#fcc8e0]">
                        <Text className="text-white py-1 font-bold">Icyibukwa</Text>
                        <Text className=" text-white  font-bold">Itegure, Iminsi y'Uburumbuke iregereje</Text>
                    </View>

                </View>
                <View className="bg-[#fa99c4] flex-col w-[380] px-2  py-1 gap-2 ">
                    <View className="flex-row justify-between  items-center gap-1 border-b-2 border-[#fcc8e0]">
                        <Text className="text-white py-1  font-bold">Guhagarara kw'imihango</Text>
                        <Pressable>
                            <Switch thumbColor={'white'}/>
                        </Pressable>
                    </View>

                    <View className="flex-row justify-between border-b-2 border-[#fcc8e0]">
                        <Text className="text-white py-1 font-bold">Nyibutsa</Text>
                    </View>

                    <View className="flex-column justify-between border-b-2 border-[#fcc8e0]">
                        <Text className="text-white py-1 font-bold">Icyibukwa</Text>
                        <Text className=" text-white  font-bold">Itegure, Iminsi y'Uburumbuke iregereje</Text>
                    </View>
                </View>
            </View>
            {/* </ImageBackground> */}
        </View>
    );
}