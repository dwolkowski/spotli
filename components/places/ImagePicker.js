import { Ionicons } from "@expo/vector-icons";
import { launchCameraAsync, launchImageLibraryAsync } from "expo-image-picker";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import CustomButton from "../UI/CustomButton";

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
    <Ionicons style={styles.icon} name="image" size={18} color={"#00ccdd"} />
  );

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <View style={styles.buttonContainer}>
        <CustomButton icon="camera" onPress={takeImageHandler}>
          Utwórz zdjęcie
        </CustomButton>
        <CustomButton icon="image" onPress={chooseImageHandler}>
          Wybierz zdjęcie
        </CustomButton>
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
    flex: 1,
  },
  icon: {
    fontSize: 70,
  },
});
