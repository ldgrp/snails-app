import React from 'react';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import MainScreen from './screens/HomeScreen';
import { StatusBar } from 'expo-status-bar';
import { StoreProvider } from 'easy-peasy';
import store from './store';
import RootStackScreen from './screens/index'
import { NavigationContainer } from '@react-navigation/native';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
  }
}
export default function App() {
  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <StatusBar style={'dark'}/>
          <RootStackScreen/>
        </PaperProvider>
      </NavigationContainer>
    </StoreProvider>
  )
}