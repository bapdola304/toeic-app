import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../../screens/home/HomeScreen';
import DetailScreen from '../../screens/home/DetailScreen';

const Stack = createStackNavigator();

export const HomePageNavigator = () => (
    <Stack.Navigator initialRouteName = 'Home' headerMode = 'none'>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Oder' component={DetailScreen} />
    </Stack.Navigator>
  );