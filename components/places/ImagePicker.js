import { Ionicons } from "@expo/vector-icons";
import { launchCameraAsync, launchImageLibraryAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, Linking, StyleSheet, View } from "react-native";
import OutlineButton from "../ui/OutlineButton";

function ImagePicker({ onTakeImage }) {
  const [pickedImage, setPickedImage] = useState();

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      const refreshResponse = await requestPermission();
      if (refreshResponse.granted) {
        return true;
      }

      Alert.alert(
        "Brak uprawnień!",
        "Aby korzystać z tej funkcji, musisz zezwolić na dostęp do aparatu.",
        [
          { text: "Anuluj", style: "cancel" },
          { text: "Ustawienia", onPress: () => Linking.openSettings() },
        ]
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {

    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  }

  async function chooseImageHandler() {
    const image = await launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  }

  let imagePreview = <Ionicons name="image" size={78} color={"#ccc"} />;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <OutlineButton icon="camera" onPress={takeImageHandler}>
            Utwórz zdjęcie
          </OutlineButton>
        </View>

        <View style={styles.buttonWrapper}>
          <OutlineButton icon="image" onPress={chooseImageHandler}>
            Wybierz zdjęcie
          </OutlineButton>
        </View>
      </View>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    witdth: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#00ccdd",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
  },
  buttonWrapper: {
    flex: 1,
  },
});
