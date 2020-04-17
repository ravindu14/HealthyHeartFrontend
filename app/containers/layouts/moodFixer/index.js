import React, { Component } from "react";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { ASYNC_STATUS } from "@app/constants/async";
import { ActivityIndicator } from "react-native";
import { TabView, Tab, Text } from "react-native-ui-kitten";
import { ChartIcon, FoodIntakeIcon } from "@app/assets/icons";

class MoodFixerScreen extends Component {
  render() {
    return (
      <LinearGradient colors={["#00a2ff", "#ffffff"]} style={{ flex: 1 }}>
        <Text>function 3</Text>
      </LinearGradient>
    );
  }
}

const Actions = {};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, Actions)(MoodFixerScreen);
