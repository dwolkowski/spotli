import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import { fetchPlaces } from "../util/database";
import PlaceMarkers from "../components/places/PlaceMarkers";

function PlaceMap({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  let initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };

  const region = {
    latitude: initialLocation ? initialLocation.lat : 51.1093,
    longitude: initialLocation ? initialLocation.lng : 17.0598,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  };

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation
        showsMyLocationButton
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        region={region}
        zoomEnabled={true}
        zoomControlEnabled={true}
      >
        <PlaceMarkers places={loadedPlaces} />
      </MapView>
    </View>
  );
}

export default PlaceMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: "100%",
    width: "100%",
  },
});
