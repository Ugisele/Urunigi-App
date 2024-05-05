import React, { Children, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, Dimensions, Modal,StyleSheet ,Image,Linking,FlatList,} from 'react-native';
import { Agenda, Calendar } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import { Ionicons, Fontisto, MaterialCommunityIcons, MaterialIcons, Entypo, } from '@expo/vector-icons';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';
import { DB } from '../FirebaseConfig';
import {  getDoc, doc,} from "firebase/firestore";
import { getItemAsync } from "expo-secure-store";
import CalendarComponent from './CalendarComponents';
import NotificationHandler from './notification';


const ModalPop = ({visible, children})=>{
  const [showModals,setShowModals]=useState(visible);
  useEffect(()=>{
    toggleModals();
  },
   [visible]);
const toggleModals=()=>{
  if (visible){
    setShowModals(true)
  }else{
    setShowModals(false)
  }
}
return(
  <Modal transparent visible={showModals}>
  <View  style={styles.modalBackground}>
  <LinearGradient
         style={styles.modalContainer}
        colors={['white', '#F698C1']} 
        >
          <View>{children}</View>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <Text style={{ fontWeight:'bold',fontSize:18}}>Congratulations! </Text>
          {/* <Image source={require('../assets/congs.png')} style={{width:70,height:70,}}/> */}
          </View>

              <Text style={{color:'black',fontWeight:'bold', fontStyle:'italic'}}>it's essential to celebrate those moments of joy and positivity In this article, we'll explore how you can embrace happiness during your period and make the most of this uplifting experience.{''}</Text>
          <Text>~ Stay hydrated by drinking plenty of water throughout the day. </Text>
          <Text></Text>
          <Text onPress={()=>{
            Linking.openURL('https://www.youtube.com/watch?v=ofWBlO80mWI')
          }}>~ Here</Text>
        </LinearGradient>
  </View>
</Modal>
)
}

const ModalPoup = ({visible, children})=>{
  const [showModal,setShowModal]=useState(visible);
  useEffect(()=>{
    toggleModal();
  },
   [visible]);
const toggleModal=()=>{
  if (visible){
    setShowModal(true)
  }else{
    setShowModal(false)
  }
}
return (
  <Modal transparent visible={showModal}>
  <View  style={styles.modalBackground}>
  <LinearGradient
         style={styles.modalContainer}
        colors={['white', '#F698C1']} 
        >
          <View>{children}</View>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <Text style={{ fontWeight:'bold',fontSize:18}}>Congratulations! </Text>
          <Image source={require('../assets/congs.png')} style={{width:70,height:70,}}/>
          </View>

              <Text style={{color:'black',fontWeight:'bold', fontStyle:'italic'}}>it's essential to celebrate those moments of joy and positivity In this article, we'll explore how you can embrace happiness during your period and make the most of this uplifting experience.{''}</Text>
          <Text>~ Stay hydrated by drinking plenty of water throughout the day. </Text>
          <Text></Text>
          <Text onPress={()=>{
            Linking.openURL('https://www.youtube.com/watch?v=ofWBlO80mWI')
          }}>~ Here</Text>
        </LinearGradient>
  </View>
</Modal>
)

};

const height = Dimensions.get('window').height;


const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};
export default function Home({navigation}) {

  const [visible,setVisible]=React.useState(false);
  const [visibles,setVisibles]=React.useState(false);
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState(''); const [dayPicked, setDayPicked] = useState('')
  const [nextPeriod, setNextPeriod] = useState('')
  const [endPeriod, setEndPeriod] = useState('')
  const [userData, setUserData] = useState('')

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
          setDayPicked(resultData.Dayselected)
          setNextPeriod(resultData.nextDate)


      } catch (error) {
          console.log(error);
      }
  }

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
        }
      }
      const newItems = { ...items };
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={[tw`flex-row justify-space-between items-center`]}>
              
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderHeader = (date) => {
    const currentDate = new Date();
    const monthsOfYear = ['Mutarama', 'Gashyantare', 'Werurwe', 'Mata', 'Gicurasi', 'Kamena', 'Nyakanga', 'Kanama', 'Nzeri', 'ukwakira', 'Ugushyingo', 'Ukuboza'];
    const daysOfMonth = monthsOfYear[currentDate.getMonth()];
    const daysOfWeek = ['Kucyumweru', 'Kuwa Mbere', 'Kuwa Kabiri', 'Kuwa Gatatu', 'Kuwa Kane', 'Kuwa Gatanu', 'Kuwa Gatandatu'];
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const formattedDate = `${currentDate.getDate()}, ${currentDate.getFullYear()}`;

    return (
      <View style={[tw`pt-10 flex-row justify-between px-2 `]}>
        <Text style={[tw` text-xl font-semibold`]}>{dayOfWeek}</Text>
        <Text style={[tw` text-lg font-semibold`]}>{daysOfMonth},{formattedDate}</Text>
        <Pressable onPress={() => { navigation.navigate('reminder')}}>
        <Ionicons name='notifications-outline' size={25} />

        </Pressable>
        
      </View>
    );
  };

  const renderDay = (day, item) => {
    return (
      <TouchableOpacity

        onPress={() => setSelectedDate(day.dateString)}>

      </TouchableOpacity>
    );
  };

  return (
    <View style={{ position: 'relative', flexDirection: 'column', }}>
      <View style={{ backgroundColor: 'white', height: 90 }}>
        {renderHeader(new Date())}
      </View>

      <Agenda
        loadItemsForMonth={loadItems}
        selected={selectedDate}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        renderItem={renderItem}
        renderDay={renderDay}
      />
      <View style={[tw`bg-white h-300`]}>
        <CalendarComponent />
        <NotificationHandler />
        <View style={[tw`flex-row top-10 px-20`]}>
          <View style={[tw`flex-row top-1 justify-center text-center gap-2`]}>
            <Fontisto name='blood-drop' style={{ top: 3, color: '#f698c1' }} />
            <Text style={[tw`font-bold `]}>Current Date</Text>
          </View>
          <View style={[tw`flex-row ml-10 pt-1 gap-2`]}>
            <Fontisto name='blood-drop' style={{ top: 3, color: '#c8f0f0' }} />
            <Text style={tw`font-bold`}>Current Date</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', top: 90, paddingHorizontal: 13, gap: 50, borderWidth: 1, borderColor: '#0d4974', height: 90, width: 350, left: 22, borderRadius: 20, paddingTop: 10, }}>
          <View style={{ flexDirection: 'column', }}>
            <Text style={{ fontSize: 18, }}>Icyiciro urimo ubu</Text>

            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#fbc090',fontSize:16 }}>{nextPeriod} </Text>
            </View>

            <Pressable onPress={()=>navigation.navigate('Calendar')}>
              <Text style={{ top: 7, color: '#54487d' }}>Kanda Urebe Itangira Ry' Imihango Ikurikira</Text>
            </Pressable>
          </View>

          <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center',right:24 }}>
            <MaterialCommunityIcons name='flower' style={{ color: '#c980d2', fontSize: 27 }} />
            <Text style={{ color: '#b6e6e8', fontSize: 17 }}>☸</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', top: 110, paddingHorizontal: 13, gap: 40, borderWidth: 1, borderColor: '#0d4974', height: 90, width: 350, left: 22, borderRadius: 20, paddingTop: 10, }}>
          <View style={{ flexDirection: 'column', }}>
            <Text style={{ fontSize: 18, }}>Icyiciro Gikurikira</Text>

            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#fbc090',fontSize:16 }}>{nextPeriod} </Text>
            </View>

            <Pressable>
              <Text style={{ top: 7, color: '#54487d', top: 25 }}>Ukwezi Kwawe Kumaze Iminsi 5</Text>
            </Pressable>
          </View>

          <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Fontisto name='blood-drop' style={{ color: '#c8f0f0', fontSize: 22, left: 8, backgroundColor: '#3b2f6a', width: 40, height: 40, paddingTop: 8, borderRadius: 30, paddingHorizontal: 12 }} />
            <Text style={{ color: '#b6e6e8', fontSize: 15 }}>Ibyumweru 3</Text>
          </View>
        </View>

        <TouchableOpacity style={{ flexDirection: 'row', top: 130, paddingHorizontal: 13, gap: 40, 
        borderWidth: 1, borderColor: '#0d4974', height: 90, width: 350, left: 22, borderRadius: 20, paddingTop: 10, }} 
        onPress={()=>{
            Linking.openURL('https://www.youtube.com/watch?v=gy8I5oFlGMk')
          }}>
          <View style={{ flexDirection: 'column', }}>
            <Text style={{ fontSize: 18, top: 26 }}>Menya Ibijanye n'ukwezi kwawe</Text>
            
          </View>

          <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons name='shoe-print' style={{ color: '#c8f0f0', fontSize: 45,right:10 }} />

          </View>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', top: 150, paddingHorizontal: 13, gap: 30, borderWidth: 1, borderColor: '#0d4974', height: 90, width: 350, left: 22, borderRadius: 20, paddingTop: 10, }}>
          <View style={{ flexDirection: 'column', }}>
            <Text style={{ fontSize: 18, }}>Urumva umeze gute (moods)</Text>

            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#f5df8b' }}> Mbwira uko wiyumva</Text>
             
            </View>

            <Pressable>
              <Text style={{ top: 10, color: '#54487d' }}>You Can also Record any unsual Syptom</Text>
            </Pressable>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', right: 20, gap: 3 }}>
            <ModalPoup visible={visible}>
            <View >
              <View >
              <TouchableOpacity onPress={()=>setVisible(false)}>
              <Image source={require("../assets/false.png")} style={{width:20,height:20,left:250}} />
              </TouchableOpacity>
              </View>
             
            </View>
            </ModalPoup>
            
            <Pressable onPress={()=> setVisible(true)}><MaterialIcons name='emoji-emotions' style={{ color: '#eae458', fontSize: 25, backgroundColor: '#fabbdd',left:10 }} /></Pressable>
            
            <ModalPop visible={visibles}>
            <View >
              <View >
              <TouchableOpacity onPress={()=>setVisibles(false)}>
              <Image source={require("../assets/false.png")} style={{width:20,height:20,left:250}}/>
              </TouchableOpacity>
              </View>
             
            </View>
            </ModalPop>
            
            <Pressable onPress={()=> setVisibles(true)}><Entypo name='emoji-sad' style={{ color: '#fd4441', fontSize: 25,left:10 }} /></Pressable>
          </View>
        </View>

      </View>
    </View>

  );
}


const styles=StyleSheet.create({

  modalBackground:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0,5)',
    justifyContent:'center',
    alignItems:'center',
   

  },
  modalContainer:{
    width:'80%',
    height:'60%',
    paddingHorizontal:20,
    paddingVertical:30,
    borderRadius:20,
    elevation:20,

  }

});






