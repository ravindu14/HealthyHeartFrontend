import React, { Component } from "react";
import { View, Text, Image, ActivityIndicator, Dimensions } from "react-native";
import { connect } from "react-redux";
import { withStyles, Button } from "react-native-ui-kitten";
import { LinearGradient } from "expo-linear-gradient";
import { navigate } from "@app/actions/routes";
import { ASYNC_STATUS } from "@app/constants/async";
import { plan1 } from "@app/assets";

import Alert from "@app/components/Alert";

class DietPlanScreen extends Component {
  render() {
    const { themedStyle, status, notification, mealPlan } = this.props;

    if (status === ASYNC_STATUS.LOADING) {
      return (
        <LinearGradient colors={["#005A00", "#000000"]} style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </LinearGradient>
      );
    }

    let plan = mealPlan ? this.getPlan(mealPlan.toString()) : plan1;

    return (
      <View style={themedStyle.container}>
        <View style={themedStyle.imageContainer}></View>
      </View>
    );
  }
}

const Actions = {};

function mapStateToProps(state) {
  return {};
}

const DietPlanScreenContainer = connect(
  mapStateToProps,
  Actions
)(DietPlanScreen);

export default withStyles(DietPlanScreenContainer, (theme) => ({
  container: {
    marginHorizontal: 16,
    marginVertical: 50,
    flexDirection: "column",
  },
  imageContainer: {
    marginTop: 60,
  },
}));
