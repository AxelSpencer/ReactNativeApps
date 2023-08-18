import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler'
const Blank = () => null;
import Week1 from './Week1/Week1';
import Week2 from './Week2/Week2';
import Week3 from './Week3/Week3';
import Week4 from './Week4/Week4';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Week 4: Weather App"
        screenOptions={{ headerShown: false, drawerPosition: "right" }}
      >
        <Drawer.Screen 
          name="Week 1: Setup Expo" 
          component={Week1} 
        />
        <Drawer.Screen 
          name="Week 2: Photo Gallery" 
          component={Week2} 
        />
        <Drawer.Screen 
          name="Week 3: Photo Gallery 2.0" 
          component={Week3} 
        />
        <Drawer.Screen 
          name="Week 4: Weather App" 
          component={Week4} 
        />
        <Drawer.Screen 
          name="Week 5: Empty" 
          component={Blank} 
        />
        <Drawer.Screen 
          name="Week 6: Empty" 
          component={Blank} 
        />
        <Drawer.Screen 
          name="Week 7: Empty" 
          component={Blank} 
        />
        <Drawer.Screen 
          name="Week 8: Empty" 
          component={Blank} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}