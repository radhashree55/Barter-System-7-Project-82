import React, { Component } from "react";
import { Header, Icon, Badge } from "react-native-elements";
import { View, Text, StyeSheet, Alert, Image } from "react-native";

const MyHeader = (props) => {
  return (
    <Header
      leftComponent={
        <Icon
          name="bars"
          type="font-awesome"
          color="#696969"
          onPress={() => props.navigation.toggleDrawer()}
          size={40}
        />
      }
      centerComponent={{
        text: props.title,
        style: {
          fontSize: 31,
          fontWeight: "300",
          paddingBottom: 20,
          color: "mediumorchid",
        },
      }}
      backgroundColor="lavender"
    />
  );
};

export default MyHeader;
