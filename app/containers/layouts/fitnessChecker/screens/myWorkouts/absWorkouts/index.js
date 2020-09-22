import React, { Component } from "react";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { ASYNC_STATUS } from "@app/constants/async";
import { ActivityIndicator, View, TouchableOpacity } from "react-native";
import Alert from "@app/components/Alert";
import { TabView, Tab, Text, withStyles, Button } from "react-native-ui-kitten";
import { navigate, navigateAndReset } from "@app/actions/routes";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from "react-native-material-cards";

import ScrollableAvoidKeyboardComponent from "@app/components/common/ScrollableAvoidKeyboardComponent";

class AbsWorkoutsScreen extends Component {
  state = {
    selectedDay: "monday",
  };

  onSelectDay = (value) => {
    this.setState({
      ...this.state,
      selectedDay: value,
    });
  };

  getExercisesByDay = () => {
    const { selectedDay } = this.state;
    const {
      exercises: { absExercises },
      themedStyle,
    } = this.props;

    if (selectedDay === "monday") {
      return absExercises.Monday.map((exercise, index) => {
        return (
          <Card key={index} style={themedStyle.cardContainer}>
            <CardImage
              source={{
                uri: exercise.imageUrl,
              }}
            />
            <CardTitle title={exercise.name} />
            <CardContent
              text={`${exercise.level} level : ${
                exercise.level === "beginner"
                  ? "8 repetitions"
                  : exercise.level === "medium"
                  ? "10 repetitions"
                  : "12 repetitions"
              }`}
            />
          </Card>
        );
      });
    } else if (selectedDay === "tuesday") {
      return absExercises.Tuesday.map((exercise, index) => {
        return (
          <Card key={index} style={themedStyle.cardContainer}>
            <CardImage
              source={{
                uri: exercise.imageUrl,
              }}
            />
            <CardTitle title={exercise.name} />
            <CardContent
              text={`${exercise.level} level : ${
                exercise.level === "beginner"
                  ? "8 repetitions"
                  : exercise.level === "medium"
                  ? "10 repetitions"
                  : "12 repetitions"
              }`}
            />
          </Card>
        );
      });
    } else if (selectedDay === "wednesday") {
      return absExercises.Wednesday.map((exercise, index) => {
        return (
          <Card key={index} style={themedStyle.cardContainer}>
            <CardImage
              source={{
                uri: exercise.imageUrl,
              }}
            />
            <CardTitle title={exercise.name} />
            <CardContent
              text={`${exercise.level} level : ${
                exercise.level === "beginner"
                  ? "8 repetitions"
                  : exercise.level === "medium"
                  ? "10 repetitions"
                  : "12 repetitions"
              }`}
            />
          </Card>
        );
      });
    } else if (selectedDay === "thursday") {
      return absExercises.Thursday.map((exercise, index) => {
        return (
          <Card key={index} style={themedStyle.cardContainer}>
            <CardImage
              source={{
                uri: exercise.imageUrl,
              }}
            />
            <CardTitle title={exercise.name} />
            <CardContent
              text={`${exercise.level} level : ${
                exercise.level === "beginner"
                  ? "8 repetitions"
                  : exercise.level === "medium"
                  ? "10 repetitions"
                  : "12 repetitions"
              }`}
            />
          </Card>
        );
      });
    } else if (selectedDay === "friday") {
      return absExercises.Friday.map((exercise, index) => {
        return (
          <Card key={index} style={themedStyle.cardContainer}>
            <CardImage
              source={{
                uri: exercise.imageUrl,
              }}
            />
            <CardTitle title={exercise.name} />
            <CardContent
              text={`${exercise.level} level : ${
                exercise.level === "beginner"
                  ? "8 repetitions"
                  : exercise.level === "medium"
                  ? "10 repetitions"
                  : "12 repetitions"
              }`}
            />
          </Card>
        );
      });
    } else if (selectedDay === "saturday") {
      return absExercises.Saturday.map((exercise, index) => {
        return (
          <Card key={index} style={themedStyle.cardContainer}>
            <CardImage
              source={{
                uri: exercise.imageUrl,
              }}
            />
            <CardTitle title={exercise.name} />
            <CardContent
              text={`${exercise.level} level : ${
                exercise.level === "beginner"
                  ? "8 repetitions"
                  : exercise.level === "medium"
                  ? "10 repetitions"
                  : "12 repetitions"
              }`}
            />
          </Card>
        );
      });
    } else if (selectedDay === "sunday") {
      return absExercises.Sunday.map((exercise, index) => {
        return (
          <Card key={index} style={themedStyle.cardContainer}>
            <CardImage
              source={{
                uri: exercise.imageUrl,
              }}
            />
            <CardTitle title={exercise.name} />
            <CardContent
              text={`${exercise.level} level : ${
                exercise.level === "beginner"
                  ? "8 repetitions"
                  : exercise.level === "medium"
                  ? "10 repetitions"
                  : "12 repetitions"
              }`}
            />
          </Card>
        );
      });
    }
  };

  getTotalCalories = (day) => {
    const {
      exercises: { absExercises },
    } = this.props;

    let totalCalories = 0;

    if (day === "monday") {
      absExercises.Monday.map((exercise, index) => {
        totalCalories += exercise.cal;
        return null;
      });
    } else if (day === "tuesday") {
      absExercises.Tuesday.map((exercise, index) => {
        totalCalories += exercise.cal;
        return null;
      });
    } else if (day === "wednesday") {
      absExercises.Wednesday.map((exercise, index) => {
        totalCalories += exercise.cal;
        return null;
      });
    } else if (day === "thursday") {
      absExercises.Thursday.map((exercise, index) => {
        totalCalories += exercise.cal;
        return null;
      });
    } else if (day === "friday") {
      absExercises.Friday.map((exercise, index) => {
        totalCalories += exercise.cal;
        return null;
      });
    } else if (day === "saturday") {
      absExercises.Saturday.map((exercise, index) => {
        totalCalories += exercise.cal;
        return null;
      });
    } else if (day === "sunday") {
      absExercises.Sunday.map((exercise, index) => {
        totalCalories += exercise.cal;
        return null;
      });
    }

    return totalCalories;
  };

  onFinishExercises = () => {
    this.props.navigate("My Workout Plan");
  };

  render() {
    const { themedStyle, status, notification, exercises } = this.props;

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
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={themedStyle.YesButton}
                onPress={() => {
                  this.onSelectDay("monday");
                }}
              >
                <Text style={themedStyle.textLabel}>Mon</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={themedStyle.YesButton}
                onPress={() => {
                  this.onSelectDay("tuesday");
                }}
              >
                <Text style={themedStyle.textLabel}>Tue</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={themedStyle.YesButton}
                onPress={() => {
                  this.onSelectDay("wednesday");
                }}
              >
                <Text style={themedStyle.textLabel}>Wed</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={themedStyle.YesButton}
                onPress={() => {
                  this.onSelectDay("thursday");
                }}
              >
                <Text style={themedStyle.textLabel}>Thu</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={themedStyle.YesButton}
                onPress={() => {
                  this.onSelectDay("friday");
                }}
              >
                <Text style={themedStyle.textLabel}>Fri</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={themedStyle.YesButton}
                onPress={() => {
                  this.onSelectDay("saturday");
                }}
              >
                <Text style={themedStyle.textLabel}>Sat</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={themedStyle.YesButton}
                onPress={() => {
                  this.onSelectDay("sunday");
                }}
              >
                <Text style={themedStyle.textLabel}>Sun</Text>
              </TouchableOpacity>
            </View>
            {exercises.legExercises &&
              exercises.armExercises &&
              exercises.absExercises && (
                <View styles={themedStyle.contentContainer}>
                  {this.getExercisesByDay()}
                </View>
              )}
            <View style={themedStyle.buttonContainer}>
              <Button
                style={themedStyle.ActionButton}
                size="giant"
                onPress={this.onFinishExercises}
              >
                I'm Done
              </Button>
            </View>
            {notification !== null && (
              <Alert status={Alert.STATUS.DANGER}>{notification}</Alert>
            )}
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
  return {
    status: state.exercise.status,
    notification: state.exercise.notification,
    exercises: state.exercise.exercises,
  };
}

const AbsWorkoutsScreenContainer = connect(
  mapStateToProps,
  Actions
)(AbsWorkoutsScreen);

export default withStyles(AbsWorkoutsScreenContainer, (theme) => ({
  container: {
    marginHorizontal: 16,
    marginVertical: 10,
    flexDirection: "column",
  },
  cardContainer: {
    borderRadius: 10,
  },
  YesButton: {
    paddingTop: 5,
    backgroundColor: "#002b01",
    borderRadius: 30,
    width: 45,
    height: 45,
  },
  YesButtonActive: {
    paddingTop: 5,
    backgroundColor: "#00d605",
    borderRadius: 30,
    width: 45,
    height: 45,
  },
  textLabel: {
    fontSize: 13,
    color: "#ffffff",
    paddingTop: 8,
    textAlign: "center",
    fontWeight: "600",
  },
  contentContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
}));
