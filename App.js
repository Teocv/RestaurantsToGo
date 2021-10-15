import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { RestaurantScreen } from "./src/features/restaurants/screens/restaurant.screen";
import { theme } from "./src/infrastructure/theme";
import { useFonts as useOswald, Oswald_400Regular } from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// import { restaurantsRequest } from "./src/services/restaurants/restaurant.service";
import { RestaurantContext, RestaurantContextProvider } from "./src/services/restaurants/restaurants.context";

const Settings = ()=> <Text>Settings</Text>;
const Maps = ()=> <Text>Maps</Text>;
const Tab = createBottomTabNavigator();

export default function App() {
  let [oswaldLoaded] = useOswald({ Oswald_400Regular });
  let [latoLoaded] = useLato({ Lato_400Regular });
  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <RestaurantContextProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Restaurants') {
                    iconName = focused
                      ? 'fast-food'
                      : 'fast-food-outline';
                  } else if (route.name === 'Maps') {
                    iconName = focused 
                    ? 'map-sharp' 
                    : 'map-outline';
                  } else if (route.name === 'Settings') {
                    iconName = focused 
                    ? 'settings-sharp' 
                    : 'settings-outline';
                  }
      
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
              })}
            >
              <Tab.Screen name="Restaurants" component={RestaurantScreen} />
              <Tab.Screen name="Maps" component={Maps} />
              <Tab.Screen name="Settings" component={Settings} />
            </Tab.Navigator>
          </NavigationContainer>
        </RestaurantContextProvider>
      </ThemeProvider>
    </>
  );
}