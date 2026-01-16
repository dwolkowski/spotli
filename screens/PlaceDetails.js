import { useEffect, useState } from "react";
import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

import { deletePlace, fetchPlaceDetails } from "../util/database";
import OutlineButton from "../components/ui/OutlineButton";
import { openRouteMap } from "../util/location";

function PlaceDetails({ route, navigation }) {
  const [fetchedPlace, setFetchedPlace] = useState();

  function showOnMapHandler() {
    navigation.navigate("PlaceMap", {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng,
    });
  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Ładuje miejsce...</Text>
      </View>
    );
  }

  async function deletePlaceHandler() {
    Alert.alert("Czy na pewno chcecsz usunąć to miejsce?", "Usunięcie jest nieodwracalne.", [
      { text: "Anuluj", style: "cancel" },
      {
        text: "Usuń",
        style: "destructive",
        onPress: async () => {
          try {
            await deletePlace(selectedPlaceId);
            navigation.goBack();
          } catch (error) {
            Alert.alert("Błąd", "Nie udało się usunąć miejsca.");
          }
        },
      },
    ]);
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlineButton icon="map" onPress={showOnMapHandler}>
          Zobacz na mapie
        </OutlineButton>
        <OutlineButton
          icon="walk"
          onPress={() =>
            openRouteMap(fetchedPlace.location.lat, fetchedPlace.location.lng)
          }
        >
          Wyznacz trasę
        </OutlineButton>

        <View style={styles.deleteContainer}>
          <OutlineButton icon="trash" onPress={deletePlaceHandler}>
            Usuń miejsce
          </OutlineButton>
        </View>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: "#00ccdd",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  deleteContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    width: "80%",
    alignItems: "center",
    paddingTop: 10,
  },
});
