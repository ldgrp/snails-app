import React, { useEffect, useState, useCallback } from 'react';
import { useStoreAction, useStoreState } from '../hooks';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Title, Avatar, Text, IconButton, FAB, ActivityIndicator, Appbar } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { EntryModel } from '../model/entry';
import EntryList from '../components/EntryList';
import { useNavigation, useRoute } from '@react-navigation/native';
import ReplyList from '../components/ReplyList';

const EntryScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { entry } = route.params
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
  }, [])

  const avatar = (
    entry ?
    <Avatar.Text 
      label={entry.author.name.split(' ').map(x => x[0]).join('')}
        style={{backgroundColor: "#7030a0"}}
      size={40}
    />
    : null
  )

  return (
    <ReplyList
      entry_id={entry.entry_id}
      header={
      <SafeAreaView style={styles.main}>
        <LinearGradient
        // Background Linear Gradient
        colors={['red', 'blue']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 1}}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: -500,
          height: styles.main.height+500,
        }}
        />
        <Appbar.BackAction style={{marginLeft: -10}} onPress={() => navigation.goBack()}/>
        <View style={styles.contentContainer}>
          <Title style={styles.content}>{entry?.content}</Title>
        </View>
        <View style={styles.authorContainer}>
          {avatar}
          <View style={styles.authorTextContainer}>
          <Text style={styles.authorName}>
            {entry?.author.name}
          </Text>
          <Text style={styles.authorUsername}>
            @{entry?.author.username}
          </Text>
          </View>
        </View>
        <FAB
          style={styles.fab}
          icon="reply"
          onPress={() => navigation.navigate('Create Reply', {entry_id: entry?.entry_id})}
        />
      </SafeAreaView>
      }
      sectionText={"Replies"}
    />
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'blue'
  },
  main: {
    height: 300,
    backgroundColor: 'red',
    paddingHorizontal: 25,
    zIndex: 100,
  },
  repliesContainer: {
    marginVertical: 20,
  },
  contentContainer: {
    marginTop: 10,
  },
  authorContainer: {
    position: "absolute",
    margin: 20,
    bottom:0,
    flexDirection: "row",
    alignItems: "center"
  },
  authorTextContainer:{
    marginLeft: 10,
  },
  authorUsername: {
    fontSize: 15,
    color: "white",
    opacity: 0.8,
  },
  authorName: {
    fontSize: 15,
    color: "white",
    opacity: 0.9,
    fontWeight: "bold"
  },
  content: {
    fontSize: 28,
    color: "white",
    opacity: 0.95,
  },
  fab: {
    position: "absolute",
    right: 0,
    bottom: -25,
    marginRight: 25,
    backgroundColor: "#7030a0"
  },
  shimmer1: {
    borderRadius: 50,
    height: 20,
    marginBottom: 24,
  },
  shimmer2: {
    borderRadius: 50,
    height: 20,
    marginBottom: 24,
  },
  shimmer3: {
    borderRadius: 50,
    height: 20,
    marginBottom: 24,

  },
})

export default EntryScreen