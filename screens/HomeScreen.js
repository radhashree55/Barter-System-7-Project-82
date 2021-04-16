import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../components/MyHeader";
import { Image } from "react-native";

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      requests: [],
    };
    this.requestRef = null;
  }

  getRequests = () => {
    this.requestRef = db
      .collection("items_for_exchange")
      .onSnapshot((snapshot) => {
        var requests = snapshot.docs.map((document) => document.data());
        this.setState({
          requests: requests,
        });
      });
  };

  componentDidMount() {
    this.getRequests();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.item_name}
        subtitle={item.item_description}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        leftElement={
          <Image
            style={{ height: 50, width: 50 }}
            source={{ uri: item.image_link }}
          />
        }
        rightElement={
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("ReceiverDetails", {
                details: item,
              });
            }}
          >
            <Text style={{ color: "#ffff" }}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Items Available" navigation={this.props.navigation} />
        <View style={{ flex: 1 }}>
          {this.state.requests.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20, color: "mediumorchid" }}>
                List Of All Items Available
              </Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.requests}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
});
