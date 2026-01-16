import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { Callout, Marker } from "react-native-maps";

function PlaceMarkers({ places }) {
  const navigation = useNavigation();

  function selectPlaceHandler(id) {
    navigation.navigate("PlaceDetails", {
      placeId: id,
    });
  }

  return places.map((place) => {
    return (
      <Marker
        key={place.id}
        coordinate={{
          latitude: place.location.lat,
          longitude: place.location.lng,
        }}
      >
        <Callout onPress={() => selectPlaceHandler(place.id)}>
          <View style={{padding: 10, alignItems: "center"}}>
              <Text style={{fontSize: 18, fontWeight: "bold"}}>{place.title}</Text>
              <Text style={{fontSize: 10, color:"#999"}}>Pokaż szczegóły</Text>
          </View>
        </Callout>
      </Marker>
    );
  });
}

export default PlaceMarkers;
