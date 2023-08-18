import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler'
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';

const Drawer = createDrawerNavigator();

const Week4: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName="CurrentWeather">
      <Drawer.Screen 
        name="CurrentWeather" 
        component={CurrentWeather} 
      />
      <Drawer.Screen 
        name="Forecast" 
        component={Forecast} 
      />
    </Drawer.Navigator>
  );
}

export default Week4;