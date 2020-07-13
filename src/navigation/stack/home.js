import { createStackNavigator, TransitionSpecs, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../../screens/home/HomeScreen';
import PartDetailScreen from '../../screens/home/PartDetailScreen';
import PartScreen from '../../screens/home/PartScreen';
import ResultScreen from '../../screens/home/ResultScreen';

const Stack = createStackNavigator();

export const HomePageNavigator = () => (
    <Stack.Navigator 
    initialRouteName = 'Home' 
    headerMode = 'none'
    screenOptions={{
      headerShown: false,
      ...TransitionPresets.SlideFromRightIOS
    }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='PartDetail' component={PartDetailScreen} />
      <Stack.Screen name='Part' component={PartScreen} />
      <Stack.Screen name='Result' component={ResultScreen} />
    </Stack.Navigator>
  );