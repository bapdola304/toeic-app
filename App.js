/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar,
} from 'react-native';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import  { AppNavigator } from './src/navigation';
// import { EvaIconsPack } from '@ui-kitten/eva-icons';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
       {/* <IconRegistry icons={EvaIconsPack} /> import use icon Kitten UI */} 
      <StatusBar barStyle="#65C8D0" backgroundColor = '#17A1B0' />
      <AppNavigator />
    </ApplicationProvider>
  );
};

export default App;
