import React from 'react';
import { List, Avatar, Surface, IconButton, Text, TouchableRipple } from "react-native-paper";
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStoreAction } from '../hooks';

type Props = {
  id: string,
  name: string,
  content: string,
  likesCount: number,
}

const Entry: React.FC<Props> = (props) => {
  const likeEntry = useStoreAction(actions => actions.entries.likeEntry)
  const avatar = (
    <View style={styles.avatarContainer}>
      <Avatar.Text 
        label={props.name.split(' ').map(x => x[0]).join('')}
        size={40}
      />
    </View>
  )

  const likes = (
    <TouchableRipple
      onPress={() => likeEntry(props.id)}>
    <View style={styles.likesContainer}>
      <IconButton
        icon="heart-outline"
        />
      <Text>
        {props.likesCount}
      </Text>

    </View>
    </TouchableRipple>
  )

  const content = (
    <View style={styles.contentContainer}>
      <Text
        style={styles.contentText}
        numberOfLines={4}>
        {props.content}
      </Text>
      <Text style={styles.authorText}>
        {props.name}
      </Text>
    </View>
  )

  const navigation = useNavigation()

  return (
    <TouchableRipple
      style={styles.container}
      onPress={() => navigation.navigate("Entry", {id: props.id})}
      >
      <Surface 
        style={styles.surface}>
        {avatar}
        {content}
        {likes}
        {
  //      <List.Item
  //        title={props.content}
  //        titleNumberOfLines={4}
  //        description={props.name}
  //        left={() => avatar}
  //        right={() => likes}
  //        style={styles.contentContainer}
  //        onPress={() => navigation.navigate("Entry", {id: props.id})}
  //      />
        }
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