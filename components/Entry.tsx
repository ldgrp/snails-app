import React, { useState, useEffect } from 'react';
import { List, Avatar, Surface, IconButton, Text, TouchableRipple } from "react-native-paper";
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStoreState, useStoreAction } from '../hooks';
import { EntryModel } from '../model/entry';

type Props = {
  entry: EntryModel
}

const Entry: React.FC<Props> = (props) => {
  const { entry } = props
  const {name} = entry.author
  const [liked, setLiked] = useState(false)

  const likeEntry = useStoreAction(actions => actions.entries.likeEntry)
  const user = useStoreState(state => state.users.user)

  useEffect(() => {
    setLiked(entry.liked_by.map(u => u.user_id).includes(user!.user_id))
  }, [entry.liked_by])

  const avatar = (
    <View style={styles.avatarContainer}>
      <Avatar.Text 
        label={name.split(' ').map(x => x[0]).join('')}
        size={40}
      />
    </View>
  )

  const likes = (
    <TouchableWithoutFeedback
      onPress={() => likeEntry({entry_id: entry.entry_id, set: !liked})}>
    <View style={styles.likesContainer}>
      {liked?
      <IconButton
        color="red"
        icon="heart"
        />
        :
      <IconButton
        icon="heart-outline"
        />
      }
      <Text>
        {entry.liked_by.length}
      </Text>

    </View>
    </TouchableWithoutFeedback>
  )

  const content = (
    <View style={styles.contentContainer}>
      <Text
        style={styles.contentText}
        numberOfLines={4}>
        {entry.content}
      </Text>
      <Text style={styles.authorText}>
        {name}
      </Text>
    </View>
  )

  const navigation = useNavigation()

  return (
    <TouchableRipple
      style={styles.container}
      onPress={() => navigation.navigate("Entry", { entry })}
      >
      <Surface 
        style={styles.surface}>
        {avatar}
        {content}
        {likes}
      </Surface>
    </TouchableRipple>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginHorizontal: 16,
  },
  surface: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
  }, 
  contentContainer: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexShrink: 1,
    flexGrow: 1,
  },
  likesContainer: {
    alignItems: 'center',
    
  },
  avatarContainer: {
  },
  contentText: {
    fontSize: 16,
  },
  authorText: {
    fontSize: 14,
  },
  likeText: {

  },
})

export default Entry;