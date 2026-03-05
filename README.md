# Spotli

Mobile application that allows users to save their favourite places with a photo and location on the map.

**Application written in:**

* **Language:** JavaScript
* **Technologies and Tools:** React Native, React Navigation, React Native Maps, Expo SQLite/Location/Image Picker

The available **Application Features** are described below.

---

## Installation

How to install the application:

```
git clone https://github.com/dwolkowski/spotli
cd spotli
```

Install dependencies:

```
npm install
```

Start the Expo development server:

```
npx expo start
```

After that you can run the application:

* using **Expo Go** on your mobile device (scan QR code)
* on **Android emulator**
* on **iOS simulator**
* in **web browser**

---

## Application Features

The application allows the user to manage favourite places. Each place can contain a title, photo and geographic location.

| Feature                  | Description                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| **Add new place**        | User can create a new place with custom title.                                               |
| **Take or choose photo** | The application allows taking a photo using the device camera or selecting one from gallery. |
| **Select location**      | User can select a location manually on the map or use the current device location.           |
| **Places list**          | Displays all saved places in a list view.                                                    |
| **Place details**        | Shows full information about the selected place including image, address and map preview.    |
| **Map preview**          | Displays the saved location on an interactive map.                                           |

---

## Permissions

The application requires access to the following device features:

* **Camera** – to take photos of places
* **Photo Library** – to select images from gallery
* **Location Services** – to get the current device location

The application also requires a **Google Maps API Key** added to `app.json` and `/util/location.js` with the following services enabled:

* **Maps SDK for Android / Maps SDK for iOS** – required for rendering interactive maps in the application
* **Geocoding API** – used to convert coordinates into a readable address
* **Maps Static API** – used to generate map preview images

___



<div><b> |&nbsp; Dariusz Wołkowski &nbsp;|&nbsp; 2025 &nbsp;| </b></div>
