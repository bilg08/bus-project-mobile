import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, Button, View, SafeAreaView} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Header} from '../components';
import BottomSheet from '@gorhom/bottom-sheet';
import Geolocation from 'react-native-geolocation-service';
import { useUserContext } from '../context/user';
import firestore from '@react-native-firebase/firestore';
type LocationType = {
  longitude: number;
  latitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  accuracy?: number;
  heading?: number;
  speed?: number;
};
export function Home() {
  const [region, _setRegion] = useState<LocationType | any>();
  const {user} = useUserContext();
  const [isUserAllowedToGiveLocation,setIsUserAllowedToGiveLocation] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<LocationType | any>();
  const mapRef = useRef<any>(null);
  const snapPoints = React.useMemo(() => ['10%', '30%'], []);
  const setUserLocation = async () => {
    Geolocation.requestAuthorization('whenInUse');
    setIsUserAllowedToGiveLocation(true);
    Geolocation.getCurrentPosition(async(pos) => {
      const position = {latitude: pos.coords.latitude,longitude:pos.coords.longitude};
      await firestore().doc('/driver/mBeFs8qvnyNqjIhfIi3u/').update({
        currentPosition: position
      })
      setCurrentPosition(position);
    });
  };
  useEffect(() => {
    if(isUserAllowedToGiveLocation) {
      setUserLocation();
    }
  }, [currentPosition]);

  return (
    <SafeAreaView style={styles.body}>
      <Header title={'Миний байршил'} />
      <MapView ref={mapRef} style={styles.map} initialRegion={region}>
        <Marker coordinate={currentPosition} />
      </MapView>
      <BottomSheet index={1} snapPoints={snapPoints}>
        <View>
          <Button onPress={() => setUserLocation()} title="Байршил хуваалцах" />
          <Button onPress={() => setUserLocation()} title="Гарах" />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}
Home.defaultProps = {
  accuracy: 5,
  speed: 1,
  heading: 1,
  latitude: 37.785834,
  longitude: -122.406417,
};
const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  map: {
    flexGrow: 1,
  },
});
