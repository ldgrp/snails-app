import React from 'react'
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'
import CreatePostModal from './CreateEntryModal'
import HomeScreen from './HomeScreen'
import EntryScreen from './EntryScreen'
import LoginScreen from './auth/LoginScreen'
import { Appbar, Button, IconButton } from 'react-native-paper'
import { useStoreState } from '../hooks'
import RegisterScreen from './auth/RegisterScreen'
import CameraScreen from './CameraModal'
import MessagesScreen from './messages/MessagesScreen'
import { Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MessageScreen from './messages/MessageScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CreateReplyModal from './CreateReplyModal'


const RootStack = createStackNavigator()
const OnboardStack = createStackNavigator()
const MainStack = createBottomTabNavigator()
const ModalStack = createStackNavigator()
const MessageStack = createStackNavigator()
const EntryStack = createStackNavigator()

const modalOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: "#000000aa" },
  cardOverlayEnabled: true,
};

const OnboardStackScreen = () =>
<OnboardStack.Navigator>
  <OnboardStack.Screen
    name="Login"
    component={LoginScreen}
    options={{ headerShown: false }}
  />
  <OnboardStack.Screen
    name="Register"
    component={RegisterScreen}
    options={{ headerShown: false }}
  />
</OnboardStack.Navigator>

const MainStackScreen = () => 
  <MainStack.Navigator initialRouteName="EntryStack" tabBar={() =>null}>
    <MainStack.Screen
      name="Camera"
      component={CameraScreen}
    />
    <MainStack.Screen 
      name="EntryStack" 
      component={EntryStackScreen} 
    />
    <MainStack.Screen
      name="MessageStack"
      component={MessageStackScreen}
    />
  </MainStack.Navigator>

const EntryStackScreen = () =>
  <EntryStack.Navigator initialRouteName="Entries">
    <EntryStack.Screen
      name="Entries" 
      component={HomeScreen} 
      options ={{
        headerShown: false,
      }}
    />
    <EntryStack.Screen
      name="Entry" 
      component={EntryScreen} 
      options ={{
        headerShown: false,
      }}
    />
  </EntryStack.Navigator>

const MessageStackScreen = () => 
  <MessageStack.Navigator initialRouteName="Messages">
    <MessageStack.Screen 
      name="Messages" 
      component={MessagesScreen} 
      options ={({navigation, route}) => ({
        headerTitle: "Messages",
        headerLeft: () => <HeaderBackButton onPress={navigation.goBack}/>,
      })}
    />
    <MessageStack.Screen 
      name="Message" 
      component={MessageScreen} 
      options ={({navigation, route}) => ({
        headerTitle: "User",
        headerLeft: () => <HeaderBackButton onPress={navigation.goBack}/>,
      })}
    />
  </MessageStack.Navigator>

const RootStackScreen = () => {
  const isLoggedIn = useStoreState(state => state.users.isLoggedIn)
  console.log(isLoggedIn)
  return (
  <RootStack.Navigator>
    {!isLoggedIn ?
    <RootStack.Screen
      name="Onboard"
      component={OnboardStackScreen}
      options={{ headerShown: false }}     
    />
    :
    <RootStack.Screen
      name="ModalStack"
      component={ModalStackScreen}
      options={{ headerShown: false }}     
    />
    }
  </RootStack.Navigator>
  )
}

const ModalStackScreen = () =>
  <ModalStack.Navigator mode="modal">
    <ModalStack.Screen
      name="Main"
      component={MainStackScreen}
      options={{ headerShown: false }}     
    />
    <ModalStack.Screen 
      name="Create Reply" 
      component={CreateReplyModal}
      options={modalOptions}
    />
    <ModalStack.Screen 
      name="Create Post" 
      component={CreatePostModal}
      options={modalOptions}
    />
  </ModalStack.Navigator>


export default RootStackScreen