import React, { useState, useEffect } from 'react'
import { Modal, TextInput, Text, Colors, ThemeProvider, Title, IconButton, TouchableRipple, Surface, ProgressBar, Button } from 'react-native-paper'
import { View, StyleSheet, TouchableHighlight } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useStoreAction } from '../hooks'
import { EntryId } from '../model/entry'

const CreateReplyModal = () => {
  const navigation = useNavigation()
  const route = useRoute()

  const { entry_id } = route.params
  const [text, setText] = useState("")
  const [isPosting, setPosting] = useState(false)
  const [canPost, setCanPost] = useState(false)

  const createEntry = useStoreAction(actions => actions.entries.createEntry)

  useEffect(() => {
    if (text.trim().length > 0) {
      setCanPost(true)
    } else {
      setCanPost(false)
    }
  }, [text])

  console.log(entry_id)
  const handlePost = () => {
    if (!isPosting) {
      setPosting(true)
      createEntry({content:text, reply_to: entry_id})
        .catch((e: string) => {
          console.log(e)
        })
        .finally(() => {
          setPosting(false)
          navigation.goBack()
        })
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
      <ProgressBar indeterminate={true} visible={isPosting}/>
      <Surface style={styles.contentContainer}>
        <View style={styles.bar}>
          <Button 
            compact={true}
            disabled={isPosting}
            onPress={navigation.goBack}>
              Cancel
          </Button>
          <Button 
            compact={true}
            disabled={!canPost || isPosting} 
            style={styles.post} 
            onPress={handlePost}>
              Post
          </Button>
        </View>

        <TextInput 
          style={styles.input} 
          value={text} onChangeText={text => setText(text)}
          autoFocus={true}
          disabled={isPosting}
          placeholder={"Reply"}
          multiline={false}/>
        <Text>
          Something something be nice...
        </Text>
        <View>

        </View>
      </Surface>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
  },
  contentContainer: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
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

export default CreateReplyModal;