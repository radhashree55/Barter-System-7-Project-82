import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Header, Icon } from "react-native-elements";
import firebase from "firebase";
import db from "../config.js";

export default class ReceiverDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userId: firebase.auth().currentUser.email,
      receiverId: this.props.navigation.getParam("details")["username"],
      exchangeId: this.props.navigation.getParam("details")["exchange_id"],
      itemName: this.props.navigation.getParam("details")["item_name"],
      itemDescription: this.props.navigation.getParam("details")[
        "item_description"
      ],
      receiverName: "",
      receiverContact: "",
      receiverAddress: "",
      receiverRequestDocId: "",
    };
  }

  getUserDetails = () => {
    db.collection("users")
      .where("email_ID", "==", userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            userName: doc.data().first_name + "" + doc.data().last_name,
          });
        });
      });
  };

  getReceiverDetails() {
    db.collection("users")
      .where("email_id", "==", this.state.receiverId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            receiverName: doc.data().first_name,
            receiverContact: doc.data().phoneNumber,
            receiverAddress: doc.data().address,
          });
        });
      });

    db.collection("exchange_requests")
      .where("exchange_id", "==", this.state.exchangeId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({ receiverRequestDocId: doc.id });
        });
      });
  }

  updateBarterStatus = () => {
    db.collection("all_Barters").add({
      item_name: this.state.itemName,
      exchange_id: this.state.exchangeId,
      requested_by: this.state.recieverName,
      donor_id: this.state.userId,
      request_status: "Donor Interested",
    });
  };

  componentDidMount() {
    this.getReceiverDetails();
    this.getUserDetails();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.1 }}>
          <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="#696969"
                onPress={() => this.props.navigation.goBack()}
              />
            }
            centerComponent={{
              text: "Exchange Items",
              style: { color: "#90A5A9", fontSize: 20, fontWeight: "bold" },
            }}
            backgroundColor="#eaf8fe"
          />
        </View>
        <View style={{ flex: 0.3 }}>
          <Card title={"Item Information"} titleStyle={{ fontSize: 20 }}>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Name : {this.state.itemName}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Description : {this.state.itemDescription}
              </Text>
            </Card>
          </Card>
        </View>
        <View style={{ flex: 0.3 }}>
          <Card title={"Receiver's Information"} titleStyle={{ fontSize: 20 }}>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Name : {this.state.receiverName}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Contact : {this.state.receiverContact}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Address: {this.state.receiverAddress}
              </Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {this.state.receiverId !== this.state.userId ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.updateBarterStatus();
                this.props.navigation.navigate("MyBarters");
              }}
            >
              <Text>I wish to Exchange</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "orange",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
  },
});
