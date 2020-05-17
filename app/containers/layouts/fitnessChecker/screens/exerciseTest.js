import React, { Component } from "react";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { ASYNC_STATUS } from "@app/constants/async";
import { ActivityIndicator, View, Alert } from "react-native";
import { TabView, Tab, Text, withStyles, Button } from "react-native-ui-kitten";
import { navigate, navigateAndReset } from "@app/actions/routes";

import ScrollableAvoidKeyboardComponent from "@app/components/common/ScrollableAvoidKeyboardComponent";

class ExerciseTestScreen extends Component {
  render() {
    const { themedStyle, status } = this.props;

    if (status === ASYNC_STATUS.LOADING) {
      return (
        <LinearGradient colors={["#005A00", "#000000"]} style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </LinearGradient>
      );
    }

    return (
      <ScrollableAvoidKeyboardComponent>
        <LinearGradient colors={["#553fd1", "#000000"]} style={{ flex: 1 }}>
          <View style={themedStyle.container}>
            <View style={themedStyle.testingContainer}>
              <View style={themedStyle.section}>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 18,
                      marginTop: 10,
                      marginLeft: "auto",
                      marginRight: "auto",
                      fontWeight: "bold",
                    }}
                  >
                    Fitness Test 1
                  </Text>
                </View>
                <Button
                  style={themedStyle.ActionButton}
                  size="giant"
                  appearance="outline"
                  onPress={() => {}}
                >
                  Start Test
                </Button>
              </View>
              <View style={themedStyle.section}>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 18,
                      marginTop: 10,
                      marginLeft: "auto",
                      marginRight: "auto",
                      fontWeight: "bold",
                    }}
                  >
                    Fitness Test 2
                  </Text>
                </View>
                <Button
                  style={themedStyle.ActionButton}
                  size="giant"
                  appearance="outline"
                  onPress={() => {}}
                >
                  Start Test
                </Button>
              </View>
              <View style={themedStyle.section}>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 18,
                      marginTop: 10,
                      marginLeft: "auto",
                      marginRight: "auto",
                      fontWeight: "bold",
                    }}
                  >
                    Fitness Test 4
                  </Text>
                </View>
                <Button
                  style={themedStyle.ActionButton}
                  size="giant"
                  appearance="outline"
                  onPress={() => {}}
                >
                  Start Test
                </Button>
              </View>
            </View>

            <View style={themedStyle.buttonContainer}>
              <Button
                style={themedStyle.ActionButton}
                size="giant"
                onPress={() => {}}
              >
                My Workout Plan
              </Button>
            </View>
            <View style={themedStyle.buttonContainer}>
              <Button
                style={themedStyle.ActionButton}
                size="giant"
                onPress={() => {}}
              >
                Weekly Progress
              </Button>
            </View>
          </View>
        </LinearGradient>
      </ScrollableAvoidKeyboardComponent>
    );
  }
}

const Actions = {
  navigate,
  navigateAndReset,
};

function mapStateToProps(state) {
  return {};
}

const ExerciseTestScreenContainer = connect(
  mapStateToProps,
  Actions
)(ExerciseTestScreen);

export default withStyles(ExerciseTestScreenContainer, (theme) => ({
  container: {
    marginHorizontal: 16,
    marginVertical: 10,
    flexDirection: "column",
  },
  section: {
    marginVertical: 16,
  },
  ActionButton: {
    marginTop: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
}));
