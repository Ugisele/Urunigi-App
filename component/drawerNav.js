import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import Settings from './settings';

const Drawer = createDrawerNavigator();
export default function DrawerNav() {
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Settings" component={Settings} />
  </Drawer.Navigator>
}