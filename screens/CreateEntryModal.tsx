import React, { useState } from 'react'
import { Modal, TextInput, Text, Colors, ThemeProvider, Title, IconButton, TouchableRipple, Surface } from 'react-native-paper'
import { View, StyleSheet, TouchableHighlight } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useStoreAction } from '../hooks'

const CreatePostModal: React.FC = () => {
  const navigation = useNavigation()
  const [text, setText] = useState("")

  const addEntry = useStoreAction(actions => actions.entries.addEntry)

  const handlePost = () => {
    addEntry(text)
      .catch((e: string) => {
        console.log(e)
      })
      .finally(() => {
        navigation.goBack()
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Surface style={styles.contentContainer}>
        <View style={styles.bar}>
          <Title onPress={navigation.goBack}>Cancel</Title>
          <Title style={styles.post} onPress={handlePost}>Post</Title>
        </View>
        <TextInput 
          style={styles.input} 
          value={text} onChangeText={text => setText(text)}
          autoFocus={true}
          placeholder={"Ask a question"}
          multiline={false}/>
        <Text>
          Something something be nice...
        </Text>
        <View>

        </View>
      </Surface>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "transparent",
  },
  contentContainer: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  marker: {
    height: 10,
    width: 10,
    backgroundColor: 'grey',
  },
  post: {
    color: 'blue',
    opacity: 0.7,
  },
})

export default CreatePostModal;