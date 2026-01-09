import * as SQLite from "expo-sqlite";
import { Place } from "../models/Place";

const database = SQLite.openDatabaseSync("places.db");

export async function init() {
  try {
    await database.runAsync(`
      CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      )
    `);
  } catch (error) {
    console.error("Błąd inicjalizacji bazy:", error);
    throw error;
  }
}

export async function insertPlace(place) {
  try {
    const result = await database.runAsync(
      `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
      [
        place.title,
        place.imageUri,
        place.address,
        place.location.lat,
        place.location.lng,
      ]
    );
    return result;
  } catch (error) {
    console.error("Błąd podczas dodawania miejsca:", error);
    throw error;
  }
}

export async function fetchPlaces() {
  try {
    const result = await database.getAllAsync("SELECT * FROM places");

    const places = result.map(
      (dp) =>
        new Place(
          dp.title,
          dp.imageUri,
          {
            address: dp.address,
            lat: dp.lat,
            lng: dp.lng,
          },
          dp.id
        )
    );

    return places;
  } catch (error) {
    console.error("Błąd pobierania miejsc:", error);
    throw error;
  }
}

export async function fetchPlaceDetails(id) {
  try {
    const dbPlace = await database.getFirstAsync(
      "SELECT * FROM places WHERE id = ?",
      [id]
    );

    const place = new Place(
      dbPlace.title,
      dbPlace.imageUri,
      { lat: dbPlace.lat, lng: dbPlace.lng, address: dbPlace.address },
      dbPlace.id
    );

    return place;
  } catch (error) {
    console.error("Błąd pobierania szczegółów miejsca:", error);
    throw error;
  }
}
