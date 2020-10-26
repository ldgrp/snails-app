import React, { useState } from 'react'
import { TextInput, Button, Caption, Headline, Appbar, ActivityIndicator } from 'react-native-paper'
import { View, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native'

import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardStackParamList } from '../types';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useStoreAction } from '../../hooks';


const RegisterScreen = () => {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState("")
  const [isLoading, setLoading] = useState(false)
  const navigation = useNavigation();

  const register = useStoreAction(actions => actions.users.register)

  const onRegister = () => {
    if (password === confirmPassword) {
      setLoading(true)
      register({name, username, password})
        .catch((msg: string) => setError(msg))
        .finally(() => setLoading(false))
    } else {
      setError("Passwords must match.")
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <SafeAreaView style={styles.container}>
      <View style={{padding: 20}}>
        <Appbar.BackAction style={{marginLeft: -10, marginTop: -10}} onPress={() => navigation.goBack()}/>
        <Headline>Welcome to pocketCampus</Headline>
        <Caption>We're glad to have you.</Caption>
        <View style={styles.inputContainer}>
          <Caption>{error}</Caption>
          <TextInput 
            style={styles.input} 
            label="Name" 
            value={name} 
            onChangeText={setName}/>
          <TextInput 
            style={styles.input} 
            label="Username" 
            value={username} 
            onChangeText={setUsername}/>
          <TextInput 
            style={styles.input} 
            secureTextEntry={true} 
            label="Password" 
            value={password} 
            onChangeText={setPassword}/>
          <TextInput 
            style={styles.input} 
            secureTextEntry={true} 
            label="Confirm Password" 
            value={confirmPassword} 
            onChangeText={setConfirmPassword}/>
          {isLoading ? <ActivityIndicator/> :
          <Button 
            contentStyle={{paddingVertical: 6}} 
            disabled={username.length == 0 || password.length == 0}
            mode="contained"
            onPress={onRegister}>
              Register
          </Button>
          }
        </View>
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  inputContainer: {
    marginTop: 40,
  },
  buttonLabel: {
    fontSize: 18,
  },
  buttonContent: {
    paddingVertical: 7,
  },
  input: {
    marginBottom: 15,
  },
})

export default RegisterScreen