import React, { useState, useEffect } from "react";
import { useStoreAction, useStoreState } from "../hooks";
import Entry from "./Entry";
import { Text, Button, ActivityIndicator, List, Searchbar } from "react-native-paper";
import { View, FlatList, StyleSheet } from "react-native";
import entriesModel, { EntryModel } from "../model/entry";

// fetch INITIAL_COUNT entries at the start
const INITIAL_COUNT = 20

// fetch NEXT_COUNT entries subsequently
const NEXT_COUNT = 5

type Props = {
  header: React.ReactElement
}

const EntryList: React.FC<Props> = (props) => {
  const [isLoading, setLoading] = useState(false);
  const retrieve = useStoreAction(actions => actions.entries.retrieveEntries)
  const entries = useStoreState(state => state.entries.items, (prev, next) => prev !== next)

  const entriesArray = Array.from(entries.values())

  // retrieve entries onComponentMount
  useEffect(() => {
    fetchInitial()
  }, [])

  const fetchMore = () => {
    const lastEntry = entriesArray[entriesArray.length-1]
    if (!isLoading) {
      setLoading(true)
      retrieve({
        count: NEXT_COUNT,
        from_id: lastEntry?.entry_id
      })
        .finally(() => setLoading(false))
    }
  }

  const fetchInitial = () => {
    if (!isLoading) {
      setLoading(true)
      retrieve({
        count: INITIAL_COUNT
      })
        .finally(() => setLoading(false))
    }
  }

  const footer = (
    <View style={styles.footer}>
      <ActivityIndicator/>
    </View>
  )
  const header = (
    <>
    <List.Subheader>Recent</List.Subheader>
    </>
  )

  return (
    <FlatList 
      data={entriesArray} 
      contentContainerStyle={styles.content}
      keyExtractor={item => item.entry_id} 
      renderItem={item => 
        <Entry 
          id={item.item.entry_id}
          name={item.item.author.name}
          content={item.item.content}
          likesCount={item.item.liked_by.length}
        />
      }
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        <>
        {props.header}
        {header}
        </>
      }
      ListFooterComponent={
        isLoading ? footer : null
      }
      initialNumToRender={INITIAL_COUNT}
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