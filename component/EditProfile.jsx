import React, { useEffect,useState } from "react";
import { View, Text, ImageBackground, Image, Pressable, StatusBar, KeyboardAvoidingView } from 'react-native'
import { TextInput, Provider } from 'react-native-paper'
import ButtonComp from "./ButtonComp";
import { Feather } from "@expo/vector-icons";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { DB } from "../FirebaseConfig";


const Edit = ({ navigation, route }) => {
    const [name, setName] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
   
    const rout = route.params
    // console.log('heyyyyyyyyyooooooo',rout);

    const fetchProfile = async() => {
        try {
            const resultProfile = await getDoc(doc(DB,'user',rout))
            console.log(resultProfile.data());
            setEmail(resultProfile.data().registerEmail);
            setName(resultProfile.data().registerUserName);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchProfile()  
    },[])
    const upDateProfile = async () => {
        try {
            const resultEditProfile = doc(DB, 'user', rout);
            
            await updateDoc (resultEditProfile , {
                registerUserName: name,
                registerFullName: fullName,
                registerEmail: email,
                // registerhhhhhhhh:hhhh
            })
            navigation.navigate('profile')
            
        } catch (error) {
            console.log(error);   
        }
    }
    return (
        <View className="flex-1 h-[vh] w-[vw]">
            <StatusBar style='auto' />
            <ImageBackground source={require('../assets/backgr.png')} className="flex-1  ">

                <Provider>
                    <   KeyboardAvoidingView behavior="padding" className='flex-1 items-center pt-24'>
                        <View className='rounded-full bg-[#d4e0e0] w-28 h-28 flex'>
                            <Image source={require('../assets/on.png')} className='w-24 h-24 '/>
                            {/* <Text className='text-xl text-white font-semibold justify-center align-middle items-center'>{name}</Text> */}
                            {/* <Feather name="camera" color={'white'} size={25} /> */}
                        </View>
                        <Text className='text-white text-2xl pt-4 pb-4'>Uzuza ibikuranga</Text>

                        <View className=' w-[380px] h-[168px] '>
                            <TextInput
                                mode='flat'
                                value={name}
                                onChangeText={setName}
                                placeholder='Izina rikuranga'
                                placeholderTextColor={'white'}
                                underlineColor="white"
                                textColor="white"
                                style={{
                                    width: 380,
                                    backgroundColor: 'transparent',
                                    fontSize:  20
                                }}
                                theme={{ colors: { primary: 'white', placeholder: 'white' } }}
                                right={<TextInput.Icon icon={'account'} color={'white'} size={20} />}
                            />
                            <TextInput
                                mode='flat'
                                value={fullName}
                                textColor="white"
                                onChangeText={setFullName}
                                placeholder='Izina rya mbere'
                                placeholderTextColor={'white'}
                                underlineColor="white"
                                style={{
                                    width: 380,
                                    backgroundColor: 'transparent',
                                }}
                                theme={{ colors: { primary: 'white', placeholder: 'white' } }}
                                right={<TextInput.Icon icon={'account'} color={'white'} size={20} />}
                            />

                            <TextInput
                                mode='flat'
                                value={email}
                                onChangeText={setEmail}
                                textColor="white"
                                placeholder='Imeli'
                                keyboardType="email-address"
                                placeholderTextColor={'white'}
                                underlineColor="white"
                                style={{
                                    width: 380,
                                    backgroundColor: 'transparent',
                                }}
                                theme={{ colors: { primary: 'white', placeholder: 'black' } }}
                                right={<TextInput.Icon icon={'email'} color={'white'} size={20} />}
                            />
                            <TextInput
                                mode='flat'
                                value={password}
                                onChangeText={setPassword}
                                textColor="white"
                                placeholder='Andika ijambo banga'
                                placeholderTextColor={'white'}
                                underlineColor="white"
                                style={{
                                    width: 380,
                                    backgroundColor: 'transparent',
                                }}
                                theme={{ colors: { primary: 'white', placeholder: 'black' } }}
                                right={<TextInput.Icon icon={'lock'} color={'white'} size={20} />}
                            />
                            <TextInput
                                mode='flat'
                                textColor="white"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholder="Andika ijambo banga nanone"
                                placeholderTextColor={'white'}
                                underlineColor="white"
                                style={{
                                    width: 380,
                                    backgroundColor: 'transparent',
                                }}
                                theme={{ colors: { primary: 'white', placeholder: 'black' } }}
                                right={<TextInput.Icon icon={'lock'} color={'white'} size={20} />}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </Provider>
                <Pressable className='mb-12'
                        onPress={upDateProfile}
                >
                    <ButtonComp title={'Bika neza'} />

                </Pressable>
            </ImageBackground>
        </View>
    )
}

export default Edit;