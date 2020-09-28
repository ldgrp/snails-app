import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CreatePostModal from './CreateEntryModal'
import HomeScreen from './HomeScreen'
import EntryScreen from './EntryScreen'
import { Appbar } from 'react-native-paper'

const RootStack = createStackNavigator()
const MainStack = createStackNavigator()

const modalOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: "#000000aa" },
  cardOverlayEnabled: true,
};

export type MainStackParamList = {
  Home: undefined
  Profile: { id: string }
}

export type RootStackParamList = {
  Main: undefined
  CreatePost: undefined
}

const MainStackScreen = () => 
  <MainStack.Navigator>
    <MainStack.Screen 
      name="Home" 
      component={HomeScreen} 
      options ={{
        headerShown: false
      }}
    />
    <MainStack.Screen 
      name="Entry" 
      component={EntryScreen} 
      options ={{
        headerShown: false
      }}
    />
  </MainStack.Navigator>

const RootStackScreen = () => 
  <RootStack.Navigator mode="modal">
    <RootStack.Screen
      name="Main"
      component={MainStackScreen}
      options={{ headerShown: false }}     
    />
    <RootStack.Screen 
      name="Create Post" 
      component={CreatePostModal}
      options={modalOptions}
    />
  </RootStack.Navigator>

export default RootStackScreen