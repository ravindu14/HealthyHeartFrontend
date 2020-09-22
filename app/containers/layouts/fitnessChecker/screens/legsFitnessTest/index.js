import React, { Component } from "react";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { ASYNC_STATUS } from "@app/constants/async";
import { ActivityIndicator, View } from "react-native";
import Alert from "@app/components/Alert";
import { TabView, Tab, Text, withStyles, Button } from "react-native-ui-kitten";
import { navigate, navigateAndReset } from "@app/actions/routes";
import { Stopwatch } from "react-native-stopwatch-timer";
import { Pedometer } from "expo-sensors";
import { getUserData } from "@app/actions/auth";
import { getLegsExercises } from "@app/actions/exercise";
import { NumberValidator } from "@app/validators";

import ValidationInput from "@app/components/common/ValidationInput";

class LegsFitnessTestScreen extends Component {
  componentDidMount() {
    this.props.getUserData();
  }

  state = {
    currentStepCount: 0,
    finalTime: null,
  };

  toggleStopwatch = () => {
    this.setState({
      ...this.state,
      stopwatchStart: !this.state.stopwatchStart,
      stopwatchReset: false,
    });
  };

  resetStopWatch = () => {
    this.setState({
      ...this.state,
      stopwatchReset: true,
      stopwatchStart: false,
    });
  };

  onChangeFormValue = (value) => {
    this.setState({
      ...this.state,
      ...value,
    });
  };

  onFinishTest = () => {
    const {
      userDetails: { gender, age },
    } = this.props;
    const { finalTime } = this.state;

    this.props.getLegsExercises({
      userage: parseFloat(age),
      usergender: gender,
      activitymeasurement: parseFloat(finalTime),
    });
  };

  render() {
    const {
      themedStyle,
      authStatus,
      authNotification,
      status,
      notification,
      exercises,
    } = this.props;
    const { currentStepCount, finalTime } = this.state;

    if (
      authStatus === ASYNC_STATUS.LOADING ||
      status === ASYNC_STATUS.LOADING
    ) {
      return (
        <LinearGradient colors={["#553fd1", "#000000"]} style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </LinearGradient>
      );
    }

    return (
      <LinearGradient colors={["#553fd1", "#000000"]} style={{ flex: 1 }}>
        <View style={themedStyle.container}>
          <View style={themedStyle.section}>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 14,
                  marginTop: 10,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                This strategy to access your aerobic fitness by timing yourself
                on a 1.5miles run or jog.A lower time generally indicates better
                aerobic fitness, and a higher time suggests a need for
                improvement.
              </Text>
            </View>
          </View>
          <View style={themedStyle.inputContainer}>
            <ValidationInput
              style={themedStyle.textInput}
              label="Please enter achieved time (minutes)"
              value={finalTime}
              validator={NumberValidator}
              onChangeText={(finalTime) =>
                this.onChangeFormValue({ finalTime })
              }
            />
          </View>
          <View style={themedStyle.buttonContainer}>
            <Button
              style={themedStyle.ActionButton}
              size="giant"
              disabled={finalTime === null}
              onPress={this.onFinishTest}
            >
              Get Exercises
            </Button>
          </View>
          {exercises.legExercises && (
            <View style={themedStyle.buttonContainer}>
              <Button
                style={themedStyle.ActionButton}
                size="giant"
                onPress={() => this.props.navigate("Exercise Test")}
              >
                Finish Test
              </Button>
            </View>
          )}
          {authNotification !== null && (
            <Alert status={Alert.STATUS.DANGER}>{authNotification}</Alert>
          )}
          {notification !== null && (
            <Alert status={Alert.STATUS.DANGER}>{notification}</Alert>
          )}
        </View>
      </LinearGradient>
    );
  }
}

const Actions = {
  navigate,
  navigateAndReset,
  getUserData,
  getLegsExercises,
};

function mapStateToProps(state) {
  return {
    authStatus: state.auth.status,
    authNotification: state.auth.notification,
    userDetails: state.auth.userDetails,
    status: state.exercise.status,
    notification: state.exercise.notification,
    exercises: state.exercise.exercises,
  };
}

const LegsFitnessTestScreenContainer = connect(
  mapStateToProps,
  Actions
)(LegsFitnessTestScreen);

export default withStyles(LegsFitnessTestScreenContainer, (theme) => ({
  container: {
    marginHorizontal: 16,
    marginVertical: 0,
    flexDirection: "column",
  },
  section: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#6c786f",
    borderRadius: 10,
  },
  watchContainer: {
    padding: 10,
  },
  stopwatchContainer: {
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
  },
  ActionButton: {
    marginTop: 16,
  },
  inputContainer: {
    marginTop: 16,
  },
  textInput: {
    marginTop: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
}));
