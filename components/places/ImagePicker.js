import { Ionicons } from "@expo/vector-icons";
import { launchCameraAsync, launchImageLibraryAsync } from "expo-image-picker";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import CustomButton from "../ui/CustomButton";

function ImagePicker() {
  const [pickedImage, setPickedImage] = useState();

  async function takeImageHandler() {
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.assets[0].uri);
  }

  async function chooseImageHandler() {
    const image = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.assets[0].uri);
  }

  let imagePreview = (
    <Ionicons name="image" size={78} color={"#ccc"} />
  );

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <CustomButton icon="camera" onPress={takeImageHandler}>
            Utwórz zdjęcie
          </CustomButton>
        </View>

        <View style={styles.buttonWrapper}>
          <CustomButton icon="image" onPress={chooseImageHandler}>
            Wybierz zdjęcie
          </CustomButton>
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
