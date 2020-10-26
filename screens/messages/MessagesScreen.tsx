import { useNavigation } from '@react-navigation/native'

import React, { useCallback, useEffect, useState } from 'react'
import { useStoreAction, useStoreState } from '../../hooks'
import { SafeAreaView, FlatList, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Avatar, List, Text } from 'react-native-paper'
import { Item } from 'react-native-paper/lib/typescript/src/components/List/List'
import { StatusBar } from 'expo-status-bar'

const footer = () =>
  <View style={{paddingVertical: 16}}>
    <ActivityIndicator/>
  </View>
const MessagesScreen = () => {
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const navigation = useNavigation()
  const now = Date.now()

  const threads = useStoreState(state => state.messages.threads)
  const getMessages = useStoreAction(actions => actions.messages.getMessages)
  const user = useStoreState(state => state.users.user)

  const fetchMessages = useCallback(() => {
    if (!loading) {
      setLoading(true)
      getMessages({})
        .finally(() => setLoading(false))
    }
  }, [])

  const handleRefresh = () => {
    setRefreshing(true)
    getMessages({}).finally(() => setRefreshing(false))
  }

  useEffect(() =>
    fetchMessages()
  , [])

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
    <SafeAreaView style={{flex: 1}}>
      <StatusBar style="dark"/>
      <View style={styles.container}>
      <FlatList
        data={Object.keys(threads)}
        keyExtractor={item => item}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        renderItem={item =>
          <List.Item 
            style={styles.item}
            left={() => <Avatar.Text label={threads[item.item].to.name.split(' ').map(x => x[0]).join('')} size={50}/>}
            right={() => <Text style={{paddingVertical: 10, color: "gray"}}>{toRelativeDate(now, threads[item.item].messages[0].created_at)}</Text>}
            title={threads[item.item].to.name} 
            description={threads[item.item].messages[0].content } 
            onPress={()=>{navigation.navigate("Message", {receiver: threads[item.item].to})}}/>
        }
        ListFooterComponent={loading ? footer : null}
      />
      </View>
    </SafeAreaView>
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
})

export default MessagesScreen