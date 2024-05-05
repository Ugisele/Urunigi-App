import { Pressable, StyleSheet, Text, View, TouchableOpacity, Image, Modal, ImageBackground, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Icon } from 'react-native-elements'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { myContext } from '../context/Contex'
import { signOut, getAuth, deleteUser } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { DB } from '../FirebaseConfig';
import { collection, addDoc, getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { deleteItemAsync, getItemAsync } from "expo-secure-store";

const ModalPoups = ({ visible, children }) => {
  const [showModal, setShowModal] = useState(visible);
  useEffect(() => {
    toggleModal();
  },
    [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true)
    } else {
      setShowModal(false)
    }
  }
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <LinearGradient // Add LinearGradient for the modal background
          style={styles.modalContainer}
          colors={['white', '#F698C1']} // Adjust gradient colors as needed
        >
          <View>{children}</View>
        </LinearGradient>
      </View>
    </Modal>
  )

};

const width = Dimensions.get('window').width;
const height = Dimensions.get("window").height;
export default function Settings({ navigation, children }) {
  const [visible, setVisible] = React.useState(false);
  const currentDate = new Date();
  const daysOfWeek = ['Ku cyumweru', 'Kuwa mbere', 'kuwa kabiri', 'Kuwa gatatu', 'Kuwa kane', 'Kuwa gatanu', 'Kuwa gatandatu'];
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const formattedDate = `${currentDate.getFullYear()}--${currentDate.getMonth() + 1}--${currentDate.getDate()}`;
  const { lightMode, handlingTheme } = useContext(myContext)


  const [userData, setUserData] = useState('')
  const [dayPicked, setDayPicked] = useState('')
  const [nextPeriod, setNextPeriod] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startDate, setStartDate] = useState('')
  const [ovulDate, setOvulDate] = useState('')


  useEffect(() => {
    getItemAsync('userId')
      .then((data) => {
        console.log(data);
        setUserData(data)
        handleFecth(data)
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
      setDayPicked(resultData.Dayselected)
      setNextPeriod(resultData.nextDate)
      setName(resultData.registerUserName)
      setEmail(resultData.registerEmail)
      setDayPicked(resultData.Dayselected)
      setEndDate(resultData.endDate)
      setStartDate(resultData.startDate)
      setOvulDate(resultData.ovulDate)
    } catch (error) {
      console.log(error);
    }
  }

  const auth = getAuth();
  const handleLogout = async () => {
    try {

      await deleteItemAsync("userAuthenticated")
      console.log('Sign-out successful.');
      auth.signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    }
    catch (error) {
      console.error('An error occurred during sign-out:', error);
    }
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: lightMode ? '#F6F6F6' : '#F698C1',
      paddingVertical: 48,
      paddingHorizontal: 20,
    }} >
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 38 }}>
        <Text style={{ fontSize: 20, fontWeight: '500', color: lightMode ? '#3A276A' : '#F6F6F6' }}>{dayOfWeek}</Text>
        <Text style={{ fontSize: 20, color: lightMode ? '#3A276A' : '#F6F6F6', }}>{formattedDate}</Text>
        <Ionicons name='notifications-outline' size={25} color={lightMode ? '#3A276A' : '#F6F6F6'} />
      </View>
      <View style={styles.settingscontainer}>

        <Pressable onPress={() => { navigation.navigate('reminder') }}
          style={{
            borderWidth: 2,
            borderRadius: 15,
            padding: 20,
            flexDirection: 'row',
            borderColor: lightMode ? '#3A276A' : '#F6F6F6',
            width: 250,
            justifyContent: 'start',
            alignSelf: 'flex-end',
          }}>
          <Ionicons name='notifications-outline' size={25} color={lightMode ? '#3A276A' : '#F6F6F6'} />
          <Text style={{
            fontSize: 18,
            color: lightMode ? '#3A276A' : '#F6F6F6',
          }}> Notifikasiyo</Text>
        </Pressable>
        <Pressable onPress={() => { navigation.navigate('profile') }}
          style={{
            borderWidth: 2,
            borderRadius: 15,
            padding: 20,
            flexDirection: 'row',
            borderColor: lightMode ? '#3A276A' : '#F6F6F6',
            width: 250,
            justifyContent: 'start',
            alignSelf: 'flex-end',
          }}>
          <Icon name='clock-outline' type='material-community' color={lightMode ? '#3A276A' : '#F6F6F6'} />
          <Text style={{
            fontSize: 18,
            color: lightMode ? '#3A276A' : '#F6F6F6',

          }}> Umwirondoro</Text>
        </Pressable>

        <Pressable onPress={() => setVisible(true)} style={{
          borderWidth: 2,
          borderRadius: 15,
          padding: 20,
          flexDirection: 'row',
          borderColor: lightMode ? '#3A276A' : '#F6F6F6',
          width: 250,
          justifyContent: 'start',
          alignSelf: 'flex-end',
        }}>
          <ModalPoups visible={visible}>
            <View >
              <View >
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <Image source={require("../assets/false.png")} style={{ width: 20, height: 20, left: 250 }} />
                </TouchableOpacity>
              </View>
              <View style={{ paddingVertical: 20, paddingTop: 30, marginTop: 20 }}>

                <Text style={{ fontSize: 18, marginBottom:7,fontStyle:'italic',}}>Izina:   {name}</Text>
                <Text style={{ fontSize: 18, marginBottom:7,fontStyle:'italic'}}>Imeli:   {email}</Text>
                <Text style={{ fontSize: 18, marginBottom:7,fontStyle:'italic'}}>Iminsi umara mu mihango:   {dayPicked}</Text>
                <Text style={{ fontSize: 18, marginBottom:7,fontStyle:'italic'}}>Igihe uzasubira mu mihango:  {nextPeriod}</Text>
                <Text style={{ fontSize: 18, marginBottom:7,fontStyle:'italic'}}>Itariki uherukira mu mihango:  {startDate}</Text>
                <Text style={{ fontSize: 18, marginBottom:7,fontStyle:'italic'}}>Itariki ya ovulation:  {ovulDate}</Text>

              </View>
            </View>
          </ModalPoups>
          <Icon name='database' type='material-community' color={lightMode ? '#3A276A' : '#F6F6F6'}></Icon>
          <Text style={{
            fontSize: 18,
            color: lightMode ? '#3A276A' : '#F6F6F6',
          }}> Injira Mu Makuru Yawe</Text>
        </Pressable>
        <Pressable style={{
          borderWidth: 2,
          borderRadius: 15,
          padding: 20,
          flexDirection: 'row',
          borderColor: lightMode ? '#3A276A' : '#F6F6F6',
          width: 250,
          justifyContent: 'start',
          alignSelf: 'flex-end',
        }} onPress={() => { handlingTheme() }}>
          <Icon name='moon-waning-crescent' type='material-community' color={lightMode ? '#3A276A' : '#F6F6F6'}></Icon>
          <Text style={
            {
              fontSize: 18,
              color: lightMode ? '#3A276A' : '#F6F6F6',
            }
          }> Pink Mode</Text>
        </Pressable>

        <Pressable onPress={handleLogout}
          style={{
            borderWidth: 2,
            borderRadius: 15,
            padding: 20,
            flexDirection: 'row',
            borderColor: lightMode ? '#3A276A' : '#F6F6F6',
            width: 250,
            justifyContent: 'start',
            alignSelf: 'flex-end',
          }}>
          <Icon name='logout' type='material-community' color={lightMode ? '#3A276A' : '#F6F6F6'}></Icon>
          <Text style={{
            fontSize: 18,
            color: lightMode ? '#3A276A' : '#F6F6F6',
          }}> Sohokamo</Text>
        </Pressable>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  text1: {
    color: '#3A276A',
    fontSize: 18,
    fontWeight: 'bold'
  },
  text2: {
    fontSize: 18,
  },
  text3: {
    fontSize: 18,
    color: '#3A276A',
  },
  setting: {
    borderWidth: 2,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    borderColor: '#3A276A',
    width: 250,
    justifyContent: 'start',
    alignSelf: 'flex-end',
  },
  settingscontainer: {
    gap: 30,
    paddingTop: 30,
    marginTop: 30
  },
  drawer: {
    width: 80,
    alignItems: 'center',
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0,5)',
    justifyContent: 'center',
    alignItems: 'center',


  },
  modalContainer: {
    width: '80%',
    height: '60%',

    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,

  }
});