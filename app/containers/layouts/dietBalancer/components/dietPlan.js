import React, { Component } from "react";
import { View, Text, Image, ActivityIndicator, Dimensions } from "react-native";
import { connect } from "react-redux";
import { withStyles, Button, Card } from "react-native-ui-kitten";
import { LinearGradient } from "expo-linear-gradient";
import { ASYNC_STATUS } from "@app/constants/async";
import { plan1 } from "@app/assets";
import { getFoodMeal } from "../../../../helpers/helpers/foodHelper";
import Alert from "@app/components/Alert";
import ScrollableAvoidKeyboardComponent from "@app/components/common/ScrollableAvoidKeyboardComponent";
import { navigate, navigateAndReset } from "@app/actions/routes";

class DietPlanScreen extends Component {
  render() {
    const {
      themedStyle,
      status,
      notification,
      mealPlan,
      predictedResult,
    } = this.props;

    const details = getFoodMeal(predictedResult);

    if (status === ASYNC_STATUS.LOADING) {
      return (
        <LinearGradient colors={["#553fd1", "#000000"]} style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </LinearGradient>
      );
    }

    let plan = mealPlan ? this.getPlan(mealPlan.toString()) : plan1;

    return (
      predictedResult && (
        <ScrollableAvoidKeyboardComponent style={themedStyle.container}>
          <View>
            {details.map(({ title, content }) => {
              return (
                <View key={title} style={themedStyle.predictionContainer}>
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 16,
                      fontWeight: "700",
                      marginBottom: 10,
                      marginLeft: 10,
                    }}
                  >
                    {title}
                  </Text>
                  {content.map((item, index) => {
                    return (
                      <Card key={index} style={themedStyle.card}>
                        <Text
                          style={{
                            color: "#ffffff",
                            fontSize: 14,
                            marginTop: 10,
                            marginLeft: 10,
                          }}
                        >
                          {item}
                        </Text>
                      </Card>
                    );
                  })}
                </View>
              );
            })}

            <View style={themedStyle.buttonContainer}>
              <Button
                style={themedStyle.ActionButton}
                size="giant"
                onPress={() => this.props.navigateAndReset("Dashboard")}
              >
                GOT IT
              </Button>
            </View>
          </View>
          {notification !== null && (
            <Alert status={Alert.STATUS.DANGER}>{notification}</Alert>
          )}
        </ScrollableAvoidKeyboardComponent>
      )
    );
  }
}

const Actions = {
  navigate,
  navigateAndReset,
};

function mapStateToProps(state) {
  return {
    status: state.food.status,
    notification: state.food.notification,
    predictedResult: state.food.predictedResult,
  };
}

const DietPlanScreenContainer = connect(
  mapStateToProps,
  Actions
)(DietPlanScreen);

export default withStyles(DietPlanScreenContainer, (theme) => ({
  container: {
    marginHorizontal: 16,
    marginVertical: 20,
    flexDirection: "column",
  },
  predictionContainer: {
    marginTop: 10,
    backgroundColor: "#c2a1f0",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  ActionButton: {
    marginTop: 16,
  },
  card: {
    borderRadius: 10,
    paddingBottom: 10,
    marginBottom: 10,
    backgroundColor: "#610b9e",
  },
}));
