import { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";
import { Place } from "../../models/Place";

function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  function savePlaceHandler() {
    const titleIsValid = enteredTitle && enteredTitle.trim().length > 0;
    const imageIsValid = !!selectedImage;
    const locationIsValid = !!pickedLocation;

    if (!titleIsValid || !imageIsValid || !locationIsValid) {
      
      let errorMessage = "Proszę uzupełnić następujące dane:\n";
      if (!titleIsValid) errorMessage += "- Nazwa miejsca\n";
      if (!imageIsValid) errorMessage += "- Zdjęcie\n";
      if (!locationIsValid) errorMessage += "- Lokalizację na mapie";

      Alert.alert(
        "Brakuje informacji",
        errorMessage,
        [{ text: "Rozumiem", style: "default" }]
      );
      return;
    }

    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <View style={styles.label}>
        <Text>Nazwa miejsca</Text>
        <TextInput
          onChangeText={changeTitleHandler}
          value={enteredTitle}
          style={styles.input}
        />
      </View>

      <ImagePicker onTakeImage={takeImageHandler} />

      <LocationPicker onPickLocation={pickLocationHandler} />

      <Button onPress={savePlaceHandler}>Dodaj miejsce</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#00ccdd",
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 14,
    borderBottomColor: "#00ccdd",
    borderBottomWidth: 2,
    borderRadius: 10,
  },
});
