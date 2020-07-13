import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MainHomeScreen from '../../screens/home/MainHomeScreen';

const Stack = createStackNavigator();

export const MainHomeNavigator = () => (
    <Stack.Navigator initialRouteName = 'MainHome' headerMode = 'none'>
      <Stack.Screen name='MainHome' component={MainHomeScreen} />
    </Stack.Navigator>
  );