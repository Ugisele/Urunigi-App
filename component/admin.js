import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
import { Ionicons, } from '@expo/vector-icons';
import CalendarComponent from './CalendarComponents';

export default function Admin({ navigation }) {
  const currentDate = new Date();
  const daysOfWeek = ['Ku cyumweru', 'Kuwa mbere', 'kuwa kabiri', 'Kuwa gatatu', 'Kuwa kane', 'Kuwa gatanu', 'Kuwa gatandatu'];
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const formattedDate = `${currentDate.getFullYear()}--${currentDate.getMonth() + 1}--${currentDate.getDate()}`;
  return (
    <View style={styles.container} className='w-[vw] h-[vh] pt-10 px-0'>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 15, }}>
        <Text style={{ fontSize: 20, fontWeight: '500' }}>{dayOfWeek}</Text>
        <Text style={{ fontSize: 20 }}>{formattedDate}</Text>
        <Pressable onPress={() => { navigation.navigate('reminder') }}>
          <Ionicons name='notifications-outline' size={25} />
        </Pressable>

      </View>
      
      <View style={styles.datesContainer}>

        <CalendarComponent />

      </View>

      <View style={styles.users1}>
        <View>
          <Text style={styles.text3}>Total Users</Text>
          <Text style={styles.text4}>35 people</Text>
        </View>
        <Icon size={50} type='material-community' name='account-group-outline'></Icon>
        <View>
          

        </View>
      </View>
      <View style={styles.users}>
        <View>
          <Text style={styles.text3}>List of articles</Text>
          <Text style={styles.text4}>syndromes and mood articles</Text>
        </View>
        <Icon size={50} type='material-community' name='bookshelf'></Icon>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
  },
  text1: {
    color: '#3A276A',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 18,
  },
  text3: {
    fontSize: 28,
    paddingTop: 30,
    paddingBottom: 20,
  },
  text4: {
    fontSize: 20,
    paddingBottom: 20,
  },
  datesContainer: {
    backgroundColor: '#F698C1',
    height: 50,
    paddingHorizontal: 10,
    paddingBottom: 10

  },
  dates: {
    alignItems: 'center',

  },
  date: {
    color: '#F698C1',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 8,
    marginHorizontal: 5, // Add margin between dates
    backgroundColor: '#fff',
    borderRadius: 25,
    textAlign: 'center',
  },
  users1: {
    borderWidth: 2,
    borderRadius: 25,
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 30,
    alignItems: 'center',

  },
  users: {
    borderWidth: 2,
    borderRadius: 25,
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 30,
    alignItems: 'center',


  },
});
