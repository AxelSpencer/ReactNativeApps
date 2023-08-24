import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ForecastTab from './ForecastTab';
import { Image } from 'react-native';

export type StackParamList = {
    ForecastTab5: { days: number };
    ForecastTab7: { days: number };
};

const Tab = createBottomTabNavigator<StackParamList>();

const ForecastScreen: React.FC = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="ForecastTab5" 
                component={ForecastTab}
                initialParams={{ days: 5 }}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Five day',
                    tabBarIcon: ({ color, size }) => (
                        <Image 
                            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/5NumberFiveInCircle.png'}} 
                            style={{ width: size, height: size, tintColor: color }} 
                        />
                    )       
                }} 
            />
            <Tab.Screen 
                name="ForecastTab7" 
                component={ForecastTab}
                initialParams={{ days: 7 }}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Seven Day',
                    tabBarIcon: ({ color, size }) => (
                        <Image 
                            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/7NumberSevenInCircle.png'}} 
                            style={{ width: size, height: size, tintColor: color }} 
                        />
                    )
                }} 
            />
        </Tab.Navigator>
    );
};

export default ForecastScreen;
