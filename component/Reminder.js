import React, { useState } from 'react';
import { View, Text,Pressable,ImageBackground, } from 'react-native';
import {  AntDesign, } from '@expo/vector-icons';
import tw from 'twrnc';


export default function Reminders({navigation}) {
    return (
      <View style={[tw `flex-1`]}>
        <ImageBackground   source={require('../assets/backgr.png')} style={[tw `flex-1`]}>
        <View className="flex-row  bg-[#f471ab] mb-12  pt-20 px-5  gap-x-20">
        <AntDesign name='left' size={23} color='white' style={tw` text-2xl font-bold`} />
        <Text className="text-2xl font-bold text-white text-center  pb-1">Kukwibutsa</Text>
                </View>
                <Text className="text-white px-6 text-2xl font-bold">Urunigi</Text>
                <View className="bg-transparent flex-column pt-1 top-6 w-80  px-1 py-1 left-5  gap-2">
            <Pressable onPress={() => {navigation.navigate('ovulation')}}
            className="flex-row justify-between border-b-2 border-[#fcc8e0] w-[340]">
                    <Text className="text-white py-1 font-bold text-lg">Ovurasiyo</Text>
                    <AntDesign name='right' size={2} color='#fcc8e0' style={tw` text-lg font-bold`} />
                </Pressable>

                <Pressable  onPress={() => {navigation.navigate('Fertile')}}
                className="flex-row justify-between border-b-2 border-[#fcc8e0] w-[340]">
                    <Text className="text-white py-1 font-bold text-lg">Uburumbuke</Text>
                    <AntDesign name='right' color='#fcc8e0' style={tw` text-lg`} />
                </Pressable>
                
                </View> 
         </ImageBackground>
    </View>
    
    );
  }