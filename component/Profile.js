import React, { useContext, useEffect, useState } from "react"
import { View, Text, ImageBackground, Image, Pressable, SafeAreaView, StatusBar } from 'react-native'
import { TextInput, Provider, useTheme } from 'react-native-paper'
import ButtonComp from "./ButtonComp";
import {  Feather } from "@expo/vector-icons";
import { getItemAsync } from "expo-secure-store";
import { getDoc, doc } from "firebase/firestore";
import { DB } from "../FirebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut,getAuth } from "firebase/auth";

const Profile = ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [userData, setUserData] = useState('')
    const [dayPicked, setDayPicked] = useState('')
    const [nextPeriod, setNextPeriod] = useState('')
    const [endPeriod, setEndPeriod] = useState('')

    useEffect(() => {
        getItemAsync('userId')
            .then((data) => {
                console.log(data);
                setUserData(data);
                handleFecth(data);
                // fetchEvent(data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    const handleFecth = async (userData) => {
        try {
            const result = await getDoc(doc(DB, "user", userData))
            const resultData = result.data()
            console.log(resultData);
            setName(resultData.registerUserName)
            setEmail(resultData.registerEmail)
            setDayPicked(resultData.Dayselected)
            setNextPeriod(resultData.nextDate)

            
        } catch (error) {
            console.log(error);
        }
    }

    const auth = getAuth();
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userData')
            await signOut(auth);
            console.log('Sign-out successful.');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
        })}
        catch (error) {
            console.error('An error occurred during sign-out:', error);
        }
    };
    return (
        <View className="flex-1 h-[vh] w-[vw]">
            <StatusBar style='auto' />
            <ImageBackground source={require('../assets/backgr.png')} className="flex-1  ">

                <SafeAreaView className='flex flex-row justify-between p-5 pt-12'>
                    <Pressable>
                        <Feather name='chevron-left' size={25} color={'#d4e0e0'} />
                    </Pressable>
                    <Pressable onPress={() => { navigation.navigate('edit', userData) }}>
                        <Feather name='edit' size={25} color={'#d4e0e0'} />
                    </Pressable>
                </SafeAreaView>
                <Provider>
                    <View className='flex-1 items-center justify-center '>
                        <View className='rounded-full bg-[#d4e0e0] w-28 h-28 '>
                            <Image source={require('../assets/on.png')} className='w-24 h-24 '/>
                        </View>
                        <Text className='text-white text-2xl pt-4 pb-10'>Uzuza ibikuranga</Text>

                        <View className=' w-[380px] h-[200px] bg-[#fa99c4]'>

                            <Text className='text-white text-xl pl-4 mb-5'>Izina ryawe: {name}</Text>
                            <Text className='text-white text-xl pl-4 mb-5' >Imeri yawe: {email}</Text>
                             <Text className='text-white text-xl pl-4 mb-5'> Iminsi Umara mumihango: {dayPicked}</Text>
                             <Text className='text-white text-xl pl-4 mb-5'>Iminsi y'Imihango izagarukar: {nextPeriod}</Text>
                             
                        </View>
                    </View>
                </Provider>
        
                    {/* <Logout title={'Sohokamo'}/> */}
                    <Pressable className='mb-12' onPress={handleLogout} >
                        <ButtonComp title={'Sohokamo'} />
                    </Pressable>             
            </ImageBackground>
        </View>
    )
}

export default Profile;