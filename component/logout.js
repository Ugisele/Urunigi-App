import { View,Text, Pressable } from 'react-native'
import React from 'react'
import ButtonComp from './ButtonComp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut,getAuth } from "firebase/auth";

export default function Logout({navigation,title}) {

  const auth = getAuth();
     
        const handleLogout = async () => {
            try {
                
                await AsyncStorage.removeItem('userData');
        
                await signOut(auth);
                console.log('Sign-out successful.');
                // setLog(false)
                navigation.navigate('Login')
            } 
            catch (error) {
                console.error('An error occurred during sign-out:', error);
            }
        };
  return (
    
      <Pressable className="justify-center items-center" >
            <Text className="bg-white text-black text-xl w-[325] h-[48] text-center pt-2 font-bold rounded-2xl" onPress={handleLogout}>{title}</Text>
      </Pressable>
    
  )
  
}