import React, { useContext, useState ,useEffect} from "react";
import { View, Text, Pressable, ImageBackground, KeyboardAvoidingView,Dimensions,ActivityIndicator } from "react-native";
import { TextInput,} from "react-native-paper"
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { Image } from "react-native";
import ButtonComp from "./ButtonComp";
import { setItemAsync,getItemAsync } from "expo-secure-store";
import FlashMessage, {showMessage} from "react-native-flash-message";


const height=Dimensions.get('window').height;

const Login = ({ navigation }) => {


    useEffect(() => {
        const checkAuthentication = async () => {
            const userAuthenticated = await getItemAsync('userAuthenticated');
            if (userAuthenticated) {
                // navigation.navigate('Home'); 
            }
        };

        checkAuthentication();
       
    }, []);


    const auth = FIREBASE_AUTH;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [show, setShow] = useState(true);
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false);

    const isValidate = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const Validate = () => {
        let isValid = true;

        if (!email.trim()) {
            setEmailError("Email is required");
            isValid = false;
        } else if (!isValidate(email)) {
            setEmailError("Invalid email format");
            isValid = false;
        } else {
            setEmailError("");
        }
        if (!password.trim()) {
            setPasswordError("Password is required");
            isValid = false;
        } else if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            isValid = false;
        } else {
            setPasswordError("");
        }

        return isValid;
    };
    
    const handleSubmit = async () => {
        if (Validate()) {
            setLoading(true);
            try {
                const response = await signInWithEmailAndPassword(auth, email, password);
                console.log(response,"You are now signed in");
                await setItemAsync('userId', response.user.uid)
                await setItemAsync('userAuthenticated', 'true');
                    setLoading(false);
                    navigation.navigate('Home')
                }
                catch (err) {
                console.log(err,"Invalid email or password");

                    showMessage({
                        message: "Invalid creditentials!",
                        type: "danger",
                        duration: 5000,
                    autoHide: true,});
            }
            }
        };

        return (
            <View className="flex-1 h-[vh] w-[vw]" >
                <ImageBackground source={require('../assets/backgr.png')} className="flex-1">
                    <FlashMessage
                        position='top'
             style={{paddingVertical:20}}/>
                    <View className="pb-9">
                        <Image source={require('../assets/login.png')} style={{ width: 390, height: 330, position: 'absolute', }} />
                        {/* <Text style={{ color: '#d34b7c',  fontSize: 22, fontWeight: 'bold', paddingHorizontal: 30, }}>Ikaze Mutegarugori</Text> */}

                    </View>

                    <View className="flex-1 justify-center items-center pt-10">

                        <KeyboardAvoidingView behavior="height">
                    <Text style={{ color: '#d34b7c',  fontSize: 22, fontWeight: 'bold', paddingHorizontal: 2, marginVertical:18}}>Ikaze Mutegarugori</Text>

                            <TextInput
                                placeholder="Injinza Imeri Yawe"
                                placeholderTextColor={"white"}
                                textColor="white"
                                underlineColor="white"
                            outlineStyle={{borderColor: "white"}}
                            theme={{ colors: { primary: 'white', placeholder: 'white' },borderColor: 'white'  }}
                                mode="outlined"
                                value={email}
                                onChangeText={setEmail}
                                style={{
                                borderColor:'#000000',
                                    backgroundColor: '',
                                    width: 330,
                                marginBottom:10
                                }} />
                            {emailError ? <Text style={{ fontSize: 15, color: "red" }}>{emailError}</Text> : null}
                            <Pressable>
                                <TextInput
                                    secureTextEntry={visible}
                                    mode="outlined"
                                    style={{
                                        backgroundColor: '#f698c1',
                                        width: 330
                                    }}
                                    value={password}
                                    onChangeText={setPassword}
                                    underlineColor="white"
                                    textColor="white"
                                outlineStyle={{borderColor:'white'}}
                                theme={{ colors: { primary: 'white', placeholder: 'white' },borderColor: 'white'  }}
                                    placeholder='Ijambo Banga' placeholderTextColor={'white'}
                                    right={<TextInput.Icon icon={show === true ? 'eye' : 'eye-off-outline'} color='white'
                                        onPress={() => { setVisible(!visible); setShow(!show); }} />}
                                />

                            </Pressable>

                            {passwordError ? <Text style={{ fontSize: 15, color: "red" }} >{passwordError}</Text> : null}

                        </KeyboardAvoidingView>
                    </View>
                    <View className="flex gap-4 pb-4">
                        <Pressable onPress={handleSubmit}>
                            <ButtonComp title={"Injira muri Konti Yawe"} />
                        </Pressable>

                        <Pressable onPress={() => navigation.navigate("Register")}>
                            <ButtonComp title={"Fungura Konti Yawe"} />
                        </Pressable>
                    </View>

                    {loading && <ActivityIndicator size="large" color="#d34b7c" style={{ position: 'absolute', alignSelf: 'center', top: height / 2 }} />}
                </ImageBackground>
            </View>
        );
    };

    export default Login;
