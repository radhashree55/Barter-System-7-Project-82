import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { AppTabNavigator } from "./AppTabNavigator";
import CustomSideBarMenu from "./CustomSideBarMenu";
import SettingsScreen from "../screens/SettingsScreen";
import MyBartersScreen from "../screens/MyBartersScreen";

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AppTabNavigator,
    },
    MyBarters: {
      screen: MyBartersScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    contentComponent: CustomSideBarMenu,
  },
  {
    initialRouteName: "Home",
  }
);
