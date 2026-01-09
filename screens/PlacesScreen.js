import { useEffect, useState } from "react";
import PlaceList from "../components/places/PlaceList";
import { Place } from "../models/Place";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

function PlacesScreen({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return <PlaceList places={loadedPlaces} />;
}

export default PlacesScreen;

const DUMMY_PLACES = [
  new Place(
    "Politechnika Wrocławska",
    "https://www.wroclaw.pl/cdn-cgi/image/w=1200,h=600,fit=crop,f=avif/beta2/files/news/673205/main/politechnika-wroclawska-serowiec-th-14_1.jpg",
    "Wybrzeże Stanisława Wyspiańskiego 27, 50-370 Wrocław",
    { lat: 51.1094, lng: 17.0628 }
  ),
  new Place(
    "Rynek",
    "https://pik.wroclaw.pl/wp-content/uploads/2018/11/Rynek_Wroclaw_-neirfy_stock.jpg",
    "Rynek, 50-001 Wrocław",
    { lat: 51.1092, lng: 17.0329 }
  ),
  new Place(
    "Panorama Racławicka",
    "https://dzieje.pl/sites/default/files/styles/open_article_750x0_/public/201812/panorama_raclawicka.jpg?itok=PqZ3UZTN",
    "ul. Purkyniego 11, 50-155 Wrocław",
    { lat: 51.1105, lng: 17.0425 }
  ),
  new Place(
    "Ostrów Tumski",
    "https://lothuswroclaw.pl/wp-content/uploads/2023/05/ostrow-tumski-we-wroclawiu-1.jpg",
    "Ostrów Tumski, 50-001 Wrocław",
    { lat: 51.1147, lng: 17.0435 }
  ),
  new Place(
    "Hala Stulecia",
    "https://halastulecia.pl/wp-content/uploads/2024/03/hala_stulecia3-450x300.jpg",
    "ul. Wystawowa 1, 51-618 Wrocław",
    { lat: 51.1069, lng: 17.0768 }
  ),
  new Place(
    "Most Grunwaldzki",
    "https://d-pa.ppstatic.pl/frames/pa-def/32/73/il20250702_921156285_medium.jpg",
    "plac Grunwaldzki, 50-378 Wrocław",
    { lat: 51.1118, lng: 17.0457 }
  ),
  new Place(
    "Sky Tower",
    "https://www.rozrywkowywroclaw.pl/images/Artykuly/sky-tower/fb_img_1647252105652.jpg",
    "Powstańców Śląskich 95, 53-332 Wrocław",
    { lat: 51.0967, lng: 17.027 }
  ),
  new Place(
    "Park Szczytnicki (Ogród Japoński)",
    "https://zzm.wroc.pl/wp-content/uploads/2022/09/ogrod_japonski_fot.jkrzeszowski1.jpg",
    "ul. Adama Mickiewicza, 51-618 Wrocław",
    { lat: 51.1115, lng: 17.0755 }
  ),
  new Place(
    "Biblioteka Uniwersytecka",
    "https://assetmanager-ws.pilkington.com/fileserver.aspx?cmd=get_file&file_id=23818&digest=l7bTHCvMjZvhDnG74sii4A==&ct=jpeg&file_name=Biblioteka%20Wroclaw%201.jpeg&width=862&height=512",
    "ul. Fryderyka Joliot-Curie 12, 50-383 Wrocław",
    { lat: 51.114, lng: 17.0378 }
  ),
];
