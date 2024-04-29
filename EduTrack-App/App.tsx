/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

const Stack = createNativeStackNavigator();
import { NavigationContainer } from "@react-navigation/native";
import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import Login from "./screens/login";
import ContractDetail from "./screens/ContractDetail";
import SignUp from "./screens/signup";
import Home from "./screens/home";
import Splash from "./screens/splash";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

export default function App() {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ContractDetail"
              component={ContractDetail}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
}

