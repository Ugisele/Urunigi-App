import React, { useEffect, useState } from 'react';
import { registerTaskAsync, setNotificationHandlerAsync } from 'expo-notifications';
import { Platform } from 'react-native';
import { getDoc, doc } from 'firebase/firestore';
import { DB } from '../FirebaseConfig';
import { getItemAsync } from 'expo-secure-store';

const NotificationHandler = () => {
  const [nextPeriod, setNextPeriod] = useState('');
  const [userData, setUserData] = useState('');
  const [ovulDate, setOvulDate] = useState('');
  const [userExists, setUserExists] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getItemAsync('userId');
        setUserExists(user);
        const result = await getDoc(doc(DB, 'user', user));
        const resultData = result.data();
        setNextPeriod(resultData.nextDate);
        setOvulDate(resultData.ovulDate);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const backgroundTask = async () => {
      const currentDate = new Date();
      const OvulationDate = new Date(ovulDate);
      const nextPeriodDate = new Date(nextPeriod);
  
      // Calculate the difference between future date and current date
      const diffOnOvulation = OvulationDate - currentDate;
      const diffOnNextPeriod = nextPeriodDate - currentDate;
  
      // Calculate the threshold for ovulation date (two days)
      const thresholdForOvulation = 2 * 24 * 60 * 60 * 1000; // Two days in milliseconds

      console.log(ovulDate)
      console.log(nextPeriod)
  
      if (diffOnOvulation > thresholdForOvulation) {
        alert('Igihe  cyawe cy,uburumbuke cyiregereje!');
        // Trigger notification for ovulation date approaching
        // await scheduleNotification('Ovulation date is approaching')
      } 
      // Calculate the threshold for next period date (two days)
      const thresholdForNextPeriod = 2 * 24 * 60 * 60 * 1000; // Two days in milliseconds
  
      if (diffOnNextPeriod <= thresholdForNextPeriod && diffOnNextPeriod > 0) {
        
        alert('Igihe cyawe cy,imihango cyiregereje!');
        // Trigger notification for next period date approaching
        // await scheduleNotification('Next period date is approaching');
      }
    }

    backgroundTask()

    const task = registerTaskAsync('notification-handler', {
      taskName: 'Notification Handler',
      taskEntryPoint: Platform.OS === 'android' ? './NotificationHandler' : undefined,
      executionPeriod: 60 * 60 * 1000,
      trigger: { type: 'timeInterval', interval: 60 * 60 * 1000 },
    });

    return () => {
      if (task && task.remove) {
        task.remove();
      }
    };
  }, [ovulDate, nextPeriod]);

  return null;
};
export default NotificationHandler;