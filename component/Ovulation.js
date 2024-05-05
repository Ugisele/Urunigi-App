import React, { useState,useEffect } from 'react';
import { View, Text, Pressable, Switch, } from 'react-native';
import { AntDesign, } from '@expo/vector-icons';
import tw from 'twrnc';
import { getDoc,updateDoc,doc } from 'firebase/firestore';
import { DB } from '../FirebaseConfig';
import { getItemAsync } from 'expo-secure-store';


export default function RemindOvulation() {
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
        <View style={[tw`flex-1 bg-[#f97fb6]`]}>

            <View className="flex-row  bg-[#f471ab] mb-12  pt-20 px-5  gap-x-20">
                <AntDesign name='left' size={23} color='white' style={tw` text-2xl font-bold`} />
                <Text className="text-2xl font-bold text-white text-center  pb-1">Iminsi y'Imihango</Text>
            </View>

            <View className="bg-[#fa99c4] flex-column w-96  px-2  py-1   gap-2">
                <View className="flex-row justify-between  items-center gap-1 border-b-2 border-[#fcc8e0]">
                    <Text className="text-white py-1  font-bold">Itangiriro ry'imihango</Text>
                    <Pressable>
                        <Switch />
                    </Pressable>

                </View>

                <View className="flex-row justify-between border-b-2 border-[#fcc8e0]">
                    <Text className="text-white py-1 font-bold">Iminsi y'imihango</Text>
                </View>
                <View className="flex-column justify-between border-b-2 border-[#fcc8e0]">
                <Text className="text-white py-1 font-bold">{nextPeriod}</Text>
                    <Text className=" text-white  font-bold">Itegure, Iminsi y'imihango iregereje</Text>
                </View>
            </View>
            <View className="bg-[#fa99c4] flex-column top-10  w-96  px-2  py-1    gap-2">
                <View className="flex-row justify-between  items-center gap-1 border-b-2 border-[#fcc8e0]">
                    <Text className="text-white py-1  font-bold">Gutangira kwa ovulation</Text>
                    <Pressable>
                        <Switch />
                    </Pressable>
                </View>
                <View className="flex-row justify-between border-b-2 border-[#fcc8e0]">
                    <Text className="text-white py-1 font-bold">Nyibutsa</Text>
                </View>
                <View className="flex-column justify-between border-b-2 border-[#fcc8e0]">
                <Text className="text-white py-1 font-bold">{ovulDate}</Text>
                    <Text className=" text-white  font-bold">Umunsi wa ovulation uregereje</Text>
                </View>
            </View>
        </View>
    );
}