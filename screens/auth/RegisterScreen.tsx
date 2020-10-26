import React, { useState } from 'react'
import { TextInput, Button, Caption, Headline, Appbar } from 'react-native-paper'
import { View, StyleSheet, SafeAreaView } from 'react-native'

import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardStackParamList } from '../types';
import { LinearGradient } from 'expo-linear-gradient';
import { register } from '../../services/user-service';
import { useNavigation } from '@react-navigation/native';


const RegisterScreen = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState("")
  const navigation = useNavigation();

  const onRegister = async () => {
    if (password === confirmPassword) {
      const token = await register(username, password)
      navigation.navigate("Root")
    } else {
      setError("Passwords must match.")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{padding: 20}}>
        <Appbar.BackAction style={{marginLeft: -10, marginTop: -10}} onPress={() => navigation.goBack()}/>
        <Headline>Welcome to Snails</Headline>
        <Caption>We're glad to have you.</Caption>
        <View style={styles.inputContainer}>
          <Caption>{error}</Caption>
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
          <Button 
            contentStyle={{paddingVertical: 6}} 
            color={'#0a7cff'} 
            disabled={username.length == 0 || password.length == 0}
            mode="contained"
            onPress={onRegister}>
              Register
          </Button>
        </View>
      </View>
    </SafeAreaView>
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