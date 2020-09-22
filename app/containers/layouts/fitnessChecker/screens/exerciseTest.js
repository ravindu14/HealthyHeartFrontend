import React, { Component } from "react";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { ASYNC_STATUS } from "@app/constants/async";
import { ActivityIndicator, View } from "react-native";
import Alert from "@app/components/Alert";
import { TabView, Tab, Text, withStyles, Button } from "react-native-ui-kitten";
import { navigate, navigateAndReset } from "@app/actions/routes";

import ScrollableAvoidKeyboardComponent from "@app/components/common/ScrollableAvoidKeyboardComponent";

class ExerciseTestScreen extends Component {
  render() {
    const { themedStyle, status } = this.props;

    if (status === ASYNC_STATUS.LOADING) {
      return (
        <LinearGradient colors={["#553fd1", "#000000"]} style={{ flex: 1 }}>
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
                    Legs Fitness Test
                  </Text>
                </View>
                <Button
                  style={themedStyle.ActionButton}
                  size="giant"
                  appearance="outline"
                  onPress={() => this.props.navigate("Legs Fitness")}
                >
                  Start Jogging
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
                    Muscular Fitness Test
                  </Text>
                </View>
                <Button
                  style={themedStyle.ActionButton}
                  size="giant"
                  appearance="outline"
                  onPress={() => this.props.navigate("Muscular Fitness")}
                >
                  Pushup Test
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
                    Aerobic Fitness Test
                  </Text>
                </View>
                <Button
                  style={themedStyle.ActionButton}
                  size="giant"
                  appearance="outline"
                  onPress={() => this.props.navigate("Aerobic Fitness")}
                >
                  Target Heart Rate
                </Button>
              </View>
            </View>

            <View style={themedStyle.buttonContainer}>
              <Button
                style={themedStyle.ActionButton}
                size="giant"
                onPress={() => this.props.navigate("My Workout Plan")}
              >
                My Workout Plan
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
