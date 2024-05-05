import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Modal, StatusBar, TouchableOpacity, Dimensions, Pressable } from 'react-native'
import { Calendar, } from 'react-native-calendars';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { DB } from '../FirebaseConfig';
import {  getDoc, doc, updateDoc } from "firebase/firestore";
import { getItemAsync } from "expo-secure-store";


const height = Dimensions.get('window').height;

const Calenda = ({ navigation, route }) => {
    const [selectedDay, setSelectedDay] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [eventTitle, setEventTitle] = useState('');
    const [events, setEvents] = useState({});
    const currentDate = new Date();
    const daysOfWeek = ['Ku cyumweru', 'Kuwa mbere', 'kuwa kabiri', 'Kuwa gatatu', 'Kuwa kane', 'Kuwa gatanu', 'Kuwa gatandatu'];
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const formattedDate = `${currentDate.getFullYear()}--${currentDate.getMonth() + 1}--${currentDate.getDate()}`;
    
    // userData and pickeddated are used in retrieving the data from database
    const [userData, setUserData] = useState('')
    const [dayPicked, setDayPicked] = useState('')
    const [nextPeriod, setNextPeriod] = useState('')
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
    }, [nextPeriod,eventTitle])

    const handleFecth = async (userData) => {
        try {
            const result = await getDoc(doc(DB, "user", userData))
            const resultData = result.data()
            console.log(resultData);
            setDayPicked(resultData.Dayselected)
            setNextPeriod(resultData.nextDate)
            setOvulDate(resultData.ovulDate)
        } catch (error) {
            console.log(error);
        }
    }
    const handleDayPress = (day) => {
        setSelectedDay(day.dateString)
        setShowModal(true)
    };

    const addDays = (date, days) => {
        const result = new Date(date)
        result.setDate(result.getDate() + days);
        return result.toISOString().split('T')[0]; //Format of date
    }

    const getMarkedDates = (start, endDate, endYellow, ovulDate) => {
        const markedDates = {};
        let currentDate = new Date(start);
        const endDateBlue = new Date(endDate);
        const ovulationDate = new Date(ovulDate);
        const endDateYellow = new Date(endYellow);
    
        while (currentDate <= endDateYellow) {
            const dateString = currentDate.toISOString().split('T')[0];
            if (currentDate <= endDateBlue) {
                markedDates[dateString] = { selected: true, marked: true, selectedColor: '#F698C1' };
            } else if (currentDate.getTime() === ovulationDate.getTime()) {
                markedDates[dateString] = { selected: true, marked: true, selectedColor: '#86d8dc' };
            } else if (currentDate >= endDateYellow) {
                markedDates[dateString] = { selected: true, marked: true, selectedColor: 'red' };
            } else {
                markedDates[dateString] = { marked: false };
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return markedDates;
    };
    const handleAddEvent = () => {
        if (eventTitle.trim() !== '') {
            const startDate = selectedDay;
            const endDate = addDays(selectedDay, dayPicked - 1);
            const ovulationDate = addDays(selectedDay, 14 - 1);
            const endDateYellow = addDays(selectedDay, 28 - 1);
            const markedDates = getMarkedDates(startDate, endDate, endDateYellow, ovulationDate);

            setEvents({
                ...events,
                ...markedDates
            });
            setEventTitle('');
            setShowModal(false);
        }
    };

    const upDatePeriodSelector = async () => {
        try {
            const eventRef = doc(DB, 'user', userData)
            const newData = {
                title: eventTitle,
                startDate: selectedDay,
                endDate: addDays(selectedDay, dayPicked - 1),
                ovulDate: addDays(selectedDay, 14 -1),
                nextDate: addDays(selectedDay, 28 - 1),
            };
            await updateDoc(eventRef, newData);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={{ paddingVertical: 45 }} className="w-[vw] h-[vh] flex-1 bg-[white] ">
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: '500' }}>{dayOfWeek}</Text>
                <Text style={{ fontSize: 20 }}>{formattedDate}</Text>
                <Pressable onPress={() => { navigation.navigate('reminder') }}>
                    <Ionicons name='notifications-outline' size={25} />
                </Pressable>
            </View>
            <View style={{ alignItems: 'center', backgroundColor: '#F698C1', height: 100, paddingTop: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: '600', color: 'white', paddingBottom: 10 }}>Icyiciro cyawe cy'imihango kizatangira </Text>
                <Text style={{ fontSize: 16, backgroundColor: 'white', height: 40, width: 250, textAlign: 'center', padding: 8, color: '#F698C1', borderRadius: 20 }}>{nextPeriod}</Text>
            </View>
            <Calendar
                onDayPress={handleDayPress}
                markedDates={{
                    ...events,
                    [selectedDay]: { selected: true, marked: true, selectedColor: '#F698C1' }
                }}
                style={{
                    height: height,
                    paddingTop: 40,
                }}
            />
            <View style={{ paddingLeft: 20 }}>
                <Modal visible={showModal} animationType="slide">
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',height: 200,width: 380 }}>
                        <TextInput
                            style={{ height: 40, width: '95%', borderColor: '#F698C1', borderWidth: 1, marginBottom: 20, borderRadius: 20 }}
                            onChangeText={text => setEventTitle(text)}
                            value={eventTitle}
                            placeholder="   Ongera icyabaye"
                            label="Andika icyo wongeraho"
                        />
                        <TouchableOpacity onPress={() => {
                            handleAddEvent()
                            // handleAddStoreEvent()
                            // handleSelected()
                            upDatePeriodSelector()

                        }} style={{ backgroundColor: '#F698C1', width: 170, height: 40, borderRadius: 20, margin: 20 }}>
                            <Text className="text-white text-center text-xl p-1">Ongera icyabaye</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowModal(false)} style={{ backgroundColor: '#F698C1', width: 170, height: 40, borderRadius: 20 }}>
                            <Text className="text-white text-center text-xl p-1" >Hagarika</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

export default Calenda;