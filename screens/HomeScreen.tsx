import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Platform } from 'react-native';
import EntryList from '../components/EntryList';
import { Searchbar, FAB, Portal, Appbar, Title } from 'react-native-paper';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const Bar = () => {
  const navigation = useNavigation()
  return (
  <Appbar style={styles.bar}>
    <View>
      <Appbar.Action
        icon="camera"
        onPress={() => navigation.navigate('Camera')}
      />
    </View>
    <View>
      <Title>
        pocketCampus
      </Title>
    </View>
    <View>
      <Appbar.Action
        icon="chat"
        onPress={() => navigation.navigate('MessageStack')}
      />
    </View>
  </Appbar>
  )
}

const HomeScreen = () => {
  const [openModal, setOpenModal] = useState(false)
  const [searchText, setSearchText] = useState("")
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar style="dark"/>
      <EntryList 
        header={
        <View style={styles.container}>
            <Bar/>
            <Searchbar 
              value={searchText}
              onChangeText={text => setSearchText(text)}
              style={{borderRadius:50, marginHorizontal:16}}
              placeholder="Search"
            />
        </View>
        }
        fetchInitialCount={20}
        fetchNextCount={10}
        sectionText={"Recent"}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('Create Post')}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#eee',
  },
  container: {
    marginBottom: 20,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0
  },
  bar: {
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    marginBottom: 20,   
    shadowOpacity: 0,
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#00000000"
  },
})

export default HomeScreen