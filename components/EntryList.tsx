import React, { useState, useEffect, useCallback } from "react";
import { useStoreAction, useStoreState } from "../hooks";
import Entry from "./Entry";
import { ActivityIndicator, List } from "react-native-paper";
import { View, FlatList, StyleSheet } from "react-native";
import { EntryModel } from "../model/entry";

interface Props {
  header: React.ReactElement
  fetchInitialCount: number
  fetchNextCount: number
  sectionText: string
}

const EntryList: React.FC<Props> = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);
  const getEntries = useStoreAction(actions => actions.entries.getEntries)
  const _entries = useStoreState(state => state.entries.items)
  const [entries, setEntries] = useState<EntryModel[]>([])

  useEffect(() => {
    setEntries(Object.values(_entries).reverse())
  }, [_entries])

  // retrieve entries onComponentMount
  useEffect(() => {
     fetchInitial()
  }, [])

  const refresh = () => {
    const firstEntry = entries[0]
    if (!isRefreshing) {
      setRefreshing(true)
      getEntries({
        afterId: firstEntry?.entry_id
      })
        .finally(() => setRefreshing(false))
    }
  }

  const fetchMore = () => {
    const lastEntry = entries[entries.length-1]
    if (!isLoading) {
      setLoading(true)
      getEntries({
        count: props.fetchNextCount,
        beforeId: lastEntry?.entry_id
      })
        .finally(() => setLoading(false))
    }
  }

  const fetchInitial = useCallback(() => {
    if (!isLoading) {
      setLoading(true)
      getEntries({count: props.fetchInitialCount})
        .catch((e: any) => console.log(e))
        .finally(() => setLoading(false))
    }
  }, [getEntries])

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
      data={entries} 
      contentContainerStyle={styles.content}
      ListHeaderComponentStyle={styles.header}
      progressViewOffset={100}
      refreshing={isRefreshing}
      onRefresh={refresh}
      ListFooterComponentStyle={styles.footer}
      keyExtractor={item => item.entry_id.toString()} 
      renderItem={item => 
        <Entry entry={item.item}/>
      }
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        <>
        {props.header}
        {section}
        </>
      }
      ListFooterComponent={
        isLoading ? footer : null
      }
      initialNumToRender={props.fetchInitialCount}
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

export default EntryList;