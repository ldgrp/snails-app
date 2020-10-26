import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useStoreAction, useStoreState } from '../../hooks'
import { SafeAreaView, FlatList, StyleSheet, View, KeyboardAvoidingView, TextInput, Keyboard } from 'react-native'
import { Title, List, ActivityIndicator, Avatar, Text, Button, Caption, IconButton } from 'react-native-paper'
import { Item } from 'react-native-paper/lib/typescript/src/components/List/List'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MessageModel } from '../../model/message'
import { StatusBar } from 'expo-status-bar'

const MessageScreen = () => {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const navigation = useNavigation()
  const route = useRoute()
  const now = Date.now()

  const { receiver } = route.params!

  const thread = useStoreState(state => state.messages.threads[receiver.user_id])
  const getMessages = useStoreAction(actions => actions.messages.getMessages)
  const createMessage = useStoreAction(actions => actions.messages.createMessage)
  const user = useStoreState(state => state.users.user)
  const flatlistRef = useRef<FlatList<MessageModel>>(null)

  const handleSend = async () => {
    if (text.length > 0) {
      const content = text
      setText("")
      Keyboard.dismiss()
      await createMessage({user_id: receiver.user_id, content})
      await handleRefresh()
    }
  }

  const footer =
    <View style={{padding: 10}}>
      <View style={{flexDirection: "row", backgroundColor: "white", borderColor: "#00000044", borderRadius: 40, borderWidth: 0.5}}>
        <TextInput 
          value={text}
          onFocus={() => flatlistRef.current?.scrollToIndex({index: 0})}
          onChangeText={setText}
          style={{flexGrow: 1, padding: 10}}
          placeholder={"Type message here"}/>
        <IconButton 
          style={{ alignSelf: "center", marginLeft: 10 }} 
          icon="send" 
          color="#2382ef" 
          onPress={handleSend}/>
      </View>
    </View>

  const handleRefresh = () => {
    setRefreshing(true)
    getMessages({}).finally(() => {
      setRefreshing(false)
      flatlistRef.current?.scrollToIndex({animated: true, index: 0})
    })
  }

  useEffect(() => {
    navigation.setOptions({headerTitle: `${receiver.name}`})
    handleRefresh()
  }, [])

  const render = (item: MessageModel) =>
    item.to.user_id == receiver.user_id ? renderTo(item) : renderFrom(item)

  const renderFrom = (item: MessageModel) =>
    <View style={[styles.message, styles.from]}> 
      <Caption style={{color: "white"}}>{item.content}</Caption>
    </View>

  const renderTo = (item: MessageModel) =>
    <View style={[styles.message, styles.to]}> 
      <Caption style={{color: "black"}}>{item.content}</Caption>
    </View>

  const toRelativeDate = (now: number, date: string) => {
    const msMinute = 60 * 1000
    const msHour = msMinute * 60
    const msDay = msHour * 24
    const msYear = msDay * 365

    const elapsed = now - Date.parse(date)

    if (elapsed < msMinute) return Math.round(elapsed / 1000) + "s"
    if (elapsed < msHour) return Math.round(elapsed / msMinute) + "m"
    if (elapsed < msDay) return Math.round(elapsed / msHour) + "h"
    if (elapsed < msYear) return Math.round(elapsed / msDay) + "d"
    else return Math.round(elapsed / msYear) + "d"
  }

  return (
    <KeyboardAvoidingView style={styles.footer} behavior="padding" keyboardVerticalOffset={64}>
      <StatusBar style="dark"/>
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          data={thread.messages}
          keyExtractor={item => item.message_id}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          renderItem={item => render(item.item)}
          contentContainerStyle={{padding: 20, flexDirection: "column-reverse"}}
          onContentSizeChange={handleRefresh}
          ref={flatlistRef}
        />
        {footer}
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: "#00000022",
    borderBottomWidth: 0.5,
  },
  from: {
    backgroundColor: "#2382ef",
    color: "white",
    alignSelf: "flex-end",
  },
  to: {
    backgroundColor: "lightgrey",
    color: "black",
    alignSelf: "flex-start",
  },
  message: {
    fontSize: 14,
    padding: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  footer: {
    flex: 1,
  },
})

export default MessageScreen