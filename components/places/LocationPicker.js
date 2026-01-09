import { Ionicons } from "@expo/vector-icons";
import {
  getCurrentPositionAsync,
  LocationAccuracy,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { useEffect, useState } from "react";
import { Alert, Image, Linking, StyleSheet, View } from "react-native";
import { getAddress, getMapPreview } from "../../util/location";
import OutlineButton from "../ui/OutlineButton";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

function LocationPicker({ onPickLocation }) {
  const [pickedLocation, setPickedLocation] = useState();
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const route = useRoute();

  const [locationPersmissionInfo, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng
        );
        onPickLocation({ ...pickedLocation, address: address });
      }
    }

    handleLocation();
  }, [pickedLocation, onPickLocation]);

  async function verifyPermissions() {
    if (locationPersmissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPersmissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Brak uprawnień!",
        "Aby korzystać z tej funkcji, musisz zezwolić na dostęp do lokalizacji.",
        [
          { text: "Anuluj", style: "cancel" },
          { text: "Ustawienia", onPress: () => Linking.openSettings() },
        ]
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync({
      accuracy: LocationAccuracy.Highest,
    });
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Ionicons name="map" size={78} color={"#ccc"} />;
  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <OutlineButton icon="location" onPress={getLocationHandler}>
            Akutalna lokalizacja
          </OutlineButton>
        </View>
        <View style={styles.buttonWrapper}>
          <OutlineButton icon="map" onPress={pickOnMapHandler}>
            Wybierz na mapie
          </OutlineButton>
        </View>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    witdth: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#00ccdd",
    borderRadius: 10,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
  },
  buttonWrapper: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
