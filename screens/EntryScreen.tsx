import React, { useEffect } from 'react';
import { useStoreState } from '../hooks';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Title, Avatar, Text, IconButton, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from './index';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

type Props = StackScreenProps<MainStackParamList, 'Profile'>

const EntryScreen: React.FC<Props> = ({route, navigation}) => {
  const entry = useStoreState(state => state.entries.items.get(route.params.id))

  useEffect(() => {

  })

  const avatar = (
    entry ?
    <Avatar.Text 
      label={entry.author.name.split(' ').map(x => x[0]).join('')}
      size={40}
    />
    : null
  )

  return (
    <ScrollView style={styles.container}>
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
        <Title style={styles.content}>{entry?.content}</Title>
        <FAB
          style={styles.fab}
          icon="reply"
        />
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  main: {
    height: 300,
    backgroundColor: 'red',
    paddingHorizontal: 25,
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
    marginVertical: 40,
  },
  fab: {
    position: "absolute",
    right: 0,
    bottom: -25,
    marginRight: 25,
  }
})

export default EntryScreen