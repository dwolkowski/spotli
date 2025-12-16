import {
  getCurrentPositionAsync,
  LocationAccuracy,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import CustomButton from "../ui/CustomButton";
import { getMapPreview } from "../util/location";
import { Ionicons } from "@expo/vector-icons";

function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState();
  const [locationPersmissionInfo, requirePermission] =
    useForegroundPermissions();

  async function verifyPermission() {
    if (locationPersmissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requirePermission();
      
      return permissionResponse.granted;
    }

    if (locationPersmissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Brak uprawnień.",
        "Dodaj uprawnienia dostępu do lokalizacji."
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPersmission = await verifyPermission();
    if (!hasPersmission) {
      return;
    }
    
    const location = await getCurrentPositionAsync();

    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {}

  let locationPreview = <Ionicons name="map" size={78} color={"#ccc"} />;
  if (pickedLocation) {
    locationPreview = (
      <Image style={styles.image} source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}/>
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <CustomButton icon="location" onPress={getLocationHandler}>
            Akutalna lokalizacja
          </CustomButton>
        </View>
        <View style={styles.buttonWrapper}>
          <CustomButton icon="map">
            Wybierz na mapie
          </CustomButton>
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
