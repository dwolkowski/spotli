import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import PlaceAdd from "./screens/PlaceAdd";
import PlaceMap from "./screens/PlaceMap";
import PlacesScreen from "./screens/PlacesScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#0cd" },
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
            headerTintColor: "white",
            tabBarActiveTintColor: "white",
            tabBarActiveBackgroundColor: "#0cd",
            tabBarInactiveTintColor: "#0cd",
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "bold",
            },
          }}
        >
          <Tab.Screen
            name="PlacesList"
            component={PlacesScreen}
            options={{
              title: "Ulubione",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="heart" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="PlaceAdd"
            component={PlaceAdd}
            options={{
              title: "Dodaj miejsce",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="add-circle" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="PlaceMap"
            component={PlaceMap}
            options={{
              title: "Mapa",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="map-outline" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
