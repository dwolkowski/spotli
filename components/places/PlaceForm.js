import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  function changeAddressHandler(enteredText) {
    setEnteredAddress(enteredText);
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

      <View style={styles.label}>
        <Text>Adres</Text>
        <TextInput
          onChangeText={changeAddressHandler}
          value={enteredAddress}
          style={styles.input}
        />
      </View>

      <ImagePicker />

      <LocationPicker />
      
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
