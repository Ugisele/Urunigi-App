import React, { useContext,useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Welcome from './component/welcome';
import Second from './component/Second';
import Start from './component/Start';
import { NavigationContainer } from '@react-navigation/native';
import Calenda from './component/Calendar';
import Login from './component/Login';
import Register from './component/Register';
import Profile from './component/Profile';
import Edit from './component/EditProfile';
import Home from './component/Home';
import Settings from './component/settings';
import { Icon } from "react-native-elements";
import { myContext } from './context/Contex';
import Reminders from './component/Reminder';
import RemindOvulation from './component/Ovulation';
import Fertile from './component/ReminderFertile';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from 'react-native';
import Logout from './component/logout';
import { getItemAsync } from 'expo-secure-store';



const Stack = createStackNavigator();

const Tabs = createBottomTabNavigator();
const height=Dimensions.get('window').height;

const Drawer = createDrawerNavigator();

 function DrawerNav(){
  return(
      
    <Drawer.Navigator initialRouteName="settings"
    
   
    screenOptions={{
      
      drawerActiveTintColor: '#f698c1', 
      drawerInactiveTintColor:'white',
      
      drawerActiveBackgroundColor: 'white', 
      drawerContentContainerStyle:{backgroundColor: "#f698c1",height:height, borderRadius:40,width:400,paddingTop:80,paddingBottom:20,fontSize:20,flexDirection:'column',gap:60},
      headerShown: false,
    }}
    
    >
  <Drawer.Screen name="Mu iserukiro" component={Home} options={{ headerShown: false }} />
  <Drawer.Screen name="Umwirondoro" component={Profile} options={{ headerShown: false }} />
  <Drawer.Screen name="Imimerere" component={Profile} options={{ headerShown: false }} />
  <Drawer.Screen name="Igenamiterere" component={Settings} options={{ headerShown: false }} />
  <Drawer.Screen name="Gusohokamo" component={Logout} options={{ headerShown: false }} />
</Drawer.Navigator>
  )
}


// Define the screens for the bottom tab navigator
const TabNav = () => {

  return (
    <Tabs.Navigator

      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          {
            activeBackgroundColor = "#F698C1",
              style = {
                backgroundColor: "white"

              }
          }
          let iconName; ""
          if (route.name === "first") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Calendar") {
            iconName = focused ? "clock" : "clock-outline";
          } else if (route.name === "settings") {
            iconName = focused ? "cookie-settings" : "cookie-settings-outline";
          }
          return <Icon name={iconName} size={30} color={color} type="material-community" />;
        },
        tabBarActiveTintColor: '#F698C1',
        tabBarInactiveTintColor: '#1a1a1a',
        tabBarShowLabel: false,
        tabBarShowIcon: true,
        tabBarStyle: {
          paddingVertical: 10,
          borderWidth: 1
        }
      })}>
      <Tabs.Screen name='first' component={DrawerNav} options={{ headerShown: false }} />
      <Tabs.Screen name='Calendar' component={Calenda} options={{ headerShown: false }} />
      <Tabs.Screen name='settings' component={Settings} options={{ headerShown: false }} />
    </Tabs.Navigator>
  );
}

const StackNav = () => {
  const [userExists, setUserExists] = useState([])
  const { log } = useContext(myContext)
  getItemAsync('userId').then((dat)=>{
    console.log(dat)
    setUserExists(dat)
  }).catch((err)=>{
    console.log(err)
  });

  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='welcome' >
        {/* {userExists.length > 0 ? (<>
        
        </>) : (<>
        
        
        </>)} */}
        {/* {log ? ( */}
          <>
            <Stack.Screen name="welcome" component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name="second" component={Second} options={{ headerShown: false }} />
            <Stack.Screen name="start" component={Start} options={{ headerShown: false }} />
          </>
        {/* // ) : ( */}
          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="calendar" component={TabNav} options={{ headerShown: false }} />
            <Stack.Screen name="profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="edit" component={Edit} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={TabNav} options={{ headerShown: false }} />
            <Stack.Screen name="settings" component={TabNav} options={{ headerShown: false }} />
            <Stack.Screen name='reminder' component={Reminders} options={{ headerShown: false }} />
            <Stack.Screen name='ovulation' component={RemindOvulation} options={{ headerShown: false }} />
            <Stack.Screen name='Fertile' component={Fertile} options={{ headerShown: false }} />
            <Stack.Screen name='logout' component={Logout} options={{ headerShown: false }} />

          </>
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;