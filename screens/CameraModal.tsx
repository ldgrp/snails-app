import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { BarCodeScanner, BarCodeEvent, BarCodeScannerResult } from 'expo-barcode-scanner';
import { Appbar, Button, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { white, red100 } from 'react-native-paper/lib/typescript/src/styles/colors';
import { StatusBar } from 'expo-status-bar';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation()

  const [result, setResult] = useState<BarCodeScannerResult>()

  useEffect(() => {
    
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

  }, []);

  const handleBarCodeScanned = (params: BarCodeEvent) => {
    setResult(params)
    alert(params.data)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light"/>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={styles.camera}
      >
        <SafeAreaView>
          <View style={{margin: 10, alignItems: "flex-end"}}>
          <IconButton 
            icon="close" 
            size={30} 
            style={{backgroundColor: "transparent"}} 
            color="white" 
            onPress={() => navigation.navigate("EntryStack")}
          />
          </View>
          { result && result.bounds ?
          <View style={{
            backgroundColor: 'transparent',
            width: result.bounds.size.width,
            height: result.bounds.size.height,
            left: result.bounds.origin.x,
            top: result.bounds.origin.y,
            position: 'absolute',
            borderWidth: 0.5,
            borderColor: "yellow",
          }}/>
          : null
          }
       </SafeAreaView>
      </BarCodeScanner>

      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  camera: {
    flex: 1,
  },
  back: {
    marginLeft: 10,
    marginTop: 10,
    color: "white",
    shadowOpacity: 1,
    shadowRadius: 7,
    shadowColor: "black",
    shadowOffset: {width: 2, height: 2},
  },
})
export default CameraScreen