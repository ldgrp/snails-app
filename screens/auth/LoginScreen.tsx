import React, { useState } from "react"
import { SafeAreaView, StyleSheet, Keyboard, TouchableWithoutFeedback, View } from "react-native"
import { TextInput, Button, Title, ActivityIndicator, Text, Caption, Subheading} from "react-native-paper"
import { useStoreState, useStoreAction } from "../../hooks"
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setLoading] = useState(false)
  const navigation = useNavigation();

  const login = useStoreAction(actions => actions.users.login)
  const isLoggedIn = useStoreState(state => state.users.isLoggedIn)

  const onRegisterPress = () => {
    Keyboard.dismiss()
    navigation.navigate('Register')
  }

  const onLoginPress = () => {
    Keyboard.dismiss()
    setLoading(true)
    login({username, password})
      .catch((msg: string) => setError(msg))
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.screen}>
          <View>
            <Title style={styles.title}>Snails</Title>
            <Caption style={styles.error}>{error}</Caption>
            <TextInput
              label="Username"
              
              value={username}
              onChangeText={text => setUsername(text)}
              style={styles.input}
            />
            <TextInput
              label="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
              style={styles.input}
            />
            {isLoading ? <ActivityIndicator color={'#0a7cff'}/> :
            <Button 
              onPress={onLoginPress} 
              disabled={username.length==0 || password.length==0}
              mode="contained"
              contentStyle={styles.buttonContent}
              color={'#0a7cff'}
            >
              Login
            </Button>
            }
          </View>

          <View style={styles.registerContainer}>
          <View style={styles.separator}/>
          <Subheading style={styles.or}>OR</Subheading>
          <Button 
            color={'#0a7cff'} 
            contentStyle={styles.buttonContent}
            mode="contained" 
            onPress={onRegisterPress}>
              Register
          </Button>
        </View>

      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 20,
    marginTop: 100,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 25,
  },
  error: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  buttonContent: {
    paddingVertical: 7,
  },
  or: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 12,
  },
  separator: {
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: "#aaa"
  },
  registerContainer: {

  },
})
export default LoginScreen