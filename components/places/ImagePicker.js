import { Ionicons } from "@expo/vector-icons";
import { launchCameraAsync, launchImageLibraryAsync } from "expo-image-picker";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import OutlineButton from "../ui/OutlineButton";

function ImagePicker({ onTakeImage }) {
  const [pickedImage, setPickedImage] = useState();

  async function takeImageHandler() {
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
      allowsEditing: true,
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
