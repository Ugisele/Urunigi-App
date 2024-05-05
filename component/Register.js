import React, {useState } from "react"
import { View, Image, Text, Pressable, StyleSheet, KeyboardAvoidingView,Dimensions, ImageBackground, ActivityIndicator } from "react-native";
import { TextInput,} from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { DB, FIREBASE_AUTH } from "../FirebaseConfig";
import ButtonComp from "./ButtonComp";
import { setDoc,  doc,  getDoc } from "firebase/firestore";
import { setItemAsync } from "expo-secure-store";
import { Picker } from '@react-native-picker/picker';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const Register = ({ navigation }) => {

    const auth = FIREBASE_AUTH

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setemailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(true);
    const [numberPicked, setNumberPicked] = useState('');
    const [errorPicked, setErrorPicked] = useState('')


    const [loading, setLoading] = useState(false); 

    const isValidate = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }
    const Validate = () => {
        let isValid = true

        if (!email.trim()) {
            setemailError("Email is required")
            isValid = false;
        } else if (!isValidate(email)) {
            setemailError("Invalid email format")
            isValid = false;
        } else {
            setemailError("")
        }
        if (!password.trim()) {
            setPasswordError('password is required')
            isValid = false;
        } else if (password.length < 8) {
            setPasswordError('password must be at least 8 characters')
            isValid = false;
        } else {
            setPasswordError('')
        }
        if (password !== confirmPassword) {
            setPasswordsMatch(false)
            isValid = false;
        } else {
            setPasswordsMatch(true)
        }
        if (!numberPicked.trim()) {
            setErrorPicked('Banza uhitemo umubare')
            isValid = false;  
        }else {
            setErrorPicked('')
        }
        return isValid
    };
    const passwordVisibility = () => {
        setShowPassword(!showPassword)
    }
    const handleSubmit = async () => {
        // HandlePicker()
        if (Validate()) {
            setLoading(true);
            try {
                const { user } = await createUserWithEmailAndPassword(auth, email, password)
                console.log(user);
                console.log('Successfully created', user);
                await setDoc(doc(DB, "user",  user.uid),  {
                    registerUserName: username,
                    registerEmail: email,
                    Dayselected: numberPicked,
                })

               await setItemAsync('userId', user.uid)

                setLoading(false); 
                navigation.navigate('Login')
            }catch (err) {
                console.log("Error creating user:", err.message) 
            }
            console.log(username, email, password);
        }
    }
    return (
        <View className="flex-1 h-[vh] w-[vw]">
            <ImageBackground source={require('../assets/backgr.png')} className="flex-1">
                <View className="pb-9">
                    <Image source={require('../assets/login.png')} style={{ width: 390, height: 330, position: 'absolute', }} />
                    <Text style={{ color: '#d34b7c', top: 270, fontSize: 22, fontWeight: 'bold', position: 'absolute', paddingHorizontal: 30, }}>Ikaze Mutegarugori</Text>
                </View>

                <View className="flex-1 justify-center items-center top-20 mt-12 ">

                    <KeyboardAvoidingView behavior="height">
                        <TextInput
                            placeholder="Injinza Izina"
                            placeholderTextColor={'white'}
                            underlineColor="white"
                            textColor="white"
                            mode="flat"
                            value={username}
                            onChangeText={setUsername}
                            theme={{ colors: { primary: 'white', placeholder: 'white' } }}
                            style={{
                                backgroundColor: 'transparent',
                                width: 330
                            }} />
                        <TextInput
                            placeholder="Injinza Imeri Yawe"
                            placeholderTextColor={"white"}
                            underlineColor="white"
                            textColor="white"
                            mode="flat"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            theme={{ colors: { primary: 'white', placeholder: 'white' } }}
                            style={{
                                backgroundColor: 'transparent',
                                width: 330
                            }} />
                        {emailError ? <Text style={{ fontSize: 15, color: "red" }}>{emailError}</Text> : null}

                        <TextInput
                        placeholder="Ijambo Banga"
                        placeholderTextColor={"white"}
                        textColor="white"
                        underlineColor="white"
                        theme={{ colors: { primary: 'white', placeholder: 'white' ,} }}
                            secureTextEntry={visible}
                            mode="flat"
                            style={{
                                backgroundColor: 'transparent',
                                width: 330
                            }}
                            value={password}
                            onChangeText={setPassword}
                            
                           
                            right={<TextInput.Icon icon={show === true ? 'eye-off-outline' : 'eye'} color='white'
                                onPress={() => { setVisible(!visible); setShow(!show); }} />}
                        />
                        {passwordError ? <Text style={{ fontSize: 15, color: "red" }} >{passwordError}</Text> : null}
                        <TextInput
                            secureTextEntry={visible}
                            mode="flat"
                            style={{
                                backgroundColor: 'transparent',
                                width: 330
                            }}
                            value={confirmPassword}
                            onChangeText={text => { setConfirmPassword(text); setPasswordsMatch(text === password); }}
                            
                            textColor="white"
                            placeholder='Ijambo Banga nanone' placeholderTextColor={'white'}
                            theme={{ colors: { primary: 'white', placeholder: 'white' } }}
                            right={<TextInput.Icon icon={show === true ? 'eye-off-outline' : 'eye'} color='white'
                                onPress={() => { setVisible(!visible); setShow(!show); }} />}
                        />
                        {!passwordsMatch && <Text style={{ fontSize: 15, color: 'red' }}>password don't match</Text>}

                        <View style={{ borderBottomColor:'gray', borderBottomWidth:0.8,paddingTop:10 }}>
                            <Text style={{ fontSize: 16, paddingBottom: 0,paddingLeft:5 ,color:'white'}}>Umara igihe kingana iki mu mihango ?</Text>
                            <Picker itemStyle={{ fontSize: 15, color: "white",fontSize:20 }}
                                style={{ width: "100%", paddingHorizontal: 40,color: "white" ,}}
                                selectedValue={numberPicked}
                                onValueChange={(itemNumber) => setNumberPicked(itemNumber)}>
                                {[' ',1, 2, 3, 4, 5, 6, 7].map(num => (
                                    <Picker.Item key={num} label={num.toString()} value={num.toString()} />
                                ))}
                            </Picker>
                        </View>
                        {errorPicked ? <Text style={{ fontSize: 15, color: "red" }}>{errorPicked}</Text> : null}
                        
                    </KeyboardAvoidingView>
                </View>
                <View className="flex gap-4 pb-4">
                    <Pressable onPress={handleSubmit}>
                        <ButtonComp title={"Fungura Konti Yawe"} />
                    </Pressable>
                </View>
           
                {loading && <ActivityIndicator size="large" color="#d34b7c" style={{ position: 'absolute', alignSelf: 'center', top: height / 2 }} />}
            </ImageBackground>
        </View>
    )
}
export default Register;

const styles = StyleSheet.create({
    label: {
        color: 'white',
        marginBottom: 8, 
        paddingHorizontal:10
      },
      input: {
        height: 40,
        paddingHorizontal: 8,
         
        color: 'white',
      },
})