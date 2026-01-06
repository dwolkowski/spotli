import PlaceForm from "../components/places/PlaceForm";

function PlaceAdd({navigation}) {
  function createPlaceHandler(place){
    navigation.navigate('PlacesList', {
      place: place
    });
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default PlaceAdd;
