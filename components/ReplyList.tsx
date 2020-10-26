import React, { useState, useEffect, useCallback } from "react";
import { useStoreAction, useStoreState } from "../hooks";
import Entry from "./Entry";
import { ActivityIndicator, List } from "react-native-paper";
import { View, FlatList, StyleSheet } from "react-native";
import { EntryId } from "../model/entry";

interface Props {
  header: React.ReactElement
  entry_id: EntryId
  sectionText: string
}

const ReplyList: React.FC<Props> = (props) => {

  const [isLoading, setLoading] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);

  const getReplies = useStoreAction(actions => actions.entries.getReplies)
  const replies = useStoreState(state => state.entries.replies[props.entry_id])

  // retrieve entries onComponentMount
  useEffect(() => {
     fetchInitial()
  }, [])

  const refresh = () => {
    if (!isRefreshing) {
      setRefreshing(true)
      getReplies({entry_id: props.entry_id})
        .finally(() => setRefreshing(false))
    }
  }

  const fetchInitial = useCallback(() => {
    if (!isLoading) {
      setLoading(true)
      getReplies({entry_id: props.entry_id})
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false))
    }
  }, [getReplies])

  const footer = (
    <View style={styles.footer}>
      <ActivityIndicator/>
    </View>
  )
  const section = (
    <List.Subheader>{props.sectionText}</List.Subheader>
  )

  return (
    <FlatList 
      data={replies} 
      contentContainerStyle={styles.content}
      ListHeaderComponentStyle={styles.header}
      progressViewOffset={100}
      refreshing={isRefreshing}
      onRefresh={refresh}
      ListFooterComponentStyle={styles.footer}
      keyExtractor={item => item.entry_id} 
      renderItem={item => 
        <Entry entry={item.item}/>
      }
      ListHeaderComponent={
        <>
        {props.header}
        {section}
        </>
      }
      ListFooterComponent={
        isLoading ? footer : null
      }
      initialNumToRender={10}
    />
  )
}

const styles = StyleSheet.create({
  header: {

  },
  footer: {
    paddingVertical: 16,
  },
  content: {
    flexGrow: 1
  },
})

export default ReplyList;