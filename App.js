import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { AppDrawerNavigator } from "./components/AppDrawerNavigator";
import LoginScreen from "./screens/LoginScreen";
import { AppTabNavigator } from "./components/AppTabNavigator";

export default function App() {
  return <AppContainer />;
}

const switchNavigator = createSwitchNavigator({
  LoginScreen: { screen: LoginScreen },
  Drawer: { screen: AppDrawerNavigator },
  BottomTab: { screen: AppTabNavigator },
});

const AppContainer = createAppContainer(switchNavigator);
