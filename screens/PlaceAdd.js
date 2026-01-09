import PlaceForm from "../components/places/PlaceForm";
import { insertPlace } from "../util/database";

function PlaceAdd({navigation}) {
  async function createPlaceHandler(place){
    await insertPlace(place);
    navigation.navigate('PlacesList');
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default PlaceAdd;
