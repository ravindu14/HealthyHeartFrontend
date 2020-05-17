import React, { Component } from "react";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { ASYNC_STATUS } from "@app/constants/async";
import { ActivityIndicator } from "react-native";
import { TabView, Tab, Text } from "react-native-ui-kitten";
import { ChartIcon, FoodIntakeIcon } from "@app/assets/icons";
import { getUserData } from "@app/actions/auth";

import ScanFoodDishScreen from "./components/scanDish";
import DietPlansScreen from "./components/dietPlan";

class DietPlanScreen extends Component {
  state = {
    selectedIndex: 0,
  };

  onSelect = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  render() {
    return (
      <LinearGradient colors={["#553fd1", "#ffffff"]} style={{ flex: 1 }}>
        <TabView
          selectedIndex={this.state.selectedIndex}
          onSelect={this.onSelect}
          style={{ flex: 1, color: "#008B8B" }}
        >
          <Tab title="Scan Food Dish" icon={FoodIntakeIcon}>
            <ScanFoodDishScreen />
          </Tab>
          <Tab title="Diet Plan" icon={ChartIcon}>
            <DietPlansScreen />
          </Tab>
        </TabView>
      </LinearGradient>
    );
  }
}

const Actions = {};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, Actions)(DietPlanScreen);
